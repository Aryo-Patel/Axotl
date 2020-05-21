const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sponsor: {
        type: Boolean,
        default: false,
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
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});

let Recipient = new mongoose.model("Recipients", RecipientSchema);

module.exports = Recipient;