//Require packages
const express = require('express');
const router = express.Router() //allows us to use this file as a router


//Require the hackathon profile
const Hackathon = require('../../models/Hackathon');


//POST      /api/hackathons/create
//Action    create a hackathon
//PRIVATE   need to be signed in (recipient or sponsor to access route)

router.post('/create', async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                errors: [{ msg: "Not authorized to create hackathon" }]
            });
        }
        //Check to see if hackathon with the same name exists
        const name = await Hackathon.findOne({ title: req.body.title });

        if (name) {
            return res.status(400).json({
                errors: [{ msg: 'Hackathon with that name already exists' }]
            })
        }

        //Take the info from the body to create new hackathon
        //start date, end date, title

        const {
            startDate,
            endDate,
            title,
            description,
            prizes, //array
            requirements, //qualify to participate array
            criteria, //array
            location,
            forms,  //array with title and file
            judges, //array
            website,
            donations,
            winners
        } = req.body;

        //create new hackathon
        let newHackathon = new Hackathon({
            title,
            startDate,
            endDate,
            description,
            location
        });

        //adds the recipient to the new hackathon
        newHackathon.recipient = req.user._id;

        //add in the optional fields if they exist
        if (website) newHackathon['website'] = website;

        //adds the prizes to the hackathon object
        if (prizes) {
            //initializes an empty array that stores all the prizes
            newHackathon.prizes = [];


            prizes.forEach(prize => {
                newHackathon.prizes.push(prize);
            })

        }

        //adds the requirements to the hackathon object
        if (requirements) {
            //initializes an empty array that stores all the requirements
            newHackathon.requirements = [];

            requirements.forEach(requirement => {
                newHackathon.requirements.push(requirement);
            });
        }

        //adds the criterias to win in into the hackathon object
        if (criteria) {
            //initializes an empty array that stores all the criteria to win in
            newHackathon.criteria = [];

            criteria.forEach(criterion => {
                newHackathon.criteria.push(criterion);
            })
        }

        //adds the location to the hackathon object
        if (location) newHackathon.location = location;

        //adds the forms to the hackathon
        if (forms) {
            //initializes the array that the forms will save to
            newHackathon.forms = [];

            forms.forEach(form => {
                //new object that will be pushed to the form
                let hackathonForm = {};

                //adding the parameters to the hackathon form
                hackathonForm.title = form.title;
                hackathonForm.file = form.file;

                //appends the file to the hackathon
                newHackathon.forms.push(hackathonForm);
            })

        }

        //adds the judges to the hackathon
        if (judges) {
            //initializes empty object that will contain all the judges
            newHackathon.judges = [];

            judges.forEach(judge => {
                newHackathon.judges.push(judge);
            });
        }
        if (donations) {
            newHackathon.donations = [];
            donations.forEach(donation => {
                //takes out each individual donation
                //

                //grabs the fields that we want from the donation
                const {
                    type,
                    quantity,
                    description,
                    received
                } = donation;

                //creates an object that will be filled with the fields of donation
                const addDonation = {};
                addDonation.type = type;


                //adding in the hackathon donations fields
                if (quantity) addDonation['quantity'] = quantity;
                if (description) addDonation['description'] = description;


                //filling in anything that has been received
                //Breaking down the recieved array into smaller components and adding that to the addDonation
                if (received) {

                    //makes it an array to be added
                    addDonation.received = [];

                    received.forEach(reception => {
                        const receptionPackage = {};
                        const {
                            sponsor,
                            quantity,
                            description
                        } = reception;

                        //adds the files, none of htese are required, so we'll do a front end check for them
                        if (sponsor) receptionPackage.sponsor = sponsor;
                        if (quantity) receptionPackage.quantity = quantity;
                        if (description) receptionPackage.description = description;

                        addDonation.received.push(receptionPackage);
                    })

                }

                newHackathon.donations.push(addDonation);
            });

        };

        if (winners) {
            //creates the array to add the winners to 
            newHackathon.winners = [];

            winners.forEach(winner => {
                //extracts the required components from each winner
                const { teamName, awardTitle, prizeWon } = winner;

                //adds the object that the winner would be added to
                const addWinners = { teamName, awardTitle };

                if (prizeWon) addWinners.prizeWon = prizeWon;

                newHackathon.winners.push(addWinners);
            });
        }

        await newHackathon.save();
        res.json(newHackathon);


    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



//PUT       /api/hackathons/edit/:id
//Action    edit existing data in a hacakthon that is not winner or donations
//PRIVATE   need to have same userId as the hackathon's recipient value

