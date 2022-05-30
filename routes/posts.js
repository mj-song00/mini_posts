const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");


//글 저장
router.post ('/posts', async (req, res) => {
       const { postsId, password, title, date, contents } = req.body;
       try{
           const posts = await Post.find({ title });
           if (posts.length) {
               return res.status(400).json({ success: false, errorMessage: "같은 제목 도배 못하지롱" })
           }
           const date = new Date()
           const createdPosts = await Post.create({ postsId, password, title, date, contents })
            res.json ({ 
                posts : createdPosts,
                result: "success" });
            
        }catch(error){
            console.log(error)
        }
})

//전체 글 불러오기
router.get('/post', async (req, res) => {
    const post = await Post.find()
    res.json({ post })

})

//상세 글 불러오기
router.get('/post/:_id', async (req, res) => {
    const {_id } = req.params
    const posts = await Post.findOne({_id })
    res.json({ posts })
})

//수정 
router.put('/post/:_id', async (req, res) => {
    const {_id} = req.params
    const { password, title, contents } = req.body

    const existId = await Post.findById({ _id : _id})
    if (existId.password === password ){
        await Post.updateOne({_id: _id} , { $set : { title, contents, }})
        res.json({ result: "success"})
    }else {
        return res.status(400).json({ success: false, errorMessage: "비밀번호 틀렸지롱" })
    }
})

//삭제
router.delete('/post/:_id', async (req, res) => {
    const {_id, password} = req.params
    
    const existId = await Post.findOne({ _id : _id})
    if (password !== existId.password){
        await Post.deleteOne({_id })
        res.json({ result: "success"})
    }else{
        res.json({ result: "false"})
    }


})

module.exports = router;