const mongoose = require('mongoose')

const HackathonSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipients'
    },
    title: {
        type: String,
        required: true,
    },
    dateOccurring: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: TextTrackCue,
    },
    website: {
        type: String
    },
    donations: [{
        type: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
        },
        description: {
            type: String,
        },
        received: [{
            sponsor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sponsors'
            },
            quantity: {
                type: String,
            },
            description: {
                type: String,
            },
        }]
    }],
    completed: {
        type: Boolean,
        required: true
    },
    winners: [{
        teamName:{
            type: String,
        },
        awardTitle: {
            type: String
        },
        prizeWon: {
            type: String
        }
    }]
});

let Hackathon = new mongoose.model('Hackathons', HackathonSchema);

export default Hackathon;