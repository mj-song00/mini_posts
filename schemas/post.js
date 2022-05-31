const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
    title : {             //제목
        type: String,
        required : true,
    },
    date : {                //생성일자
        type: Date,
        default:Date.now(),
        required : true,
    },
    contents: {             //내용
        type: String,
        required: true,
    },
    nickname: {         //가입시 닉네임
        type: String,
        ref: 'User',
    },
    comments : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }
    
        
               //댓글
       
    
    // postId : {
    //     type: String,
    //     required: true,
    // }
});



module.exports = mongoose.model("Posts", postsSchema)