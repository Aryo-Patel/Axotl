const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validationResult, check } = require("express-validator");

//importing models
const RecipientProfile = require('../../models/RecipientProfile')

// POST      api/profiles/recipient/
// Action   Create or Update a recipient profile
// PRIVATE
router.post(
    "/", [check("handle", "Handle is required").not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const {

            handle,
            organization,
            location,
            bio,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;
        const profileParts = {}
        profileParts.recipient = req.user._id;
        profileParts.handle = handle;
        if (organization) profileParts.organization = organization;
        if (location) profileParts.location = location;
        if (bio) profileParts.bio = bio;
        const social = {};
        if (youtube) social.youtube = youtube;
        if (facebook) social.facebook = facebook;
        if (twitter) social.twitter = twitter;
        if (instagram) social.instagram = instagram;
        if (linkedin) social.linkedin = linkedin;
        if (social) profileParts.social = social;

        try {
            let profile = await RecipientProfile.findOne({ recipient: req.user._id })
            if (profile) {
                profile = await RecipientProfile.findOneAndUpdate({ recipient: req.user._id }, { $set: profileParts }, { new: true })
                return res.json(profile)
            }
            profile = new RecipientProfile(profileParts)
            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
    }
);

//GET       api/profiles/recipient/education
//Action    Add education to user's profile
//Private 
router.post('/education', [check("school", "School is required").not().isEmpty(), check("from", "From date is required").not().isEmpty(), check("current", "Current bool is required").not().isEmpty(), check("fieldOfStudy", "Field of study is required").not().isEmpty()], (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
    RecipientProfile.findOne({recipient: req.user._id})
    .then(profile => {
        let {
            school,
            degree,
            from,
            to,
            current,
            fieldOfStudy,
            description,
        } = req.body;

        let educationData = {};
        educationData.school = school;
        if(degree) educationData.degree = degree;
        educationData.from = from;
        if(to) educationData.to = to;
        educationData.current = current;
        educationData.fieldOfStudy = fieldOfStudy;
        if(description) educationData.description = description;

        profile.education.unshift(educationData)
        profile.save()
        .then(res => res.json({msg: "Saved!"}))
        .catch(err => res.json({msg: "Error saving :("}))
        }
    )
    .catch(err => res.json(err));
    
})

//GET       api/profiles/recipient/experience
//Action    Add experience to user's profile
//Private 
router.post('/experience', [check("from", "From date is required").not().isEmpty(), check("current", "Current boolean is required").not().isEmpty(), check("description", "Description is required").not().isEmpty()] , (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
    RecipientProfile.findOne({recipient: req.user._id})
    .then(profile => {
        let {
            company,
            position,
            from,
            to,
            current,
            description,
            location,
        } = req.body;

        let newExperience = {};
        if(company) newExperience.company = company;
        if(position) newExperience.position = position;
        newExperience.from = from;
        if(to) newExperience.to = to;
        newExperience.current = current;
        newExperience.description = description;
        if(location) newExperience.location = location;

        profile.experience.unshift(newExperience)
        profile.save()
        .then(res => res.json({msg: "Saved!"}))
        .catch(err => res.json({msg: "Error saving :("}))
        }
    )
    .catch(err => res.json(err));
})

//GET       api/profiles/recipient/previous-hackathons
//Action    Add hackathon to user's profile
//Private 
router.post('/previous-hackathons', [check("date", "Date is required").not().isEmpty(), check("description", "Description is required").not().isEmpty(), check("name", "Name of hackathon is required").not().isEmpty()], (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
    RecipientProfile.findOne({recipient: req.user._id})
    .then(profile => {
        let {
            name,
            date,
            description,
            location,
        } = req.body;

        let newHackathon = {};
        newHackathon.name = name;
        newHackathon.date = date;
        newHackathon.description = description;
        if(location) newHackathon.location = location;

        profile.previousHackathons.unshift(newHackathon)
        profile.save()
        .then(profile => res.json(profile))
        .catch(err => res.json({msg: "Error saving :("}))
        })
    .catch(err => res.json(err));

})

//DELETE    api/profiles/recipient/previous-hackathons/:id
//Action    Delete hackathon from user's profile
//Private 
router.delete('/previous-hackathons/:id', (req, res) => {
    RecipientProfile.findOne({recipient: req.user._id})
    .then(profile => {
        const removeIndex = profile.previousHackathons.map(item => item.id).indexOf(req.params.id)

        profile.previousHackathons.splice(removeIndex, 1);
        profile.save()
        .then(res => res.json(res))
        .catch(err => res.json({msg: "Problem deleting from database"}))
    })
    .catch(err => res.json(err));

})
//DELETE    api/profiles/recipient/education/:id
//Action    Delete education object from user's profile
//Private 
router.delete('/education/:id', (req, res) => {
    RecipientProfile.findOne({recipient: req.user._id})
    .then(profile => {
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id)

        profile.education.splice(removeIndex, 1);
        profile.save()
        .then(res => res.json(res))
        .catch(err => res.json({msg: "Problem deleting from database"}))
    })
    .catch(err => res.json(err));

})
//DELETE    api/profiles/recipient/experience/:id
//Action    Delete experience object from the user's profile
//Private 
router.delete('/experience/:id', (req, res) => {
    RecipientProfile.findOne({recipient: req.user._id})
    .then(profile => {
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id)

        profile.experience.splice(removeIndex, 1);
        profile.save()
        .then(res => res.json(res))
        .catch(err => res.json({msg: "Problem deleting from database"}))
    })
    .catch(err => res.json(err));

})

// GET      api/profiles/recipient/me
// Action   Return user's profile
// PRIVATE
router.get("/me", async(req, res) => {
    try {
        const profile = await RecipientProfile.findOne({ recipient: req.user._id }).populate("recipients", ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({ msg: "This profile doesn't exist!" })
        }
        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// GET      api/profiles/recipient/
// Action   Return all recipient profiles
// PRIVATE
router.get("/", async(req, res) => {
    try {
        const profiles = await RecipientProfile.find();
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


// DELETE api/profiles/recipient/me
// Action Delete the user's profile
// PRIVATE
router.delete('/me', async(req, res) => {
    try {
        await RecipientProfile.deleteOne({ recipient: req.user._id })
        res.json({ msg: "Profile Successfully Deleted" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;