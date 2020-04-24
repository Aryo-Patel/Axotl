const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validationResult, check } = require("express-validator");

//importing models
const RecipientProfile = require('../../models/RecipientProfile')

// POST      api/profiles/recipient/
// Action   Create a recipient profile
// PUBLIC
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
                profile = await RecipientProfile.findOneAndUpdate({ recipient: req.user._id }, { $set, profileParts }, { new: true })
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

// GET      api/profiles/recipient/me
// Action   Return user's profile
// PUBLIC
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

module.exports = router;