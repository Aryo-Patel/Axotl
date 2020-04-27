const mongoose = require('mongoose')

const HackathonSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipients',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
            type: {
                type: String,
            },
            quantity: {
                type: String,
            },
            description: {
                type: String,
            },
        }]
    }], 
    startDate : {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    winners: [{
        teamName:{
            type: String,
            required: true
        },
        awardTitle: {
            type: String,
            required: true
        },
        prizeWon: {
            type: String
        }
    }]
});

let Hackathon = new mongoose.model('Hackathons', HackathonSchema);

module.exports = Hackathon;