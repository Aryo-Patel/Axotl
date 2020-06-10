const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    name: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
    },
    //These invitations will only be the ObjectIDs
    invitedRecipients: [Schema.Types.ObjectId],
    invitedSponsors: [Schema.Types.ObjectId],
    recipients: [
        {
            userID: {
                type: Schema.Types.ObjectId,
                ref: 'Recipients',
            },
            numUnread: {
                type: Number,
            }
        }
    ],
    sponsors: [{
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'Recipients',
        },
        numUnread: {
            type: Number,
        }
    }],
    messages: [{
        user: {
            type: String,
        },
        name: {
            type: String,
        },
        message: {
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