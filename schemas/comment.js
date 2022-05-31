const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    

    date : {
        type: Date,
        default:Date.now(),
        required : true,
    },
    comments: {
        type: String,
       
        
    },
    nickname: {
        type: String,
        ref:'User'
    },
})


module.exports = mongoose.model("Comment", commentSchema)