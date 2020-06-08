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

        const notifications = [];

        //Creating the recipient using req values
        const newRecipient = new Recipient({
            name,
            email,
            password,
            avatar,
            notifications
        });
        const salt = await bcrypt.genSalt(10)
        newRecipient.password = await bcrypt.hash(password, salt)
            //Saving the recipient to the Recipients collection
        await newRecipient.save()

        //Sending confirmation email
        // const transporter = createTransport({
        //     host: 'mail.privateemail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: config.get('emailUser'),
        //         pass: config.get('emailPass')
        //     },
        //     // tls: {
        //     //     ciphers: 'SSLv3'
        //     // }

        // });
        // let resetLink = '';
        // let authToken = '';
        // let mailOptions = {}
        // jwt.sign({ email: email }, config.get('JWTSecret'), { expiresIn: 10800000 }, async(err, token) => {
        //     if (err) throw err;
        //     authToken += token;
        //     console.log(authToken)
        //     resetLink = `${config.get('productionLink')}/users/confirmemail/${token}`
        //     console.log(`reset link here 1 : ${resetLink}`)
        //     mailOptions = {
        //         from: '"Axotl Support" <support@axotl.com>',
        //         to: email,
        //         subject: "Confirm Email",
        //         text: `Hello ${newRecipient.name},\n\nThank you for registering for Axotl. With brilliant individuals like you, we hope to foster the next generation of tech innovators. In order to verify your account, please confirm your email (expires in 3 hours):\n\n${resetLink}\n\n\nIf you did not request this, please notify us at http://axotl.com/support\n\nThanks!\n-Axotl Support`
        //          html: `<html>
        // <head>
        // <meta charset="utf-8">
        //       </head>

        //       <body syle = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        //       display: flex;
        //       flex-direction: column;
        //       align-items: center;">
        //            //           <table width="100%" border="0" cellspacing="0" cellpadding="0">
        //<tr>
        //<td style="text-align: center;">
        //               <table border="0" cellspacing="0" cellpadding="0" width="100%">
        // <tr>
        // <td align="center">
        //             <div style = "border-bottom: 2px solid grey;">
        //                 <img style="display:inline; vertical-align:middle;"  src="https://i.imgur.com/yrfLbAI.jpg" alt="Welcome" width="100" height="100" class='logo'>
        //                 </img>
        //                 <h3 style = "font-size: 30px; display: inline; padding: 10px 0; vertical-align:middle;
        //                 font-family: 'Raleway', sans-serif;color: rgb(47, 114, 255);">Axotl</h3>
        //             </div>
        //             </td>
        //             </tr>
        //                         </table>
        //               <div style = " padding: 1rem;">
        //                   <p style = "text-decoration: none;
        //                   color: rgb(24, 24, 24);
        //                   font-weight: 400;
        //                   letter-spacing: .2px;">Hello ${newRecipient.name},</p>
        // <p style = "text-decoration: none;
        //                   color: rgb(24, 24, 24);
        //                   font-weight: 400;
        //                   letter-spacing: .2px;">Thank you for registering for Axotl. With brilliant individuals like you, we hope to foster the next generation of tech innovators.</p>
        //                   <p style = "text-decoration: none;
        //                   color: rgb(24, 24, 24);
        //                   font-weight: 400;
        //                   letter-spacing: .2px;">In order to verify your account, please confirm your email below (expires in 3 hours):</p>
        //                   <a style = "text-decoration: none;
        //                   font-weight: 700;
        //                   color: rgb(47, 114, 255);" href=${resetLink}>Forgot Password</a>
        //                   <p  style = "text-decoration: none;
        //                   color: rgb(24, 24, 24);
        //                   font-weight: 400;
        //                   letter-spacing: .2px;">Thanks!</p>
        //                   <p  style = "text-decoration: none;
        //                   color: rgb(24, 24, 24);
        //                   font-weight: 400;
        //                   letter-spacing: .2px;">Axotl Support</p>
        //                   <div style = " background-color: rgb(247, 247, 247);
        //                   padding: 1rem;">
        //                       <img className='footerImg' src="https://i.imgur.com/yrfLbAI.jpg" alt="Welcome" width="50" height="50" class='logo'>
        //                       </img>
        //                       <p>This email was sent to ${user.email}</p>
        //                       <p>
        //                           If you did not request this email, please <span><a class = 'link' href='http://axotl.com/support'>contact us</a></span></p>
        //                   </div>
        //               </div>
        // </td>
        // </tr>
        //           </table>
        //       </body>
        //   </html>`
        //}

        //     console.log(`reset link here 2 : ${resetLink}`)



        //     console.log('trycatch entered')
        //     const verified = await transporter.verify((error, success) => {
        //         if (error) {
        //             console.error(error.message)
        //         } else { console.log("Server is good") };
        //     })
        //     const response = await transporter.sendMail(mailOptions)
        //     console.log('email completed')
        //     console.log(response)
        // })





        res.json(newRecipient)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

