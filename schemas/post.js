const mongoose = require("mongoose")


const postsSchema = new mongoose.Schema({
    postsId : {
        type : String,
        
    },
    password : {
        type : String, 
        
    },
    title : {
        type: String,
        required : true,
    },
    date : {
        type: Date,
        default:Date.now(),
        required : true,
    },
    contents: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Posts", postsSchema)