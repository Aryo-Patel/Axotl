const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validationResult, check } = require("express-validator");
const { Client, Status } = require('@googlemaps/google-maps-services-js')
const config = require('config')
const axios = require('axios')

//importing models 
const SponsorProfile = require('../../models/SponsorProfile');
const RecipientProfile = require('../../models/RecipientProfile');

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
            let sameHandleR = await RecipientProfile.findOne({ handle: handle })
            let sameHandleS = await SponsorProfile.findOne({ handle: handle })
            let profile = await SponsorProfile.findOne({ sponsor: req.user._id })
            if (profile) {
                if (((sameHandleS != null) && (profile._id.toString() != sameHandleS._id.toString())) || sameHandleR != null) {
                    return res.status(400).send("Handle already in use")
                }
                profile = await SponsorProfile.findOneAndUpdate({ sponsor: req.user._id }, { $set: profileParts }, { new: true })
                return res.json(profile)
            }
            if (sameHandleR != null || sameHandleS != null) {
                return res.status(400).send("Handle already in use")
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
        const profiles = await SponsorProfile.find().sort({ date: -1 });
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
        const profile = await SponsorProfile.findOne({ _id: req.params.id }).populate("sponsors", ["name", "avatar"])
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

//GET /api/profiles/sponsor/locations
//Action get the distances from the user to all the sponsors
//PRIVATE
router.get('/search/locations', async(req, res) => {
    if (!req.user) {
        return res.status(404).json({ msg: 'User not authorized' })
    }
    try {
        let myLocation = await RecipientProfile.findOne({ recipient: req.user._id })
        myLocation = myLocation.location
        let profiles = await SponsorProfile.find();
        let destinations = [];
        profiles.forEach(async(profile) => {
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
            // console.log(`Profile : ${profiles[i]}`)
            console.log(response.data.rows[0].elements[i])
            console.log(profiles[i].location)
            const locs = response.data.rows[0].elements
                // console.log(JSON.stringify(locs[i]))
            console.log(i)
            profiles[i].distanceFromUser = locs[i].distance.text;
            // console.log(`Profile after : ${profiles[i]}`)
        }
        console.log(`profiles : ${profiles}`)
        res.json(profiles)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})

module.exports = router;