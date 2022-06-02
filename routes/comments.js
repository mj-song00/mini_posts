const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");
const Comment = require("../schemas/comment")
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middlewares/auath-middleware")
// const { cookie } = require("express/lib/response");

//댓글 저장
router.post('/:PostId/comments', authMiddleware,async (req, res) => {
    const { commentContent } = req.body;
    const {postid} = req.params
    const lastCommentObject = await Comment.findOne().sort({commentDate: -1});
    console.log(comments, postid,lastCommentObject  )
    let lastCommentId = 1;
    if(lastCommentObject){
        lastCommentId = lastCommentObject.commentId + 1;
    }else{ //아직 하나도 게시된게 없으면 1번임
        lastCommentId = 1;
    }

          const {authorization} = req.headers;
           
           const [tokenType, tokenValue] = authorization.split(' ');
           const decoded = jwt.verify(tokenValue, "estell");
           
           const commentAuthorId = decoded.userId;
           const commentDate = new Date();

  try{
      if (comments === null) return res.send({ result:false});

      const newComment = await Comment.create({
        commentId : lastCommentId,
        commentTargetPostId : postid,
        commentAuthorId : commentAuthorId,
        commentContent,
        commentDate 
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
router.get('/:PostId/comments', async (req, res) => {
  const {PostId} = req.params
  try{
    const commentList = await Comment.find({ commentTargetPostId: PostId })
   
    
    res.status(200).json({ commentList  })
  }catch(error){
    console.log(error)
  }
  })


//특정 댓글 수정
router.patch('/:PostId/comments/:commentId', authMiddleware,async(req, res)=> {

  const {commentId} = req.params
  const { commentContent } = req.body
  
  try{
    await Comment.updateOne({ commentId: Number(commentId) }, { $set: { commentContent } });

    res
        .status(201)
        .json({ success: true, message:"코멘트 수정 완료" });
}catch(error){
    res
        .status(400)
        .json({ success: false, message:"코멘트를 찾을 수 없거나 서버 연결에 실패하여 수정 실패" });
}

})


//특정 댓글 삭제
router.delete('/:PostId/comments/:commentId',authMiddleware ,async (req, res) =>{
  const {PostId, commentId} = req.params

  try{
    const comment = await Comment.deleteOne({ commentId: Number(commentId), commentTargetPostId: Number(PostId) });
    res.status(201).json({ success: true, message:"삭제 완료" });
  }catch{
    res.status(400).json({ success: false, message:"코멘트를 찾을 수 없거나 서버 연결에 실패하여 삭제 실패" });
  }
})

module.exports = router;

//private functions
// function checkPostId(req, res, next){ // 1
//   Post.findOne({_id:req.query.postId},function(err, post){
//     if(err) return res.json(err);

//     res.locals.post = post; // 1
//     next();
//   });
// }


