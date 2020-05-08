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
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                required: true,
            },
            fieldOfStudy: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        }
    ],
    experience: [
        {
            company: {
                type: String,
            },
            position: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
                default: Date.now
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            }
        }
    ],
    previousHackathons: [
        {
            name: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            //This will be them describing what they did at the Hackathon
            description: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
        }
    ],
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