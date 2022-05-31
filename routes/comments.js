const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");
const Comment = require("../schemas/comment")
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middlewares/auath-middleware")
// const { cookie } = require("express/lib/response");

//댓글 저장
router.post('/post/:_id/comments', authMiddleware,async (req, res) => {
    const {  comments } = req.body;
    const {_id} = req.params
    const nickname = res.locals.user.nickname
    console.log(comments, _id, nickname)
   
  try{
      if (comments === null) return res.send({ result:false});

      const newComment = await Comment.create({
        comments, _id, nickname, 
      })
      res.json({
          comment:  newComment,
          result: "success"

      })
  }catch(error){
    console.log(error)
      // res.status(400).json({ success:false, message:"실패"})
    }
   
    
  
  
})
  

//댓글 불러오기
router.get('/:postid/comments', async (req, res) => {
  const {postid} = req.params
  try{
    const comments = await Comment.find({ postid})
    
    const post = await Post.findOne({ postid })
    res.status(200).json({ comments, post })
  }catch(error){
    console.log(error)
  }
  })


//특정 댓글 수정
router.patch('/post/:_id/comments/:id', async(req, res)=> {

  const {_id} = req.params
  const { comments } = req.body
  
  const existId = await Comment.findOne({_id :_id})
    if (existId) {
      await Comment.updateOne({_id : _id}, {set : {comments}})
      res.json({ result:"success"})
    }else{
      return res.status(400).json({ success: false })
    }

})


//특정 댓글 삭제
router.delete('/post/:_id/comments/:commentId', async (req, res) =>{
  const {commentId} = req.params

  const existId = await Comment.findOne({commentId : commentId})
  if (existId) {
    await Comment.deleteOne({commentId})
    res.json({ result:"success"})
  }else{
    return res.status(400).json({ success: false })
  }
})

module.exports = router;

//private functions
function checkPostId(req, res, next){ // 1
  Post.findOne({_id:req.query.postId},function(err, post){
    if(err) return res.json(err);

    res.locals.post = post; // 1
    next();
  });
}