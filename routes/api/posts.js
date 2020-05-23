const express = require("express");
const router = express.Router();
const config = require("config");

const Post = require("../../models/Post");
const Recipient = require("../../models/Recipient");
const Sponsor = require("../../models/Sponsor");

//GET      /api/posts/
//Action    get all posts
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.get("/", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const posts = await Post.find().sort({ Date: -1 });
        res.json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// //GET      /api/posts/me
// //Action    get user's posts
// //PRIVATE   need to be signed in (recipient or sponsor to access route)
// router.get("/me", async(req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ msg: "Unauthorized" });
//     }
//     try {
//         const posts = await Post.find({ user: req.user._id }).sort({ Date: -1 });
//         res.json({ posts });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// });

//GET      /api/posts/single-view/:id
//Action    get a single post
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.get("/single-view/:id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const post = await Post.findById(req.params.id);
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
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        const newPost = new Post({
            user: req.user._id,
            title,
            content,
        });
        if (attachment) {
            newPost.attachment = attachment;
        }
        await newPost.save();
        user.myPosts.unshift(newPost._id);
        res.json({ newPost, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/
//Action    Update a post
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/:id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const { title, content, attachment } = req.body;
    try {
        const newPost = await Post.findOneAndUpdate({ _id: req.params.id }, { $set: { title, content, attachment } }, { new: true });
        const posts = await Post.find();
        //was attempting to minimize size of server response
        // for (let i = 0; i < posts.length; i++) {
        //     if (posts[i]._id.toString() == req.params.id.toString()) {
        //         position = i;
        //         break;
        //     }
        // }
        res.json({ posts });
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
    const post = await Post.findById(req.params.id);
    if (!post.user.toString() == req.user._id.toString()) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        user.myPosts.filter((post) => post.toString() != req.params.id.toString());
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

    try {
        const post = await Post.findById(req.params.post_id);
        const { text } = req.body;
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        await post.comments.unshift({ text, user: req.user._id });
        await post.save();
        user.myComments.unshift({ post: req.params.post_id, comment: post.comments[0]._id })
        await user.save()
        res.json({ post, user });
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
    try {
        const post = await Post.findById(req.params.post_id);
        if (!await post.comments.findById(req.params.comment_id).user.toString == req.user._id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const { text } = req.body;
        let comments = post.comments;
        comments = await comments.findOneAndUpdate({ _id: req.params.comment_id }, { $set: { text } }, { new: true });

        await Post.findOneAndUpdate({ _id: req.params.post_id }, { $set: { comments } }, { new: true });
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//delete      /api/posts/comment/:post_id/:comment_id
//Action    delete a comment
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.delete("/comment/:post_id/:comment_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
        const post = await Post.findById(req.params.post_id);
        const { text } = req.body;
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        await post.comments.filter(
            (comment) => comment._id.toString() != req.params.comment_id
        );
        user.myComments.filter(comment => comment.comment._id != req.params.comment_id);
        await user.save();
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

    try {
        const post = await Post.findById(req.params.post_id);
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        if (
            post.likes.filter(
                (like) => like._id.toString() == req.user._id.toString()
            ).length != 0
        ) {
            return res.status(400).json({ msg: "You can only like a post once!" });
        }
        await post.likes.unshift({ user: req.user._id });
        user.myLiked.unshift(req.params.post_id);
        await post.save();
        await user.save();
        const likes = post.likes
        res.json({ likes, user });
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


    try {
        const post = await Post.findById(req.params.post_id);
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
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
        user.myLiked.filter(likedPost => likedPost.toString() != req.params.post_id.toString())
        await post.save();
        await user.save();
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//PUT      /api/posts/comment/like/:post_id/:comment_id
//Action    add or remove a like to a comment
//PRIVATE   need to be signed in (recipient or sponsor to access route)
router.put("/comment/like/:post_id/:comment_id", async(req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
        const post = await Post.findById(req.params.post_id);
        const comment = await post.comments.findById(req.params.comment_id);
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        if (
            comment.likes.filter(
                (like) => like.user.toString() == req.user._id.toString()
            ).length != 0
        ) {
            comment.likes.filter(
                (like) => like.user.toString() != req.user._id.toString()
            )
            await post.save();
            return res.json({ post })
        } else {
            await comment.likes.unshift({ user: req.user._id });
            await post.save();
            const likes = comment.likes
            res.json({ post });
        }
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
    try {
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        const post = await Post.findById(req.params.post_id);
        const comment = await post.comments.findById(req.params.comment_id);
        const { text } = req.body;

        await post.comments.replies.unshift({ text, user: req.user._id });
        user.myReplies.unshift({ post: req.params.post_id, comment: req.params.comment_id, reply: post.comments.replies[0]._id });
        await user.save();
        await post.save();
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
    try {
        const post = await Post.findById(req.params.post_id);
        if (!await post.comments.findById(req.params.comment_id).user.toString == req.user._id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const { text } = req.body;
        let comments = post.comments;
        let comment = await post.comments.findById(req.params.comment_id);
        let replies = comment.replies;


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
    try {
        const post = Post.findById(req.params.post_id);
        let comments = post.comments;
        let comment = await post.comments.findById(req.params.comment_id);
        let replies = comment.replies;
        let reply = await replies.findById(req.params.reply_id);
        let likes = reply.likes;
        if (
            likes.filter((like) => like.user.toString() == req.user._id.toString())
            .length != 0
        ) {
            likes = likes.filter(
                (like) => like.user.toString() != req.user._id.toString()
            );
        } else {
            likes.push({ user: req.user._id });
        }
        // replies = await replies.findOneAndUpdate({ _id: req.params.reply_id }, { $set: { likes } }, { new: true });
        // comments = await comments.findOneAndUpdate({ _id: req.params.comment_id }, { $set: { replies } }, { new: true });
        // await Post.findOneAndUpdate({ _id: req.params.post_id }, { $set: { comments } }, { new: true });
        await post.save();
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
    try {
        const user =
            (await Recipient.findById(req.user._id)) ||
            (await Sponsor.findById(req.user._id));
        const post = await Post.findById(req.params.post_id);
        const comment = await post.comments.findById(req.params.comment_id);
        await comment.replies.filter(
            (reply) => reply._id.toString() != req.params.reply_id.toString()
        );
        user.myReplies.filter(reply => reply.reply._id.toString() != req.params.reply_id);
        await post.save();
        await user.save();
        res.json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//MAYBE @TODO
//ADD DISLIKES

module.exports = router;