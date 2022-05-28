const express = require("express");
const router = express.Router();
const User= require("../schemas/user");
const jwt = require("jsonwebtoken")

//회원 가입
router.post('/users', async (req, res) => {
    const {email, nickname, password, confirmPasswrod } = req.body
    const pattern = "^[A-Za-z][A-Za-z0-9_]*$";
    try{
               const existsUser = await User.findOne({
                   $or: [{email}, {nickname}],
               }) 
               if (existsUser) {
                   res.status(400).send({
                        errorMessage :'이미 존재하는 이메일 또는 닉네임입니다.'
                   })
                return
               }
                //닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
               //trim() -> 문자열 양 끝의 공백을 제거
               if (nickname.length < 3 || !nickname.match(pattern)) {
                res.status(400).send({
                    errorMessage : '닉네임은 최소 4자 이상입니다.'
                })
                return
            }
            // //비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패
            if (password.length < 4 || password.includes(nickname) ) {
                res.status(400).send({
                    errorMessage: '비밀번호는 최소 4자이상이며 잘못된 비밀번호입니다.'
                })
                return
            }
        
            if (password !== confirmPasswrod) {
                res.status(400).send({
                   errorMessage: '비밀번호가 일치하지 않습니다.'
                })
                return
            }
            const createUser = await User.create({ email, nickname, password})
            res.json({ users : createUser})
            
         }catch(error){
        res.status(400).send({
            errorMessage: '잘못된 접근입니다.'
        })
        return
    }
})

router.post('/auth', async (req, res)=> {
    const {email, password} = req.body

    const user = await User.findOne({email})
    
    if(!user || password !==user.password){
        res.status(400).send({
            errorMessage: '무엇이 무엇이 틀렸을까'
        })
        return
    }

    res.send({
        token : jwt.sign({ userId: user.userId}, "estell")
    })
})

module.exports = router;