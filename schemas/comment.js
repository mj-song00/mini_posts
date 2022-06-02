const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = new Schema({
  
    commentId: {
        type: Number,
        required: true,
         
      },
      commentContent: {
        type: String,
       
      },
      commentTargetPostId:{
        type: String, 
        ref:"Post",
        required: true,
    },
     commentAuthorId:{
        type: String,
        required: true,
    },

   
})


module.exports = mongoose.model("Comment", comment)