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
    res.json(chat);
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
        let yourChats = chats.filter(chat => {
            let x = false;
            chat.recipients.forEach(recipient => {
                if (recipient['userID'].toString() === req.user._id.toString()) {
                    x = true;
                }
            })
            chat.sponsors.forEach(sponsor => {
                if (sponsor['userID'].toString() === req.user._id.toString()) {
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
        if(req.user.sponsor){
            chat.sponsors.forEach(sponsor => {
                if(sponsor.userID.toString() === req.user._id.toString()){
                    sponsor['numUnread'] = 0;
                }
            })
        } else if(!req.user.sponsor){
            chat.recipients.forEach(recipient => {
                if(recipient.userID.toString() === req.user._id.toString()){
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


module.exports = router;