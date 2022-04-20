const Comment = require("../models/comment")
const express = require("express");
const { exist } = require("joi");
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
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            return res.send(product);

          } catch (ex) {
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