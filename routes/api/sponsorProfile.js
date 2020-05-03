const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validationResult, check } = require("express-validator");

//importing models 
const SponsorProfile = require('../../models/SponsorProfile')

// POST      api/profiles/sponsor/
// Action   Create or Update a sponsor profile
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
            donationTypes,
            location,
            bio,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;
        const profileParts = {}
        profileParts.sponsor = req.user._id;
        profileParts.handle = handle;
        if (organization) profileParts.organization = organization;
        if (location) profileParts.location = location;
        if (donationTypes) profileParts.donationTypes = donationTypes;
        if (bio) profileParts.bio = bio;
        const social = {};
        if (youtube) social.youtube = youtube;
        if (facebook) social.facebook = facebook;
        if (twitter) social.twitter = twitter;
        if (instagram) social.instagram = instagram;
        if (linkedin) social.linkedin = linkedin;
        if (social) profileParts.social = social;

        try {
            let profile = await SponsorProfile.findOne({ sponsor: req.user._id })
            if (profile) {
                profile = await SponsorProfile.findOneAndUpdate({ sponsor: req.user._id }, { $set, profileParts }, { new: true })
                return res.json(profile)
            }
            profile = new SponsorProfile(profileParts)
            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
    }
);

// GET      api/profiles/sponsor/me
// Action   Return user's profile
// PRIVATE
router.get("/me", async(req, res) => {
    try {
        const profile = await SponsorProfile.findOne({ sponsor: req.user._id }).populate("sponsors", ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({ msg: "This profile doesn't exist!" })
        }
        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// GET      api/profiles/sponsor/
// Action   Return all sponsor profiles
// PRIVATE
router.get("/", async(req, res) => {
    console.log('back end all profiles get')
    try {
        const profiles = await SponsorProfile.find();
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// GET      api/profiles/sponsor/:id
// Action   Return user's profile
// PRIVATE
router.get("/:id", async(req, res) => {
    try {
        const profile = await SponsorProfile.findOne({ sponsor: req.params.id }).populate("sponsors", ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({ msg: "This profile doesn't exist!" })
        }
        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


// DELETE api/profiles/sponsor/me
// Action Delete the user's profile
// PRIVATE
router.delete('/me', async(req, res) => {
    try {
        await SponsorProfile.deleteOne({ sponsor: req.user._id })
        res.json({ msg: "Profile Successfully Deleted" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;