const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SponsorProfileSchema = new Schema({
    sponsor: {
        type: Schema.Types.ObjectId,
        ref: 'sponsors',
    },
    handle: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
    },
    donationTypes: {
        merch: {
            type: Boolean
        },
        prizes: {
            type: Boolean
        },
        food: {
            type: Boolean
        },
        drinks: {
            type: Boolean
        },
        workshops: {
            type: Boolean
        },
        judging: {
            type: Boolean
        },
        other: {
            type: Boolean
        },
    },
    donationDescription: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    sponsoredProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hackathon'
    }],
    distanceFromUser: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
})

let SponsorProfile = new mongoose.model("SponsorProfiles", SponsorProfileSchema);

module.exports = SponsorProfile;