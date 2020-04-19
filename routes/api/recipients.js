const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

//Load the recipient model
const Recipient = require('../../model/Recipient');

// POST      api/recipient/register
// Action   Register the recipient
// PUBLIC

router.post('/register', (req, res) => {

    //Checks to see if the email is already in use
    Recipient.findOne({email: req.body.email})
    .then(recipient =>{
        //If email in use, return this error
        if(recipient) {
            return res.status(400).send({
                Email: "Email already in use!"
            })
        }
        //If the email is unique => create recipient
        else {
            //Creating the avatar
            let avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            })

            //Creating the recipient using req values
            let newRecipient = new Recipient({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar,
            });

            /**
             * TODO: Authentication stuff
             * bcrypt gen salt maybe?
             * You'll have to import whatever stuff you need for implementation.
             * For now, I'm just going to add the password values as they are to the collection.
             */

             //Saving the recipient to the Recipients collection
             newRecipient.save()
             .then(recipient => res.json(recipient))
             .catch(err => console.log(error))
        }
    });
});


// POST      api/recipients/login
// Action   Login the user
// PUBLIC

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find a recipient that has the same email
    Recipient.findOne({email: email})
        .then(recipient =>{
            //Checking for the recipient
            if(!recipient){
                return res.status(404).json({
                    Error: "User not found :("
                });
            } else {
                /**
                 * 
                 * TODO: Authentication stuff
                 * Payloads, etc. 
                 * Right now this is only returning that message for success.
                 * 
                 */
                if(password == recipient.password){
                    res.json({
                        Success: "Log In Successful!"
                    })
                } else {
                    res.json({
                        Failure: "Log In Failed."
                    })
                }
            }
        })
});


