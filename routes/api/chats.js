const express = require('express');
const router = express.Router();

const Chat = require('../../models/Chat');
const Recipient = require('../../models/Recipient');
const Sponsor = require('../../models/Sponsor');

//POST      api/chat/create
//Action    create chat (like a group chat type of thing)
//Private

router.post('/create', async (req, res) => {
    let { name, recipients, sponsors } = req.body;

    let chatParts;

    //This will be used to automatically add the person creating the chat to the group chat.
    let creator = {
        userID: req.user._id,
        numUnread: 0,
    }

    if (req.user.sponsor) {
        chatParts = {
            name: name,
            owner: req.user._id,
            invitedRecipients: recipients,
            invitedSponsors: sponsors,
            sponsors: [creator],
            recipients: [],
            messages: [],
        }
    } else {
        chatParts = {
            name: name,
            owner: req.user._id,
            invitedRecipients: recipients,
            invitedSponsors: sponsors,
            recipients: [creator],
            sponsors: [],
            messages: [],
        }
    }


    let chat = new Chat(chatParts)
    await chat.save();
    if (recipients != null) {
        for (let i = 0; i < recipients.length; i++) {
            Recipient.findOne({ _id: recipients[i] })
                .then(recipient => {
                    console.log(recipient.name);
                    recipient.chatInvitations.push(chat)
                    recipient.save();
                })
        }
    }
    if (sponsors != null) {
        for (let i = 0; i < sponsors.length; i++) {
            Sponsor.findOne({ _id: sponsors[i] })
                .then(sponsor => {
                    console.log(sponsor.name);
                    sponsor.chatInvitations.push(chat)
                    sponsor.save();
                })
        }
    }
    res.json(chat);
})

//POST      api/chat/users/:id
//Action    Add people to a preexisting group chat
//Private
router.post('/users/:id', (req, res) => {
    let recipients = req.body.recipients;
    let sponsors = req.body.sponsors;

    Chat.findOne({ id: req.params.id })
        .then(chat => {
            if (recipients != null) {
                chat.invitedRecipients.unshift(recipients);
                for (let i = 0; i < recipients.length; i++) {
                    Recipient.findOne({ _id: recipients[i] })
                        .then(recipient => {
                            recipient.chatInvitations.push(chat)
                            recipient.save();
                        })
                }
            }
            if (sponsors != null) {
                chat.invitedSponsors.unshift(sponsors);
                for (let i = 0; i < sponsors.length; i++) {
                    Sponsor.findOne({ _id: sponsors[i] })
                        .then(sponsor => {
                            sponsor.chatInvitations.push(chat)
                            sponsor.save();
                        })
                }
            }
            chat.save()
                .then(res => {
                    res.status(200).send(chat)
                }).catch(err => {
                    res.status(500).send("oops! Something went wrong with saving!")
                    console.log(err)
                })
        })
        .catch(err => {
            res.status(500).send("Server Error")
            console.log(err)
        })
})


//POST      api/chat/accept/:id
//Action    This will be the route we use to confirm/accept invites.
//Private
router.post('/accept/:id', (req, res) => {
    let userInfo = {
        userID: req.user._id,
        numUnread: 0,
    }

    console.log(req.params.id);

    Chat.findOne({ _id: req.params.id })
        .then(chat => {
            if (req.user.sponsor) {
                if (chat.invitedSponsors.filter(user => req.user._id.toString() == user).length > 0) {
                    chat.sponsors.unshift(userInfo);
                    Sponsor.findOne({ _id: req.user._id })
                        .then(sponsor => {
                            for (let i = 0; i < sponsor.chatInvitations.length; i++) {
                                if (sponsor.chatInvitations[i].toString() == req.params.id) {
                                    sponsor.chatInvitations.splice(i, i + 1);
                                }
                            }
                            sponsor.save();
                        })
                }
            } else {
                if (chat.invitedRecipients.filter(user => req.user._id.toString() == user).length > 0) {
                    console.log("passed");
                    chat.recipients.unshift(userInfo);
                    Recipient.findOne({ _id: req.user._id })
                        .then(recipient => {
                            for (let i = 0; i < recipient.chatInvitations.length; i++) {
                                if (recipient.chatInvitations[i].toString() == req.params.id.toString()) {
                                    recipient.chatInvitations.splice(i, i + 1);
                                }
                            }
                            recipient.save();
                        })
                }
            }
            chat.save()
            res.status(200).send(chat)
        })
        .catch(err => {
            res.status(500).send("Server Error")
            console.log(err)
        })
})

//POST      api/chat/messages/:id
//Action    This will be the thing that adds messages
//Private
router.post('/messages/:id', async (req, res) => {
    let { name, message, date } = req.body;

    let newMessage = {
        user: req.user._id.toString(),
        name: name,
        message: message,
    }
    try {
        let chat = await Chat.findOne({ _id: req.params.id })
        chat.messages.push(newMessage)
        chat.recipients.forEach(recipient => {
            if (recipient['userID'].toString() != req.user._id.toString()) {
                recipient['numUnread'] += 1
            }
        })
        chat.sponsors.forEach(sponsor => {
            if (sponsor['userID'].toString() != req.user._id.toString()) {
                sponsor['numUnread'] += 1
            }
        })
        chat['lastModified'] = Date.now()
        await chat.save()
        res.json({ msg: "Saved!" })
    }
    catch (err) {
        return res.status(500).send("Server error")
    }
})

//GET       api/chat/
//Action    This will allow us to get all the chat groups that the user is currently part of.
//Private
router.get('/', async (req, res) => {
    try {
        let chats = await Chat.find().sort({lastModified: -1});
        let yourChats = chats.filter(chat => {
            let x = false;
            if(!req.user.sponsor){
                chat.recipients.forEach(recipient => {
                    if (recipient['userID'].toString() === req.user._id.toString()) {
                        x = true;
                    }
                })
            } else {
                chat.sponsors.forEach(sponsor => {
                    if (sponsor['userID'].toString() === req.user._id.toString()) {
                        x = true;
                    }
                })
            }
            return x;
        })
        res.json(yourChats);
    }
    catch (err) {
        console.error(err.messsage)
        return res.status(500).send("Server Error")
    }
})

//GET       api/chat/:id
//Action    Get us the chosen chat's information
//Private
router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        let chat = await Chat.findOne({ _id: req.params.id })
        if (req.user.sponsor) {
            chat.sponsors.forEach(sponsor => {
                if (sponsor.userID.toString() === req.user._id.toString()) {
                    sponsor['numUnread'] = 0;
                }
            })
        } else if (!req.user.sponsor) {
            chat.recipients.forEach(recipient => {
                if (recipient.userID.toString() === req.user._id.toString()) {
                    recipient['numUnread'] = 0;
                }
            })
        }
        chat.save()
        res.json(chat);

    }
    catch (err) {
        console.error(err.messsage)
        return res.status(500).send("Server Error")
    }
})

//GET       api/chat/invite/:id
//Action    Get us the chosen chat's information
//Private
router.get('/invite/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        let chat = await Chat.findOne({ _id: req.params.id })
        res.json(chat);

    }
    catch (err) {
        console.error(err.messsage)
        return res.status(500).send("Server Error")
    }
})


module.exports = router;