router.put('/edit-general/:id', async (req, res, next) => {
    //gets the ID of the hackathon to be modified
    const hackathonId = req.params.id;

    //does not allow a user to progress if they are not signed in
    if (!req.user) {
        return res.status(401).json({
            errors: [{ msg: "Not authorized to edit a hackathon" }]
        });
    }

    try {

        //grabs the Hackathon that is associated with the Id
        let hackathon = await Hackathon.findOne({ _id: hackathonId });


        if ((req.user._id + '') != (hackathon.recipient + '')) {
            return res.status(401).json({
                errors: [{ msg: "Not authorized to edit someone else's hackathon!" }]
            });
        }

        //Grabs all the parameters that are modified
        const editParams = req.body;

        //updates the hackathon
        let updateHackathon = await Hackathon.findOneAndUpdate({ _id: hackathonId }, { $set: editParams }, { new: true })

        res.status(200).json(updateHackathon);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error or hackathon not found');
    }

})
//PUT       /api/hackathons/edit/add-donation/:id
//Action    add donations that the group has recieved (automatic process)
//PRIVATE   user must be the same user as the hackathon creator
router.put('/edit/add-donations/:id', async (req, res, next) => {
    //get the hackathon id
    let hackathonId = req.params.id;

    try {
        //grab the hackathon model
        let hackathon = await Hackathon.findOne({ _id: hackathonId });

        //kicks user out if they are not the owner of the hackathon
        if ((hackathon.recipient + '') != (req.user._id + '')) {
            return res.status(401).json({
                errors: [{ msg: "Cannot add donation category to hackathon that is not your own!" }]
            });
        }

        //adds the body donation categories to the hackathon
        let donationsToAdd = req.body;

        for (donation in donationsToAdd) {
            donation.received = [{}];
        }

        if (hackathon.donations) {

            hackathon.donations.push.apply(hackathon.donations, donationsToAdd);
        } else {
            hackathon.donations = donationsToAdd;
        }

        await Hackathon.replaceOne({ _id: req.params.id }, hackathon);

        return res.status(200).json(hackathon);

    } catch (err) {
        console.error(err);
        return res.status(500).send('server error or can\'t find hackathon');
    }
})

//PUT       /api/hackathons/edit/add-donations-received/:id
//Action    add donations that the group has recieved (automatic process)
//PRIVATE   happens behind the scenes when a sponsor agrees to sponsor a hackathon
router.put('/edit/add-donations-received/:hackathonId/:donationId', async (req, res, next) => {

    //grab the prameters from the request
    let hackathonId = req.params.hackathonId;
    let donationId = req.params.donationId;
    try {
        //finds the hackathon that needs to be updated
        let hackathon = await Hackathon.findOne({ _id: hackathonId });

        //loop through the donations in the hackthon and find the one that has the same object id as donation id
        Object.values(hackathon.donations).forEach(donation => {
            //pushes the sponsor that donated to one of the hackathon's request to the received array
            if ((donation._id + '') === (donationId + '')) {
                donation.received.push(req.body);
            }
        })

        await Hackathon.replaceOne({ _id: hackathonId }, hackathon);

        return res.status(200).json(hackathon);


    } catch (err) {
        console.error(err);
        res.status(500).send('Server error or hackathon invalid')
    }

});

//DELETE    /api/hackathons/deleteDonation/:hackathonId/:donationId
//Action    allows creator of hackathon to delete a donation criteria if they are no longer looking for that to be
//PRIVATE   needs to be owner of the hackathon
router.delete('/deleteDonation/:hackathonId/:donationId', async (req, res, next) => {
    //initializes variables to 
    const hackathonId = req.params.hackathonId;
    const donationId = req.params.donationId;

    //stops any further action if the user is not logged in
    if (!req.user) {
        return res.status(401).json({
            errors: [{ msg: "Not authorized to delete donations" }]
        });
    };

    try {
        //grabs the hackathon that needs to have an element deleted
        let hackathon = await Hackathon.findOne({ _id: hackathonId });

        //stops user if they are not the same one as the hackathon creator
        if ((req.user._id + '') != (hackathon.recipient + '')) {
            return res.status(401).json({
                errors: [{ msg: "You cannot edit someone else's hackathon!" }]
            });
        };

        //Loops through the donations and finds the one that needs to be deleted by Id
        hackathon.donations.forEach((donation, index) => {
            if ((donation._id + '') === (donationId + '')) {
                //deletes the donation by id
                hackathon.donations.splice(index, 1);
            }
        });

        //saves the updated hackathon back to the database
        await Hackathon.replaceOne({ _id: hackathonId }, hackathon);
        return res.status(200).json(hackathon);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error or data not found');
    }
});

