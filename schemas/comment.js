const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentId : {
        type : String,
        
    },
    password : {
        type : String, 
        
    },
    date : {
        type: Date,
        default:Date.now(),
        required : true,
    },
    comments: {
        type: String,
        required: true,
    }
})