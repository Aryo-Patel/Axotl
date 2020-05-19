const express = require('express');
const router = express.Router();
const config = require('config');

const Post = require('../../models/Post');

//GET      /api/posts/
//Action    get all posts
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.get('/', async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    try {
        const posts = Post.find().sort({ Date: -1 });
        res.json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;