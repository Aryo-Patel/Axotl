const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RecipientProfileSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "Recipients",
    },
    handle: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
    },
    hackathons: [{
        hackathon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hackathons'
        }
    }],
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    social: {
        youtube: {
            type: String,
        },
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

let RecipientProfile = new mongoose.model(
    "RecipientProfiles",
    RecipientProfileSchema
);

module.exports = RecipientProfile;