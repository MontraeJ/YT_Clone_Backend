const Comment = require("../models/comment")
const express = require("express");
const router = express.Router();

//endpoints will go here

router.get('/', async(req, res) => {
    try{
        const comments = await Comment.find();
        return res.send(comments);
       }catch (ex) {
           return res.status(500).send(`Internal Server Error: ${ex}`);
       }
    });
router.post("/", async (req, res) => {//from the frontend
    try {
        let newComment = await new Comment({//what is expected to arrive
            videoID: req.body.videoID,
            likes: 0,
            dislikes: 0,
            comment: req.body.comment,   
        })//can't continue (awaiting new arrival) until the new comment has been made
        await newComment.save()//new creation is saved in MongoDB Atlas
        return res.status(201).send(newComment);//back to frontend...do what you want with it
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
})

module.exports = router;