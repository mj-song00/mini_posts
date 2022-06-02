const mongoose = require("mongoose")


const postsSchema = new mongoose.Schema({
    PostTitle : {             //제목
        type: String,
        required : true,
    },
    PostDate : {                //생성일자
        type: Date,
        default:Date.now(),
        required : true,
    },
    PostContents: {             //내용
        type: String,
        required: true,
    },
    // postnickname: {         //가입시 닉네임
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    PostId:{             // 1. 게시물 번호
        type: Number,
        required: true,
    },
    PostAuthorId: {
        type: String,
        required: true,
    },
    comments : [{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Comment', 

    }]
        
    
    
        
               //댓글
       
    
    // postId : {
    //     type: String,
    //     required: true,
    // }
});



module.exports = mongoose.model("Posts", postsSchema)