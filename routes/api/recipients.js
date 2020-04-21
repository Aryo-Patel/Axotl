const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport')

//Load the recipient model
const Recipient = require('../../models/Recipient');

// POST      api/recipient/register
// Action   Register the recipient
// PUBLIC

router.post('/register', (req, res) => {

    //Checks to see if the email is already in use
    Recipient.findOne({ email: req.body.email })
        .then(recipient => {
            //If email in use, return this error
            if (recipient) {
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

router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:3000/recipient/login' }), (req, res) => {
    /**const email = req.body.email;
    const password = req.body.password;

    //Find a sponsor that has the same email
    Sponsor.findOne({email: email})
        .then(sponsor =>{
            //Checking for the sponsor
            if(!sponsor){
                return res.status(404).json({
                    Error: "User not found :("
                });
            } else {
                AUTHENTICATION STUFF HERE
                if(password == sponsor.password){
                    res.json({
                        Success: "Log In Successful!"
                    })
                } else {
                    res.json({
                        Failure: "Log In Failed."
                    })
                }
            }
        }); */
    res.json({ user: req.user })
});