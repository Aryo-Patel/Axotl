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
    notifications: [{
        category: {
            type: String,
            required: true
        },
        sender: {
            type: String
        },
        payload: [{
            type: {
                type: String
            },
            quantity: {
                type: String
            },
            description: {
                type: String
            }
        }]
    }],
    myPosts: [Schema.Types.ObjectId],
    myComments: [{
        post: { type: Schema.Types.ObjectId },
        comment: { type: Schema.Types.ObjectId }
    }],
    myReplies: [{
        post: { type: Schema.Types.ObjectId },
        comment: { type: Schema.Types.ObjectId },
        reply: { type: Schema.Types.ObjectId }
    }],
    myChats: [Schema.Types.ObjectId],
    myLiked: [Schema.Types.ObjectId],
    myHackathons: [Schema.Types.ObjectId],
    chatInvitations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'chats'
        }
    ],
    Date: {
        type: Date,
        default: Date.now,
    },
});

let Recipient = new mongoose.model("Recipients", RecipientSchema);

module.exports = Recipient;