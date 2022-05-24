const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
    postsId : {
        type : String,
        required : true,
    },
    password : {
        type : String, 
        required: true,
    },
    title : {
        type: String,
        required : true,
    },
    date : {
        type: Date,
        required : true,
    },
    contents: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model("Posts", postsSchema)