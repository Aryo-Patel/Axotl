const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SponsorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sponsor: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});

let Sponsor = new mongoose.model("Sponsors", SponsorSchema);

module.exports = Sponsor;