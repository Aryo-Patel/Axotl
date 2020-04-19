const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const passport = require('passport')


const PORT = process.env.PORT || 6969

const app = express()


//express json format body parsing middleware
app.use(express.json({ extended: false }))

//authentication middleware will be here, TBD but will likely include various passport and express addons


//production static serving from client side
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

//Placeholder for socket initialization for chat


//Define Routers
app.use('/api/users', require('./routes/api/users'))

//Server Initialization
app.listen(PORT, () => {
    console.log('Server Initialized')
})