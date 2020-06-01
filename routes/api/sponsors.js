const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const { validationResult, check } = require('express-validator')
const { createTransport, sendMail } = require('nodemailer')
const config = require('config')
const jwt = require('jsonwebtoken')

//Load the sponsor model
const Sponsor = require('../../models/Sponsor');
const Recipient = require('../../models/Recipient');
const SponsorProfile = require('../../models/SponsorProfile')

//load passport
const passport = require('passport')

// POST     api/sponsor/register
// Action   Register the sponsor
// PUBLIC

router.post('/register', [check('name', 'Name is required').not().isEmpty(), check('email', 'Not a valid email').isEmail(), check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })], async(req, res) => {
    req.session.tries = 0;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //Checks to see if the email is already in use
        const sponsor = await Sponsor.findOne({ email: req.body.email })
        const recipient = await Recipient.findOne({ email: req.body.email })

        //If email in use, return this error
        if (sponsor || recipient) {
            return res.status(400).json({
                errors: [{ msg: 'That email is already in use' }]
            })
        }
        //If the email is unique => create sponsor
        const { name, email, password } = req.body;
        //Creating the avatar
        let avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })



        //Creating the sponsor using req values
        const newSponsor = new Sponsor({
            name,
            email,
            password,
            avatar,
        });
        console.log(newSponsor)
        const salt = await bcrypt.genSalt(10)
        newSponsor.password = await bcrypt.hash(password, salt)
        console.log("Password: " + newSponsor.password)
            //Saving the Sponsor to the Sponsors collection
        await newSponsor.save()


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
        //     resetLink = `${config.get('productionLink')}/sponsors/confirmemail/${token}`
        //     console.log(`reset link here 1 : ${resetLink}`)
        //     mailOptions = {
        //         from: '"Axotl Support" <support@axotl.com>',
        //         to: email,
        //         subject: "Confirm Email",
        //         text: `Hello ${newSponsor.name},\n\nThank you for registering for Axotl. With brilliant individuals like you, we hope to foster the next generation of tech innovators. In order to verify your account, please confirm your email (expires in 3 hours):\n\n${resetLink}\n\n\nIf you did not request this, please notify us at http://axotl.com/support\n\nThanks!\n-Axotl Support`
        //          html: `<html>
        // <head>
        // <meta charset="utf-8">
        //       </head>

        //       <body syle = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        //       display: flex;
        //       flex-direction: column;
        //       align-items: center;">
        //           <table width="100%" border="0" cellspacing="0" cellpadding="0">
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
        //     </td>
        // </tr>
        //           </table>
        //       </body>
        //   </html>`
        //     }

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


        res.json(newSponsor)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});

//POST       api/sponsors/find
//Action    Find a sponsor by their handle
//Private
router.post('/find', (req, res) => {
    Object.keys(req.body).forEach((item) => {
        console.log("THING: " + req.body[item]);
    })
    console.log("Finding sponsor with handle: " + req.body.handle)
    SponsorProfile.findOne({ handle: req.body.handle })
        .then(profile => {
            Sponsor.findOne({ _id: profile.sponsor })
                .then(sponsor =>
                    res.json(sponsor)
                )
        })
        .catch(err => {
            res.json({ error: "Recipient not found" });
            console.log("Sponsor not found");
        })
})

//POST api/sponsors/confirmemail
// Action confirm user's email
//PUBLIC
router.put('/confirmemail/:jwt', async(req, res) => {
    try {
        console.log('backend confirm email reached')
        const email = await jwt.verify(req.params.jwt, config.get('JWTSecret')).email
        const user = await Sponsor.findOne({ email: email })
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


// POST      api/sponsor/login
// Action   Login the user
// PUBLIC

router.post('/login', passport.authenticate('local', { failureRedirect: 'http://localhost:3000/sponsor/login' }), (req, res) => {
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

//DELETE api/sponsors/
// Action Delete profile and user
// PRIVATE
router.delete('/', async(req, res) => {
    try {
        await SponsorProfile.deleteOne({ sponsor: req.user._id })
        await Sponsor.deleteOne({ _id: req.user._id })
        res.json({ msg: "Account Deleted" })
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server Error")
    }
})


//GET /api/sponsors/forgotpassword
//Action request password change
// PUBLIC
router.get('/forgotpassword/:email', async(req, res) => {
    const transporter = createTransport({
        host: 'smtp.axotl.com',
        port: 587,
        secure: false,
        auth: {
            user: config.get('emailUser'),
            pass: config.get('emailPass')
        }
    });
    const resetLink = `${config.get('productionLink')}/api/sponsors/resetpassword`
    jwt.sign({ email: req.params.email }, config.get('JWTSecret'), { expiresIn: 10800000 }, (err, token) => {
        if (err) throw err;
        resetLink += token;
    })
    const mailOptions = {
        from: "Axotl Support",
        to: req.params.email,
        subject: "Forgot Password",
        text: `Hello ${req.name},\n\nHere is the password reset link you requested (expires in 3 hours): ${resetLink}\nIf you did not request this, please notify us at http://axotl.com/support\n\nThanks!\n-Axotl Support`
    }
    try {
        await transporter.verify()
        await sendEmail(mailOptions)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

//POST /api/sponsors/resetpassword/:jwt
//Action send reset password
// PUBLIC (ish, no authentication)
router.post('/resetpassword/:jwt', async(req, res) => {
    try {
        const email = await jwt.verify(req.params.jwt, config.get('JWTSecret'))
        const user = await Sponsor.findOne({ email: email })
        const { password } = req.body;
        //ASSUMING PASSWORDS MATCH
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        res.json({ msg: "Password Changed" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})



module.exports = router;