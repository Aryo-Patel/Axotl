const express = require('express');
const router = express.Router();

const Chat = require('../../models/Chat');

//POST      api/chat/create
//Action    create chat (like a group chat type of thing)
//Private

router.post('/create', (req, res) => {
    let {name, recipients, sponsors} = req.body;
   
    let chatParts = {
        name: name,
        recipients: recipients,
        sponsors: sponsors,
        messages: [],
    }

    let chat = new Chat(chatParts)
    chat.save()
    .then(res =>{
        res.json(chat)
    })
    .catch(err => {
        res.status(400).send('Something went wrong')
        console.log(err)
    })
})

//POST      api/chat/:id
//Action    This will be to add recipients or sponsors
//Private
router.post('/users/:id', (req, res) => {
    let recipients = req.body.recipients;
    let sponsors = req.body.sponsors;

    Chat.findOne({id: req.params.id})
    .then(chat => {
        if(recipients != null){
            chat.recipients.unshift(recipients);
        }
        if(sponsors != null){
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
router.post('/messages/:id', (req, res) => {
    let {name, text, date} = req.body;

    let newMessage = {
        name: name,
        text: text,
        date: date,
    }
    Chat.findOne({id: req.params.id})
    .then(chat => {
        chat.messages.push(newMessage)
        chat.save()
        .then(res => {
            res.status(200).send("Yay! Message saved!")
        }).catch(err => {
            res.status(500).send("Error saving message :(")
            console.log(err)
        })
    }).catch(err => {
        res.status(500).send("Server error")
        console.log(err)
    })
})

module.exports = router;