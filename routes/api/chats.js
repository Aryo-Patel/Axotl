const express = require('express');
const router = express.Router();

const Chat = require('../../models/Chat');

//POST      api/chat/create
//Action    create chat (like a group chat type of thing)
//Private

router.post('/create', (req, res) => {
    let { name, recipients, sponsors } = req.body;

    let chatParts = {
        name: name,
        recipients: recipients,
        sponsors: sponsors,
        messages: [],
    }

    let chat = new Chat(chatParts)
    chat.save()
        .then(res => {
            res.json(chat)
        })
        .catch(err => {
            res.status(400).send('Something went wrong')
            console.log(err)
        })
})

//POST      api/chat/users/:id
//Action    This will be to add recipients or sponsors
//Private
router.post('/users/:id', (req, res) => {
    let recipients = req.body.recipients;
    let sponsors = req.body.sponsors;

    Chat.findOne({ id: req.params.id })
        .then(chat => {
            if (recipients != null) {
                chat.recipients.unshift(recipients);
            }
            if (sponsors != null) {
                chat.sponsors.unshift(sponsors);
            }
            chat.save()
                .then(res => {
                    res.status(200).send("Yay updated the chat!")
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
    console.log("This is the message we are going to push: " + newMessage)
    try {
        let chat = await Chat.findOne({ _id: req.params.id })
        chat.messages.push(newMessage)
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
        let chats = await Chat.find();
        console.log(req.user._id);
        let yourChats = chats.filter(chat => {
            let x = false;
            chat.recipients.forEach(recipient => {
                if (recipient.toString() === req.user._id.toString()) {
                    x = true;
                }
            })
            chat.sponsors.forEach(sponsor => {
                if (sponsor.toString() === req.user._id.toString()) {
                    x = true;
                }
            })
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
        res.json(chat)
        console.log(chat);
    }
    catch (err) {
        console.error(err.messsage)
        return res.status(500).send("Server Error")
    }
})

module.exports = router;