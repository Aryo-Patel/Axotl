const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const { validationResult, check } = require('express-validator')

//Load the sponsor model
const Sponsor = require('../../models/Sponsor');
const SponsorProfile = require('../../models/SponsorProfile')

//load passport
const passport = require('passport')

// POST     api/sponsor/register
// Action   Register the sponsor
// PUBLIC

router.post('/register', [check('name', 'Name is required').not().isEmpty(), check('email', 'Not a valid email').isEmail(), check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //Checks to see if the email is already in use
        const sponsor = await Sponsor.findOne({ email: req.body.email })

        //If email in use, return this error
        if (sponsor) {
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
        res.json(newSponsor)
    } catch (err) {
        console.log("Entered catch")
        console.error(errors);
        res.status(500).send('Server error');
    }

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