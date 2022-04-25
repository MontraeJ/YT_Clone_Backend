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
        const comment = await Comment.findById(req.params.id);

        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            return res.send(comment);

          } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
          }
});
router.get('/video/:videoID', async (req, res) => {
    try {
        const comments = await Comment.find({videoID:req.params.videoID});

        if (!comments)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            return res.send(comments);

          } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
          }
});
router.get('/like/:id', async (req, res) => {
    try {
        const comments = await Comment.find({id:req.params.id});

        if (!comments)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            return res.send(comments);

          } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
          }
});
router.post("/", async (req, res) => {//from the frontend
    try {
        let newComment = await Comment({//what is expected to arrive
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
//PUT an existing comment
//http://localhost:3009/api/like/:id
router.put('/like/:id', async (req, res) => {
   try {
    const comment = await Comment.findByIdAndUpdate(
    req.params.id,
               {
                 $inc: {
                    likes: 1
             }
        },
        {new:true}   
    );
       
       if (!comment)
           return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

       await comment.save();
       
       return res.send(comment);
      }catch(ex) {
       return res.status(500).send(`Internal Server Error:${ex}`);
    } 
});
router.put('/dislike/:id', async (req, res) => {
    try {
     const comment = await Comment.findByIdAndUpdate(
     req.params.id,
                {
                  $inc: {
                     dislikes: 1
              }
         },
         {new:true}   
     );
        
        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
 
        await comment.save();
        
        return res.send(comment);
       }catch(ex) {
        return res.status(500).send(`Internal Server Error:${ex}`);
     } 
 });
module.exports = router;