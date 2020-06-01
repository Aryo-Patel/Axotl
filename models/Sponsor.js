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
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    notifications: [{
        category: {
            type: String,
            required: true
        },
        payload: {
            type: Object
        }
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
    myLiked: [Schema.Types.ObjectId],
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

let Sponsor = new mongoose.model("Sponsors", SponsorSchema);

module.exports = Sponsor;