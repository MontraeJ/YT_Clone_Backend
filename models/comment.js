//to do: Create a schema
//To do: Create a model from that schema

const Joi = require("joi");
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    videoID: {type: String, required: true, minlength: 2, maxlength: 250},
    dateAdded:  {type: Date, default: Date.now()},
    likes: {type: Number,},
    dislikes: {type: Number,},
    comment:{type: String, required: true, minlength: 2, maxlength: 250}
});
    //add likes and dislikes for each comment {type: number; comment text to be held on to

commentSchema.methods.commentValidate = (comment) => {
    const schema = Joi.object({
        videoID: Joi.string().min(1).max(250).required(),
      //  likes:Joi.
      //  dislikes:Joi.
    });
    return schema.validate(comment);
}

    const Comment = mongoose.model("Comment", commentSchema);

    module.exports = Comment;