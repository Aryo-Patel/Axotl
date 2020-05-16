const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    name: {
        type: String,
    },
    // read: [{
    //     user: {
    //         type: String,
    //     },
    //     read: {
    //         type: Boolean,
    //     }
        
    // }],
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipients',
    }],
    sponsors: [{
        type: Schema.Types.ObjectId,
        ref: 'Sponsors',
    }],
    messages: [{
            name: {
                type: String,
            },
            text: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },

    }],
})

let Chat = new mongoose.model("Chats", ChatSchema);

module.exports = Chat;