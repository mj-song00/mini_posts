const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment")

//댓글 저장
router.post('/post/:_id/comments', async (req, res) => {
    const { nickname, date, comments } = req.body;
  try{
      const createdComments = await  Comment.create({
           date, comments, nickname
      })
      res.json({
          comments : createdComments,
          result: "success"
      })
  }catch(error){
    console.log(error)
  }  

})

//댓글 불러오기
router.get('/post/:_id/comments', async (req, res) => {
  const comment = await Comment.find()
  res.json({ comment })
  })


//특정 댓글 수정
router.patch('/post/:_id/comments/:commentId', async(req, res)=> {

  const {commentId} = req.params
  const { comments } = req.body
  
  const existId = await Comment.findById({commentId : commentId})
  if (existId) {
    await Comment.updateOne({commentId:commentId}, {set : {comments}})
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