//POST       api/users/find
//Action    Find a recipient by their handle
//Private
router.post('/find', (req, res) => {
    RecipientProfile.findOne({ handle: req.body.handle })
        .then(profile => {
            Recipient.findOne({ _id: profile.recipient })
                .then(recipient => {
                    res.json({
                        _id: recipient._id,
                        name: recipient.name,
                        avatar: recipient.avatar,
                    })
                })
        })
        .catch(err => {
            res.json({ error: "Recipient not found" });
            console.log("Recipient not found");
        })
})



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
    console.log('in here');
    req.session.tries = 0;
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



//PUT       api/users/update-notifications
//Action    adds an empty notifications array to all users
//PUBLIC    (Sorta, we don't auth it but it'll be private)
router.put('/update-notifications', async(req, res, next) => {
    try {
        let recipientsArray = await Recipient.find();
        let returnArray = [];

        recipientsArray.forEach(async(recipient) => {
            if (recipient.notifications.length > 0) {
                console.log(recipient.name);
                console.log(recipient.notifications);
            } else {
                let updatedRecipientArray = {
                    ...recipient,
                    notifications: []
                }
                returnArray.push(updatedRecipientArray);
                console.log(updatedRecipientArray);
                await Recipient.update({ _id: recipient._id }, { $set: { notifications: [] } })
            }
        })
        return res.status(200).send(returnArray);
    } catch (err) {
        console.error(err);
        return res.status(500).send("server error");
    }
});


//GET       api/users/notifications/:id
//Action    gets all of a user's notifications
//PRIVATE  
router.get('/notifications/:id', async (req, res, next) => {
    try {
        let recipient = await Recipient.findOne({ _id: req.params.id });
        return res.status(200).json(recipient.notifications);
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }


});

//PUT       api/users/add-notification
//Action    adds a notification with its payload to a user
//PRIVATE   
router.put('/add-notification/:id', async(req, res, next) => {
    try {
        console.log(req.body);
        let recipient = await Recipient.update({ _id: req.params.id }, { $push: { notifications: req.body } });
        return res.status(200).json(recipient);
    } catch (err) {
        console.error(err);
        return res.status(500).send('server error');
    }
});

//DELETE       api/users/delete-notification
//Action    removes a notification from a user's notification array
//PRIVATE  
router.delete('/delete-notification/:recipId/:notifID', async(req, res, next) => {
    try {
        let recipient = await Recipient.findOne({ _id: req.params.recipId });
        let recipNotifications = recipient.notifications;

        recipNotifications.forEach((notification, index) => {
            if (notification._id + "" === req.params.notifID + "") {
                recipNotifications.splice(index, 1);
            }
        });

        let updatedChat = await Recipient.update({ _id: req.params.recipId }, { $set: { notifications: recipNotifications } });
        res.status(200).json(updatedChat);
    } catch (err) {
        console.error(err);
        return res.status(500).send('server err')
    }

})
module.exports = router;