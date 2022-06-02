const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Post = require('./post');


const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required:true,
    },
    password : {
        type : String,
        required:true,
   
    },
    nickname: {
        type: String,
        //required:true,
    },
    userId:{
        type:String,
        required: true
    }
    
    
    
})

// UserSchema.virtual('posts', {
//     ref: 'Posts',
//     localField: '_id',
//     foreignField: 'userId',
//   });
//   UserSchema.virtual('comments', {
//     ref: 'Comment',
//     localField: '_id',
//     foreignField: 'postsId',
//   });
//   UserSchema.set('toObject', { virtuals: true });
//   UserSchema.set('toJSON', { virtuals: true });
  
  
//   UserSchema.pre('remove', async function (next) {
//     const user = this;
//     try {
//       await Post.deleteMany({ userId: user._id });
//       next();
//     } catch (e) {
//       next();
//     }
//  });
  

module.exports = mongoose.model("User", UserSchema)