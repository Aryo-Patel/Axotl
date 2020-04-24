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
    passport.use(new localStrategy({ usernameField: 'email' }, async(email, password, done) => {
        console.log('passport internals reached')
        const recipient = await Recipient.findOne({ email })
        const sponsor = await Sponsor.findOne({ email })
        if (!sponsor && !recipient) {
            return done(null, false, { message: 'Incorrect Credentials' })
        }
        const user = recipient || sponsor;
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect Credentials' });
            }
        } catch (err) {
            return done(err);
        }
    }))
}