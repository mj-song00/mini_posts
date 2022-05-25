const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");


//글 저장
router.post ('/posts', async (req, res) => {
       const { postsId, password, title, date, contents } = req.body;
       try{
           const posts = await Post.find({ title });
           if (posts.length) {
               return res.status(400).json({ success: false, errorMessage: "제목 도배 못하지롱" })
           }
           const date = new Date()
           const createdPosts = await Post.create({ postsId, password, title, date, contents })
            res.json ({ posts : createdPosts });
            
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

//수정 으아아아아 제발 수정되지마 ㅠㅠ  비밀번호 안넣었다고 ㅜㅜ 어 막혔다 !! 근데 비밀번호 어떻게 넣지 ㅠㅠ 어 끝났다!!
router.patch('/post/:_id', async (req, res) => {
    const {_id} = req.params
    const { postsId, password, title, contents } = req.body

    const existId = await Post.findOne({ _id : _id})
    if (existId.password === password ){
        await Post.updateOne({_id: _id} , { $set : { title, contents, postsId}})
        res.json({ success: true })
    }else {
        return res.status(400).json({ success: false, errorMessage: "비밀번호 틀렸지롱" })
    }
})

//삭제
router.delete('/post/:_id', async (req, res) => {
    const {_id} = req.params
    
    const existId = await Post.find({ _id : _id})
    if (existId.length > 0 ){
        await Post.deleteOne({_id })
    }

    res.json({ result: "success"})

})

module.exports = router;