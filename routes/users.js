const express = require("express");
const router = express.Router();
const User= require("../schemas/user");

//유저 저장
router.post('/users', async (req, res) => {
    const {email, nickname, password, confirmPasswrod } = req.body
    
    if(password !== confirmPasswrod) {
        res.status(400).send({
            errorMessage: "패스워드가 다릅니다."
        })
        return
    }

    const existUsers = await User.findOne({
        $or: [{email}, {nickname}]
    })
    if (existUsers) {
        res.send(400).send({
            errorMessage: "이미 사용중인 이메일 또는 닉네임 입니다."
        })
        return
    }

    const user = new User({ email, nickname, password})
    await user.save()

    res.send(201).send()
})

module.exports = router;