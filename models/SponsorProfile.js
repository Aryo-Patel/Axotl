const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SponsorProfileSchema = new Schema({
    sponsor: {
        type: Schema.Types.ObjectId,
        ref: 'Sponsors',
    },
    handle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    /**
     * 
     * TO DO:
     * Figure out how we want to specify the types of donations that the companies or sponsors would like to make.
     * E.g: Food, computers, money, etc.
     * 
     */
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    social:{
        youtube: {
            type: String
        },
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
    date: {
        type: Date,
        default: Date.now
    },
})

let SponsorProfile = new mongoose.model("SponsorProfiles", SponsorProfileSchema);

module.exports = SponsorProfile;