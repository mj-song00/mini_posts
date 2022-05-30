const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    nickname : {
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


module.exports = mongoose.model("Comment", commentSchema)