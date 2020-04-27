//Require packages
const express = require('express');
const router = express.Router() //allows us to use this file as a router


//Require the hackathon profile
const Hackathon = require('../../models/Hackathon');


//POST      /api/hackathons/create
//Action    create a hackathon
//PRIVATE   need to be signed in (recipient or sponsor to access route)

router.post('/create', async(req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({
                errors: [{msg: "Not authorized to create hackathon"}]
            });
        }
        //Check to see if hackathon with the same name exists
        const name = await Hackathon.findOne({title: req.body.title});

        if (name) {
            return res.status(400).json({
                errors: [{ msg: 'Hackathon with that name already exists' }]
            })
        }

        //Take the info from the body to create new hackathon
        //start date, end date, title
        
        const { recipient,
                startDate,
                endDate,
                title,
                description,
                website,
                donations,
                winners
            } = req.body;
        
        //create new hackathon
        const newHackathon = new Hackathon({
            recipient,
            title,
            startDate,
            endDate,
            description,
        });

        //add in the optional fields if they exist
        if(website) newHackathon['websiste'] = website;
        
        if(donations){
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
                if(quantity) addDonation['quantity'] = quantity;
                if(description) addDonation['description'] = description;
                

                //filling in anything that has been received
                //Breaking down the recieved array into smaller components and adding that to the addDonation
                if(received){

                    //makes it an array to be added
                    addDonation.received = [];

                    received.forEach(reception => {
                        const receptionPackage = {};
                        const {
                            sponsor,
                            quantity,
                            description
                        } =  reception;
        
                        //adds the files, none of htese are required, so we'll do a front end check for them
                        if(sponsor) receptionPackage.sponsor = sponsor;
                        if(quantity) receptionPackage.quantity = quantity;
                        if(description) receptionPackage.description = description;

                        addDonation.received.push(receptionPackage);
                    })
                   
                }

                newHackathon.donations.push(addDonation);
            });
            
        };

        if(winners){
            //creates the array to add the winners to 
            newHackathon.winners = [];

            winners.forEach(winner => {
                //extracts the required components from each winner
                const {teamName, awardTitle, prizeWon} = winner;

                //adds the object that the winner would be added to
                const addWinners = {teamName, awardTitle};

                if(prizeWon) addWinners.prizeWon = prizeWon;

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
    if(!req.user){
        return res.status(401).json({
            errors: [{msg: "Not authorized to edit a hackathon"}]
        });
    }

    try{

        //grabs the Hackathon that is associated with the Id
        let hackathon = await Hackathon.findOne({_id: hackathonId});


        if((req.user._id + '') != (hackathon.recipient + '')){
            return res.status(401).json({
                errors: [{msg: "Not authorized to edit someone else's hackathon!"}]
            });
        }
        
        //Grabs all the parameters that are modified
        const editParams = req.body;

        //updates the hackathon
        let updateHackathon = await Hackathon.findOneAndUpdate({_id: hackathonId}, {$set: editParams}, {new: true})

        res.status(200).json(updateHackathon);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error or hackathon not found');
    }

})
//PUT       /api/hackathons/edit/add-donation/:id
//Action    add donations that the group has recieved (automatic process)
//PRIVATE   user must be the same user as the hackathon creator
router.put('/edit/add-donations/:id', async(req, res, next) => {
    //get the hackathon id
    let hackathonId = req.params.id;

    try{
        //grab the hackathon model
        let hackathon = await Hackathon.findOne({_id: hackathonId});

        //kicks user out if they are not the owner of the hackathon
        if((hackathon.recipient + '') != (req.user._id + '')) {
            return res.status(401).json({
                errors: [{msg: "Cannot add donation category to hackathon that is not your own!"}]
            });
        }

        //adds the body donation categories to the hackathon
        let donationsToAdd = req.body;
        
        for(donation in donationsToAdd){
            donation.received = [{}];
        }
        
        if(hackathon.donations){

            hackathon.donations.push.apply(hackathon.donations, donationsToAdd);
        }
        else{
            hackathon.donations = donationsToAdd;
        }
        
        await Hackathon.replaceOne({_id: req.params.id}, hackathon);

        return res.status(200).json(hackathon);

    }catch(err){
        console.error(err);
        return res.status(500).send('server error or can\'t find hackathon');
    }
})

//PUT       /api/hackathons/edit/add-donations-received/:id
//Action    add donations that the group has recieved (automatic process)
//PRIVATE   happens behind the scenes when a sponsor agrees to sponsor a hackathon
router.put('/edit/add-donations-received/:id', async(req, res, next) => {
    let hackathonId = req.params.id;
    try{
        //finds the hackathon that needs to be updated
        let hackathon = await Hackathon.findOne({_id: hackathonId});

        //gets the object that contains the updates
        let donationToAdd = req.body;
        
        //adds the donation to the list of donations the hackathon has received
        hackathon.donations.received.push(donationToAdd);

        await hackathon.save();
    }catch(err){
        res.status(500).send('Server error or hackathon invalid')
    }

}); 

module.exports = router;