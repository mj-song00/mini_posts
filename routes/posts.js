const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");
const Comments = require('../schemas/comment')
const authMiddleware = require("../middlewares/auath-middleware")
const jwt =require("jsonwebtoken")

//글 저장
router.post ('/posts', authMiddleware ,async (req, res) => {
       const { PostTitle, PostContents } = req.body;
       const PostObject = await Posts.findOne().sort({PostDate : -1}); //포스트 날짜 기준 가장 마지막 게시물 가져옴   
   
       let PostId = 1;
       if(PostObject){
           PostId = PostObject.PostId + 1;
        }else{ //아직 하나도 게시된게 없으면 1번임
            PostId = 1;
        }

        const {authorization} = req.headers
        const [tokenType, tokenValue] = authorization.split(' ');
        const decoded = jwt.verify(tokenValue, "estell");
        
        const PostAuthorId = decoded.userId;

        const PostDate = new Date();
           
       try{
           
           const createdPosts = await Posts.create({  
               PostAuthorId,
               PostId, 
               PostTitle, 
               PostDate, PostContents })
            res.json ({ 
                posts : createdPosts,
                result: "success" });
            
        }catch(error){
            console.log(error)
        }
})

//전체 글 불러오기
router.get('/post', async (req, res) => {
    const post = await Posts.find().sort()
    res.json({ post })

})

//상세 글 불러오기
router.get('/post/:PostId', async (req, res) => {
    const {PostId } = req.params
    const posts = await Posts.findOne({PostId})
    return res.json({ posts })
    })



//수정 
router.put('/post/:PostId', authMiddleware,async (req, res) => {
    const {PostId} = req.params
    const { PostTitle, PostContents } = req.body

    const post = await Posts.findOne({ PostId : Number(PostId)})
    console.log(post)
    if (!post){
         res.status(400)
        .json({ success:false, errorMessage:"해당 post가 존재하지 않아 수정할 수 없습니다." });
    }
    await Posts.updateOne({ PostId: Number(PostId) }, { $set: {  PostTitle, PostContents } });    
    res.status(201)
    .json({ success:true, editedPosts : { 
        PostTitlet: post.PostTitle,
        PostContents: post.PostContents
                                    } });
})

//삭제
router.delete('/post/:PostId', authMiddleware,async (req, res) => {
    const {PostId } = req.params
    
    const post = await Posts.findOne({ PostId : Number(PostId)})
    if (!post){
        res.status(400)
       .json({ success:false, errorMessage:"해당 post가 존재하지 않아 삭제할 수 없습니다." });
   }
   await Posts.deleteOne({ PostId: Number(PostId) });
   res.status(201)
        .json({ success:true });
    await Comments.deleteMany({ commentTargetPostId: Number(PostId) });


})

module.exports = router;