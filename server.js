//packages
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const passport = require('passport')
const session = require('express-session')
const config = require('config')
const MongoStore = require('connect-mongo')(session);

//routers
const recipients = require('./routes/api/recipients');
const sponsors = require('./routes/api/sponsors');
const recipientProfile = require('./routes/api/recipientProfile');
const sponsorProfile = require('./routes/api/sponsorProfile')
const hackathons = require('./routes/api/hackathons');
const hackathonProfile = require('./routes/api/hackathonProfile')
const auth = require('./routes/api/auth')


//database functions
const connectDB = require('./config/db')

//models
const Recipient = require('./models/Recipient')
const Sponsor = require('./models/Sponsor')

//passport authentication strategies
const { local } = require('./config/passport')

const PORT = process.env.PORT || 6969

const app = express()

//initialize database
connectDB();


//express json format body parsing middleware
app.use(express.json({ extended: false }))

//initializing store for sessions
// const store = new MongoStore({
//     uri: config.get('mongoURI'),
//     database: "SessionStorage",
//     collection: 'mySessions'
// }, (err) => {
//     console.log("Database session connection error")
//     console.error(error);
//     process.exit(1);
// });

// Catch errors
// store.on('error', function(error) {
//     console.log("database session storage error")
//     console.log(error);
// });


//initializing session
console.log("initializing session")
app.use(session({
    secret: config.get('sessionSecret'),
    cookie: { maxAge: 10800000 },
    store: new MongoStore({ url: config.get('mongoURI') }),
    resave: true,
    saveUninitialized: true
}))

//session test route
app.get('/', function(req, res) {
    res.json(req.session);
});


//initializing passport, passport strategies, and passport session
console.log("initializing passport")
app.use(passport.initialize())
app.use(passport.session())
local(passport)


//serializes user and attaches cookies
passport.serializeUser((user, done) => {
    done(null, user._id);
});


// deserializes user and attaches user object to req.user from session
passport.deserializeUser(async(id, done) => {
    try {
        console.log('hello')
        console.log(`id : ${id}`)
        const recipient = await Recipient.findById(id);
        const sponsor = await Sponsor.findById(id);
        const user = recipient || sponsor;
        done(null, user);
    } catch (err) {
        console.log('deserialization error')
        return done(err);
    }

});

//production static serving from client side
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}



//Placeholder for socket initialization for chat



//Use the routes
app.use('/api/users', recipients);
app.use('/api/sponsors', sponsors);
app.use('/api/profiles/recipient', recipientProfile)
app.use('/api/profiles/sponsor', sponsorProfile)
app.use('/api/hackathons', hackathons);
app.use('/api/hackathons/hackathon', hackathonProfile);
app.use('/api/auth', auth)

//Server Initialization
app.listen(PORT, () => {
    console.log(`Server Initialized on port ${PORT}`)
})