//Require packages
const express = require('express');
const router = express.Router() //allows us to use this file as a router


//Require the hackathon profile
const hackathonProfile = require('../../models/Hackathon');


//POST      /api/hackathons/create
//Action    create a hackathon
//PUBLIC

router.post('/create', async (req, res, next) => {
    try{
        //Check to see if hackathon with the same name exists
        const name = await hackathonProfile.findOne({title: req.body.title});

        if(name){
            return res.status(400).json({
                errors: [{msg: 'Hackathon with that name already exists'}]
            })
        }
        
        //Take the info from the body to create new hackathon
        //start date, end date, title
        const {startDate, endDate, title} = req.body;

        //create new hackathon
        const newHackathon = new Hackathon({
            title,
            desription,
            startDate,
            endDate
        });

        await newHackathon.save();
        res.json(newHackathon);


    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

module.exports = router;