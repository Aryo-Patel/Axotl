const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const bcrypt = require('bcryptjs')
const config = require('config')

//Client secrets and ID's for external authentication
const GOOGLE_CLIENT_ID = config.get('googleClientID')
const GOOGLE_CLIENT_SECRET = config.get('googleClientSecret')

//Models
const Recipient = require('../models/Recipient')
const Sponsor = require('../models/Sponsor')

exports.local = (passport) => {
    console.log('breakpoint 1');
    passport.use(new localStrategy({ usernameField: 'email', passReqToCallback: true }, async(req, email, password, done) => {
        if (!req.session.tries) {
            req.session.tries = 0;
        }
        if (req.session.tries > 10) {
            console.log("ISSUE")
            console.log(JSON.stringify(req.session))
            return done(null, false, { message: "You have used too many tries. Try again later" })
        }
        console.log(req.session.tries)
        console.log('passport internals reached')
        const recipient = await Recipient.findOne({ email })
        const sponsor = await Sponsor.findOne({ email })
        if (!sponsor && !recipient) {
            req.session.tries += 1;
            return done(null, false, { message: 'Incorrect Email or Password' })
        }
        const user = recipient || sponsor;
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                req.session.tries += 1;
                return done(null, false, { message: 'Incorrect Email or Password' });
            }
        } catch (err) {
            return done(err);
        }
    }))
}