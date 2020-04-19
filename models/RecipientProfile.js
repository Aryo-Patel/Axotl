const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecipientProfileSchema = new Schema({
    sponsor: {
        type: Schema.Types.ObjectId,
        ref: 'Recipients',
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
     * Specify the type of donations that they are going to want.
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

let RecipientProfile = new mongoose.model("RecipientProfiles", RecipientProfileSchema);

module.exports = RecipientProfile;