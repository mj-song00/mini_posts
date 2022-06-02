const jwt = require("jsonwebtoken")
const User = require('../schemas/user')

module.exports = (req, res, next ) => {
    const{ authorization } = req.headers
    const [TokenType, tokenValue] = authorization .split(" ")
    
    if (TokenType !== 'Bearer'){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세용'
        })
    return
    }

    try{ //검증
        const decoded = jwt.verify(tokenValue, "estell")
        //유저가 항상있다고 가정하고  locals라는 공간에 담는다
        //이 미들웨어를 사용하는 곳에서 공통적으로 사용가능 => 편하다.
        // 근데 강의랑 다르게 아무것도 안뜨는데??
        User.findOne({ userId: decoded.userId}).then((user) => {
            res.locals.user = user 
           
            //next()
        })
    } catch(error){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세용'
        })
    return
    }
    next()
}