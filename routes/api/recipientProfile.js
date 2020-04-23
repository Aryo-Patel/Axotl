const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validationResult, check } = require("express-validator");

// POST      api/profiles/recipient/register
// Action   Register the recipient
// PUBLIC
router.post(
    "/", [
        passport.authenticate("local", {
            failureRedirect: "http://localhost:3000/recipient/login",
        }), [check("handle", "Handle is required").not().isEmpty()],
    ],
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
        if (organization) profileFields.organization = organization;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
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
            profile = new recipientProfile(profileParts)
            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
    }
);

module.exports = router;