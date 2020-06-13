const jwt = require("jsonwebtoken");
const { createTransport, sendMail } = require("nodemailer");
const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require('express-validator')

const Recipient = require("../../models/Recipient");
const Sponsor = require("../../models/Sponsor");

//auth route
router.get("/", (req, res) => {
    // console.log("trying in api/auth");
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        // const user = {}
        // for (key in req.user) {
        //     if (key !== 'password') {
        //         user.key = req.user.key
        //     }
        // }
        // console.log(req.session);
        res.json({ user: req.user });
        // res.json({ user: req.user })
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//GET /api/recipients/forgotpassword
//Action request password change
// PUBLIC
router.get("/forgotpassword/:email", async(req, res) => {
    const transporter = createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.get("emailUser"),
            pass: config.get("emailPass"),
        },
        // tls: {
        //     ciphers: 'SSLv3'
        // }
    });
    let resetLink = "";
    let authToken = "";
    jwt.sign({ email: req.params.email },
        config.get("JWTSecret"), { expiresIn: 10800000 },
        (err, token) => {
            if (err) throw err;
            authToken += token;
            // console.log(token);
            resetLink = `${config.get("productionLink")}/resetpassword/${authToken}`;
        }
    );
    const user =
        (await Recipient.findOne({ email: req.params.email })) ||
        (await Sponsor.findOne({ email: req.params.email }));
    if (user) {
        // console.log(`user : ${user}`);
        // console.log(`resetlink : ${resetLink}`);
        const mailOptions = {
            from: '"Axotl Support" <support@axotl.com>',
            to: req.params.email,
            subject: "Forgot Password",
            text: `Hello ${user.name},\n\nHere is the password reset link you requested (expires in 3 hours): ${resetLink}\n\n\nIf you did not request this, please notify us at http://axotl.com/support\n\nThanks!\n-Axotl Support`,
            html: `<html>
            <head>
              <meta charset="utf-8">
                    </head>

                    <body style = "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;">
                               <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    <td style="text-align: center;" align="center">
                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                    <td align="center">
                                <div style = "border-bottom: 2px solid grey;">
                                    <img style="display:inline; vertical-align:middle;"  src="https://i.imgur.com/yrfLbAI.jpg" alt="Welcome" width="100" height="100" class='logo'>
                                    </img>
                                    <h3 style = "font-size: 30px; display: inline; padding: 10px 0; vertical-align:middle;
                                    font-family: 'Raleway', sans-serif;color: rgb(47, 114, 255);">Axotl</h3>
                                </div>
                                </td>
                                </tr>
                                            </table>
                            <div style = " padding: 1rem;">
                                <p style = "text-decoration: none;
                                color: rgb(24, 24, 24);
                                font-weight: 400;
                                letter-spacing: .2px;">Hello ${user.name},</p>
                                <p style = "text-decoration: none;
                                color: rgb(24, 24, 24);
                                font-weight: 400;
                                letter-spacing: .2px;">Please click on the link below to reset your password (expires in 3 hours):</p>
                                <a style = "text-decoration: none;
                                font-weight: 700;
                                color: rgb(47, 114, 255);" href=${resetLink}>Forgot Password</a>
                                <p  style = "text-decoration: none;
                                color: rgb(24, 24, 24);
                                font-weight: 400;
                                letter-spacing: .2px;">Thanks!</p>
                                <p  style = "text-decoration: none;
                                color: rgb(24, 24, 24);
                                font-weight: 400;
                                letter-spacing: .2px;">Axotl Support</p>
                                <div style = " background-color: rgb(247, 247, 247);
                                padding: 1rem;">
                                    <img className='footerImg' src="https://i.imgur.com/yrfLbAI.jpg" alt="Welcome" width="50" height="50" class='logo'>
                                    </img>
                                    <p style = "text-decoration: none;
                                    color: rgb(24, 24, 24);
                                    font-weight: 400;
                                    letter-spacing: .2px;">This email was sent to ${user.email}</p>
                                    <p style = "text-decoration: none;
                                    color: rgb(24, 24, 24);
                                    font-weight: 400;
                                    letter-spacing: .2px;">
                                        If you did not request this email, please <span><a class = 'link' href='http://axotl.com/support'>contact us</a></span></p>
                                </div>
                            </div>
                            </td>
                         </tr>
                                     </table>
                    </body>
                </html>`
        };
        try {
            // console.log("trycatch entered");
            // const verified = await transporter.verify((error, success) => {
            //     if (error) {
            //         console.error(error.message);
            //     } else {
            //         console.log("Server is good");
            //     }
            // });
            const response = await transporter.sendMail(mailOptions);
            // console.log("email completed");
            console.log(response);

            res.json({ msg: "Forgot Password Email Sent" });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    } else {
        res.status(404).json({ msg: "Account with that email does not exist" });
    }
});

//POST /api/recipients/resetpassword/:jwt
//Action reset password
// PUBLIC (ish, no authentication)
router.post("/resetpassword/:jwt", async(req, res) => {
    try {
        // console.log("backend reset reached");
        const email = await jwt.verify(req.params.jwt, config.get("JWTSecret"))
            .email;
        const user = await Recipient.findOne({ email: email });
        // console.log(email);
        // console.log(user);
        const { password } = req.body;
        if (password.length < 6) {
            res.status(400).json({ msg: "Password too short" });
        }
        //ASSUMING PASSWORDS MATCH
        const salt = await bcrypt.genSalt(10);
        // console.log(`Initial User :`);
        // console.log(user);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // console.log(`After User :`);
        // console.log(user);
        res.json({ msg: "Password Changed" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//POST /api/auth/changepassword
//Action change password
// PRIVATE
router.post("/changepassword", async(req, res) => {
    //check if user is logged in
    if (!req.user) {
        // console.log("unauthorized");
        return res.status(401).json({ msg: "User not authorized" });
    }
    //extract passwords from body and check if current password is correct
    const { password, newPassword } = req.body;
    const corrPassword = await bcrypt.compare(password, req.user.password);
    const sameNewPassword = await bcrypt.compare(newPassword, req.user.password);
    if (!corrPassword) {
        // console.log("password didn't match");
        return res.status(401).json({ msg: "Incorrect Credentials" });
    }
    // if (sameNewPassword) {
    //     return res.status(400).json({ msg: "New password cannot be the same as old password" })
    // }

    try {
        //find the user
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        //validate the password
        if (newPassword.length < 6) {
            return res.status(400).json({ msg: "Password too short" });
        }
        //ASSUMING PASSWORDS MATCH
        //encrypt the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        //save the new password
        await user.save();
        // console.log("we made it");
        res.json({ msg: "Password Changed" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//PATCH /api/auth/edit
//Action edit the user's account
// PRIVATE
router.patch("/edit", [check('name', 'Name is required').not().isEmpty(), check('email', 'Not a valid email').isEmail()], async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // console.log("edit account hit");
    const { email, name } = req.body;
    try {
        const user =
            (await Sponsor.findById(req.user._id)) ||
            (await Recipient.findById(req.user._id));

        user.email = email;
        user.name = name;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;