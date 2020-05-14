const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validationResult, check } = require("express-validator");

//importing models
const RecipientProfile = require('../../models/RecipientProfile')
const SponsorProfile = require('../../models/SponsorProfile')

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
            let sameHandleR = await RecipientProfile.findOne({ handle: handle })
            let sameHandleS = await SponsorProfile.findOne({ handle: handle })
            let profile = await RecipientProfile.findOne({ recipient: req.user._id })
            if (profile) {
                if (((sameHandleR != null) && (profile._id.toString() != sameHandleR._id.toString())) || sameHandleS != null) {
                    return res.status(400).send("Handle already in use (first)")
                }
                profile = await RecipientProfile.findOneAndUpdate({ recipient: req.user._id }, { $set: profileParts }, { new: true })
                return res.json(profile)
            }
            if (sameHandleR != null || sameHandleS != null) {
                return res.status(400).send("Handle already in use")
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
router.post('/education', [check("school", "School is required").not().isEmpty(), check("from", "From date is required").not().isEmpty(), check("current", "Current bool is required").not().isEmpty(), check("fieldOfStudy", "Field of study is required").not().isEmpty()], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    console.log('back end education route hit')
    try {
        const profile = await RecipientProfile.findOne({ recipient: req.user._id })
        const {
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
        if (degree) educationData.degree = degree;
        educationData.from = from;
        if (to) educationData.to = to;
        educationData.current = current;
        educationData.fieldOfStudy = fieldOfStudy;
        if (description) educationData.description = description;

        profile.education.unshift(educationData)

        await profile.save()
        res.json({ msg: "Saved!" })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }


})

//POST       api/profiles/recipient/experience
//Action    Add experience to user's profile
//Private 
router.post('/experience', [check("from", "From date is required").not().isEmpty(), check("current", "Current boolean is required").not().isEmpty(), check("description", "Description is required").not().isEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    RecipientProfile.findOne({ recipient: req.user._id })
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
            if (company) newExperience.company = company;
            if (position) newExperience.position = position;
            newExperience.from = from;
            if (to) newExperience.to = to;
            newExperience.current = current;
            newExperience.description = description;
            if (location) newExperience.location = location;

            profile.experience.unshift(newExperience)
            profile.save()
                .then(res => res.json({ msg: "Saved!" }))
                .catch(err => res.json({ msg: "Error saving :(" }))
        })
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
    RecipientProfile.findOne({ recipient: req.user._id })
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
            if (location) newHackathon.location = location;

            profile.previousHackathons.unshift(newHackathon)
            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.json({ msg: "Error saving :(" }))
        })
        .catch(err => res.json(err));

})

//DELETE    api/profiles/recipient/previous-hackathons/:id
//Action    Delete hackathon from user's profile
//Private 
router.delete('/previous-hackathons/:id', (req, res) => {
        RecipientProfile.findOne({ recipient: req.user._id })
            .then(profile => {
                const removeIndex = profile.previousHackathons.map(item => item.id).indexOf(req.params.id)

                profile.previousHackathons.splice(removeIndex, 1);
                profile.save()
                    .then(res => res.json(res))
                    .catch(err => res.json({ msg: "Problem deleting from database" }))
            })
            .catch(err => res.json(err));

    })
    //DELETE    api/profiles/recipient/education/:id
    //Action    Delete education object from user's profile
    //Private 
router.delete('/education/:id', (req, res) => {
        RecipientProfile.findOne({ recipient: req.user._id })
            .then(profile => {
                const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id)

                profile.education.splice(removeIndex, 1);
                profile.save()
                    .then(res => res.json(res))
                    .catch(err => res.json({ msg: "Problem deleting from database" }))
            })
            .catch(err => res.json(err));

    })
    //DELETE    api/profiles/recipient/experience/:id
    //Action    Delete experience object from the user's profile
    //Private 
router.delete('/experience/:id', (req, res) => {
    RecipientProfile.findOne({ recipient: req.user._id })
        .then(profile => {
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id)

            profile.experience.splice(removeIndex, 1);
            profile.save()
                .then(res => res.json(res))
                .catch(err => res.json({ msg: "Problem deleting from database" }))
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

// GET      api/profiles/recipient/:id
// Action   Return user's profile
// PRIVATE
router.get("/:id", async(req, res) => {
    try {
        const profile = await RecipientProfile.findOne({ _id: req.params.id }).populate("recipients", ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({ msg: "This profile doesn't exist!" })
        }
        res.json(profile)

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