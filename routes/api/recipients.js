const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport')
const bcrypt = require('bcryptjs')
const config = require('config')
const { validationResult, check } = require('express-validator')
const { createTransport, sendMail } = require('nodemailer')
const jwt = require('jsonwebtoken')

//Load the recipient model
const Recipient = require('../../models/Recipient');
const Sponsor = require('../../models/Sponsor');
const RecipientProfile = require('../../models/RecipientProfile')

// POST      api/users/register
// Action    Register the recipient
// PUBLIC

router.post('/register', [check('name', 'Name is required').not().isEmpty(), check('email', 'Not a valid email').isEmail(), check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })], async(req, res) => {
    req.session.tries = 0;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //Checks to see if the email is already in use
        const recipient = await Recipient.findOne({ email: req.body.email })
        const sponsor = await Sponsor.findOne({ email: req.body.email })

        //If email in use, return this error
        if (recipient || sponsor) {
            return res.status(400).json({
                errors: [{ msg: 'That email is already in use' }]
            })
        }
        //If the email is unique => create recipient
        const { name, email, password } = req.body;
        //Creating the avatar
        let avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })



        //Creating the recipient using req values
        const newRecipient = new Recipient({
            name,
            email,
            password,
            avatar,
        });
        const salt = await bcrypt.genSalt(10)
        newRecipient.password = await bcrypt.hash(password, salt)
            //Saving the recipient to the Recipients collection
        await newRecipient.save()

        //Sending confirmation email
        const transporter = createTransport({
            host: 'mail.privateemail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.get('emailUser'),
                pass: config.get('emailPass')
            },
            // tls: {
            //     ciphers: 'SSLv3'
            // }

        });
        let resetLink = '';
        let authToken = '';
        let mailOptions = {}
        jwt.sign({ email: email }, config.get('JWTSecret'), { expiresIn: 10800000 }, async(err, token) => {
            if (err) throw err;
            authToken += token;
            console.log(authToken)
            resetLink = `${config.get('productionLink')}/users/confirmemail/${token}`
            console.log(`reset link here 1 : ${resetLink}`)
            mailOptions = {
                from: '"Axotl Support" <support@axotl.com>',
                to: email,
                subject: "Confirm Email",
                text: `Hello ${newRecipient.name},\n\nThank you for registering for Axotl. With brilliant individuals like you, we hope to foster the next generation of tech innovators. In order to verify your account, please confirm your email (expires in 3 hours):\n\n${resetLink}\n\n\nIf you did not request this, please notify us at http://axotl.com/support\n\nThanks!\n-Axotl Support`
            }

            console.log(`reset link here 2 : ${resetLink}`)



            console.log('trycatch entered')
            const verified = await transporter.verify((error, success) => {
                if (error) {
                    console.error(error.message)
                } else { console.log("Server is good") };
            })
            const response = await transporter.sendMail(mailOptions)
            console.log('email completed')
            console.log(response)
        })





        res.json(newRecipient)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

//POST api/users/confirmemail
// Action confirm user's email
//PUBLIC
router.put('/confirmemail/:jwt', async(req, res) => {
    try {
        console.log('backend confirm email reached')
        const email = await jwt.verify(req.params.jwt, config.get('JWTSecret')).email
        const user = await Recipient.findOne({ email: email })
        console.log(email)
        console.log(user)

        user.emailConfirmed = true;
        await user.save()
        console.log(`After User :`)
        console.log(user)
        res.json({ msg: "Email Confirmed" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


// POST      api/users/login
// Action    Login the user
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
    // const user = {}
    // for (key in req.user) {
    //     if (key !== 'password') {
    //         user.key = req.user.key
    //     }
    // }
    res.json({ user: req.user })
});

//DELETE api/users/
// Action Delete profile and user
// PRIVATE
router.delete('/', async(req, res) => {
    try {
        await RecipientProfile.deleteOne({ recipient: req.user._id })
        await Recipient.deleteOne({ _id: req.user._id })
        res.json({ msg: "Account Deleted" })
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server Error")
    }
})



//GET       api/users/logout
//Action    log the users out
//PUBLIC    (Sorta, we don't auth it but it'll be private)
router.get('/logout', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Not Authorized" })
    }
    req.logout();
    res.redirect('/');
})


module.exports = router;