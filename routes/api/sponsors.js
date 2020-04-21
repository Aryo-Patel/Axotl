const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

//Load the sponsor model
const Sponsor = require('../../models/Sponsor');

//load passport
const passport = require('passport')

// POST     api/sponsor/register
// Action   Register the sponsor
// PUBLIC

router.post('/register', (req, res) => {

    //Checks to see if the email is already in use
    Sponsor.findOne({ email: req.body.email })
        .then(sponsor => {
            //If email in use, return this error
            if (sponsor) {
                return res.status(400).send({
                    Email: "Email already in use!"
                })
            }
            //If the email is unique => create sponsor
            else {
                //Creating the avatar
                let avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm',
                })

                //Creating the sponsor using req values
                let newSponsor = new Sponsor({
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

                //Saving the sponsor to the Sponsors collection
                newSponsor.save()
                    .then(sponsor => res.json(sponsor))
                    .catch(err => console.log(error))
            }
        });
});


// POST      api/sponsor/login
// Action   Login the user
// PUBLIC

router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:3000/sponsor/login' }), (req, res) => {
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
                authentication stuff
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