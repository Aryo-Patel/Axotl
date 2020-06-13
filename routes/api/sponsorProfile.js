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
const Sponsor = require('../../models/Sponsor')

// POST      api/profiles/sponsor/
// Action   Create or Update a sponsor profile
// PRIVATE
router.post(
    "/", [check("handle", "Handle is required").not().isEmpty()],
    async(req, res) => {
        if (!req.user) {
            return res.status(401).json({ msg: "Not Authorized" })
        }

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
            const user = await Sponsor.findById(req.user._id);
            user.hasProfile = true;
            user.save();
            res.json({ profile, user })
        } catch (err) {
            console.log(err)
            res.status(500).send("Server Error")
        }
    }
);

// GET      api/profiles/sponsor/me
// Action   Return user's profile
// PRIVATE
router.get("/me", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Not Authorized" })
    }
    try {
        const profile = await SponsorProfile.findOne({ sponsor: req.user._id }).populate("sponsors", ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({ msg: "This profile doesn't exist!" })
        }
        res.json(profile)

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
})

// GET      api/profiles/sponsor/:pageNumber
// Action   Return all sponsor profiles
// PRIVATE
router.get("/:pageNumber", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Not Authorized" })
    }
    console.log('back end all profiles get')
    try {
        const profiles = await SponsorProfile.find().limit(req.params.pageNumber * 10).sort({ date: -1 });
        const num = await SponsorProfile.countDocuments()
        res.json({ profiles, num })
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
})

// GET      api/profiles/sponsor/:id
// Action   Return user's profile
// PRIVATE
router.get("/:id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Not Authorized" })
    }
    try {
        const profile = await SponsorProfile.findOne({ _id: req.params.id }).populate("sponsors", ["name", "avatar"])
        if (!profile) {
            return res.status(400).json({ msg: "This profile doesn't exist!" })
        }
        res.json(profile)

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
})


// DELETE api/profiles/sponsor/me
// Action Delete the user's profile
// PRIVATE
router.delete('/me', async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Not Authorized" })
    }
    try {
        await SponsorProfile.deleteOne({ sponsor: req.user._id })
        res.json({ msg: "Profile Successfully Deleted" })
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
})

//GET /api/profiles/sponsor/locations/:pageNumber
//Action get the distances from the user to all the sponsors
//PRIVATE
router.get('/search/locations/:pageNumber', async(req, res) => {

    if (!req.user) {
        return res.status(404).json({ msg: 'User not authorized' })
    }
    try {
        let myLocation = await RecipientProfile.findOne({ recipient: req.user._id })
        myLocation = myLocation.location
        let profiles = await SponsorProfile.find().limit(req.params.pageNumber * 10).sort({ Date: -1 });
        let destinations = [];
        console.log(`profiles length ${profiles.length}`)
        profiles.forEach(async(profile) => {
            if (profile.location) {
                destinations.push(profile.location);
            } else {
                destinations.push('placeholdernotintendedtoreturn')
            }
        })
        destinations = destinations.join('|')
            // console.log(myLocation)
            // console.log(destinations)
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${myLocation}&destinations=${destinations}&key=${config.get('distanceMatrixKey')}`
        console.log(url)
        const response = await axios.get(url)
        for (let i = 0; i < profiles.length; i++) {
            // console.log(`Profile : ${profiles[i]}`)
            // console.log(response.data.rows[0].elements[i])
            // console.log(profiles[i].location)
            const locs = response.data.rows[0].elements
            if (locs[i].status === 'OK') {
                profiles[i].distanceFromUser = locs[i].distance.text;
                // console.log(`Profile after : ${profiles[i]}`);
            } else {
                profiles[i].distanceFromUser = null;
            }
        }
        const num = await SponsorProfile.countDocuments()
            // console.log(`profiles : ${profiles}`)
        res.json({ profiles, num })
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})

module.exports = router;