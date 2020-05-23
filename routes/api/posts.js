const express = require("express");
const router = express.Router();
const config = require("config");

const Post = require("../../models/Post");

//GET      /api/posts/
//Action    get all posts
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.get("/", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const posts = Post.find().sort({ Date: -1 });
        res.json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//GET      /api/posts/me
//Action    get user's posts
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.get("/me", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const posts = Post.find({ user: req.user._id }).sort({ Date: -1 });
        res.json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//GET      /api/posts/me
//Action    get user's posts
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.get("/single-view/:id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const post = Post.findById(req.params.id).sort({ Date: -1 });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//POST      /api/posts/
//Action    Create a post
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.post("/", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const { title, content, attachment } = req.body;
    try {
        const newPost = new Post({
            user: req.user._id,
            title,
            content,
        });
        if (attachment) {
            newPost.attachment = attachment;
        }
        await newPost.save();
        res.json({ newPost });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/
//Action    Create a post
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/:id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const { title, content, attachment } = req.body;
    try {
        const newPost = await Post.findOneAndUpdate({ _id: req.params.id }, { $set: { title, content, attachment } }, { new: true });
        res.json({ newPost });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//DELETE      /api/posts/
//Action    delete a post
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.delete("/:id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.id);
    if (!post.user.toString() == req.user._id.toString()) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        await post.deleteOne();
        res.json({ msg: "Post deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/comment/:post_id
//Action    add a comment
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/comment/:post_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    const { text } = req.body;
    try {
        await post.comments.unshift({ text, user: req.user._id });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/comment/:post_id/:comment_id
//Action    edit a comment
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/comment/:post_id/:comment_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    if (!post.comments.findById(req.params.comment_id).user.toString == req.user._id) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const { text } = req.body;
    let comments = post.comments;
    comments = comments.findOneAndUpdate({ _id: req.params.comment_id }, { $set: { comments } }, { new: true });
    try {
        await Post.findOneAndUpdate({ _id: req.params.post_id }, { $set: { comments } }, { new: true });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//delete      /api/posts/comment/:post_id
//Action    add a comment
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.delete("/comment/:post_id/:comment_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    const { text } = req.body;
    try {
        await post.comments.filter(
            (comment) => comment._id.toString() != req.params.comment_id
        );
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/like/:post_id
//Action    add a like
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/like/:post_id/", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);

    try {
        if (
            post.likes.filter(
                (like) => like._id.toString() == req.user._id.toString()
            ).length != 0
        ) {
            return res.status(400).json({ msg: "You can only like a post once!" });
        }
        await post.likes.unshift({ user: req.user._id });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT       /api/posts/unlike/:post_id/
//Action    remove a like
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/unlike/:post_id/", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);

    try {
        if (
            post.likes.filter(
                (like) => like._id.toString() == req.user._id.toString()
            ).length == 0
        ) {
            return res.status(400).json({ msg: "You haven't liked this post yet!" });
        }
        await post.likes.filter(
            (like) => like._id.toString() != req.user._id.toString()
        );
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/reply/:post_id/:comment_id
//Action    add a reply
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/reply/:post_id/:comment_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    const comment = post.comments.findById(req.params.comment_id)
    const { text } = req.body;
    try {
        await post.comments.replies.unshift({ text, user: req.user._id });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT       /api/posts/reply/:post_id/:comment_id/:reply_id
//Action    edit a reply to a comment
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/reply/:post_id/:comment_id/:reply_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    if (!post.comments.findById(req.params.comment_id).user.toString == req.user._id) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const { text } = req.body;
    let comments = post.comments;
    let comment = post.comments.findById(req.params.comment_id);
    let replies = comment.replies;

    try {
        replies = await replies.findOneAndUpdate({ _id: req.params.reply_id }, { $set: { text } }, { new: true });
        // comments = await comments.findOneAndUpdate({ _id: req.params.comment_id }, { $set: { replies } }, { new: true });
        // await Post.findOneAndUpdate({ _id: req.params.post_id }, { $set: { comments } }, { new: true });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT       /api/posts/reply/like/:post_id/:comment_id/:reply_id
//Action    add a like to a reply
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/reply/like/:post_id/:comment_id/:reply_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    let comments = post.comments;
    let comment = post.comments.findById(req.params.comment_id);
    let replies = comment.replies;
    let reply = replies.findById(req.params.reply_id)
    let likes = reply.likes;
    if (likes.filter(like => like.user.toString() == req.user._id.toString()).length != 0) {
        likes = likes.filter(like => like.user.toString() != req.user._id.toString())
    } else {
        likes.push({ user: req.user._id })
    }

    try {
        // replies = await replies.findOneAndUpdate({ _id: req.params.reply_id }, { $set: { likes } }, { new: true });
        // comments = await comments.findOneAndUpdate({ _id: req.params.comment_id }, { $set: { replies } }, { new: true });
        // await Post.findOneAndUpdate({ _id: req.params.post_id }, { $set: { comments } }, { new: true });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//DELETE /api/posts/reply/:post_id/:comment_id/:reply_id
//Action    delete a reply
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.delete("/reply/:post_id/:comment_id/:reply_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const post = Post.findById(req.params.post_id);
    const comment = post.comments.findById(req.params.comment_id)
    try {
        await comment.replies.filter(reply => reply._id.toString() != req.params.reply_id.toString());
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//MAYBE @TODO
//ADD DISLIKES

module.exports = router;