//PUT       /api/hackathons/add-winner/:hackathonId
//Action    allows the creator of the hackathon to add winnners 
//PRIVATE   needs to be owner of the hackathon
router.put('/add-winner/:hackathonId', async (req, res, next) => {
    //grab the hackathon's id from the requeset's parameters
    let hackathonId = req.params.hackathonId;

    //stops further acction if the user is not signed in
    if (!req.user) {
        return res.status(401).json({
            errors: [{ msg: "You are not authorized to add a winner" }]
        })
    };

    try {
        //finds the hackathon that the modifications are happening to
        let hackathon = await Hackathon.findOne({ _id: hackathonId });


        //stops further action if the user is not the same as the hackathon recipient
        if ((req.user._id + '') != (hackathon.recipient + '')) {
            return res.status(401).json({
                errors: [{ msg: 'Cannot add winners to another person\'s hackathon' }]
            });
        };

        //extracts the winner to be added from the req.body
        let addWinner = req.body;
        //checks that the required parameters are in the body
        const { teamName, awardTitle } = addWinner;
        if (!teamName || !awardTitle) {
            return res.status(400).json({
                errors: [{ msg: 'Incomplete response, make sure to include team name and award title' }]
            })
        };

        //adds the winner to the hackathon object
        hackathon.winners.push(addWinner);

        await Hackathon.replaceOne({ _id: hackathonId }, hackathon);

        return res.status(200).json(hackathon);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error or objects not defined')
    }
});

//DELETE    api/hackathons/delete-winner/:hackathonId/:winnerId
//Action    allows the creator of the hackathon to delete a winner
//PRIVATE   needs to be owner of the hackathon
router.delete('/delete-winner/:hackathonId/:winnerId', async (req, res, next) => {
    //pulls the parameters from the request
    const hackathonId = req.params.hackathonId;
    const winnerId = req.params.winnerId;

    //stops further action if the user is not logged in
    if (!req.user) {
        return res.status(401).json({
            errors: [{ msg: "Not authorized to delete winner" }]
        });
    };

    try {
        //finds the hackathon that needs to be modified
        let hackathon = await Hackathon.findOne({ _id: hackathonId });

        //stops furhter action if the user is not the owner of the hackathon
        if ((req.user._id + '') != (hackathon.recipient + '')) {
            return res.status(401).json({
                errors: [{ msg: "You cannot edit the winners of another person's hackathon" }]
            });
        };

        //Loops through all of the winners and finds the one that has the same ID as winnerId
        hackathon.winners.forEach((winner, index) => {
            if ((winner.id + '') === (winnerId + '')) {
                hackathon.winners.splice(index, 1);
            }
        });

        await Hackathon.replaceOne({ _id: hackathonId }, hackathon);

        return res.status(200).json(hackathon);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error or bad data');
    }

})

//DELETE    api/hackathons/delete-hackathon/:hackathonId
//Action    allows the hackathon user to delete a hackathon
//PRIVATE   needs to be owner of the hackathon
router.delete('/delete-hackathon/:hackathonId', async (req, res, next) => {
    //save the variables from the request parameters
    let hackathonId = req.params.hackathonId;

    //stops further action if the user is not logged in
    if (!req.user) {
        return res.status(401).json({
            errors: [{ msg: "Not authorized to delete hackathon" }]
        });
    };

    //finds the hackathon that is about to be deleted
    let hackathon = await Hackathon.findOne({ _id: hackathonId });

    //stops further action if the user is not the creator of the hackathon
    if ((req.user._id + '') != (hackathon.recipient + '')) {
        return res.status(401).json({
            errors: [{ msg: "You cannot delete someone else's hackathon" }]
        });
    }
    //Deletes the hackathon
    await Hackathon.findOneAndDelete({ _id: hackathonId });

    res.status(200).send("hackathon deleted");
})

//GET       /api/hackathons
//Action    returns all the hackathons
//PUBLIC    no authorization required to view all the hackathons
router.get('/', async (req, res, next) => {
    try {
        //grabs all the hackathons
        let hackathons = await Hackathon.find().sort({ startDate: -1 });

        return res.status(200).json(hackathons);
    } catch (err) {
        console.error(err);
        return res.status(500).send('server error bad syntax');
    }
});

//GET       /api/hackathons
//Action    returns all the hackathons
//PUBLIC    no authorization required to view all the hackathons
router.get('/:id', async (req, res, next) => {
    try {
        //grabs all the hackathons
        let hackathon = await Hackathon.findById(req.params.id);

        return res.status(200).json(hackathon);
    } catch (err) {
        console.error(err);
        return res.status(500).send('server error bad syntax');
    }
});

router.get('/search/locations', async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ msg: 'User not authorized' })
    }
    try {
        let myLocation = await sponsorProfile.findOne({ sponsor: req.user._id })
        myLocation = myLocation.location
        let profiles = await Hackathon.find();
        let destinations = [];
        profiles.forEach(async (profile) => {
            if (profile.location) {
                destinations.push(profile.location)
            }
        })
        destinations = destinations.join('|')
        console.log(myLocation)
        console.log(destinations)
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${myLocation}&destinations=${destinations}&key=${config.get('distanceMatrixKey')}`
        console.log(url)
        const response = await axios.get(url)
        for (let i = 0; i < profiles.length; i++) {
            console.log(`Profile : ${profiles[i]}`)
            const locs = response.data.rows[0].elements
            profiles[i].distanceFromUser = locs[i].distance.text;
            console.log(`Profile after : ${profiles[i]}`)
        }
        console.log(`profiles : ${profiles}`)
        res.json(profiles)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})



module.exports = router;