const express = require('express');
const app = express();
const port = 3000
const path = require('path')
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'))

const postsRouter = require("./routes/posts")
const userRouter = require('./routes/users')
const commentRouter = require('./routes/comments')
app.use('', [postsRouter, userRouter, commentRouter])


//프론트 연결 
// app.get('', (req, res) => {
//   res.sendFile(path.join(__dirname +'/static/index.html' ))
// })

// app.get('/detail', (req, res) => {
//     res.sendFile(path.join(__dirname +'/static/detail.html' ))
// })

// app.get('/edit', (req, res) => {
//     res.sendFile(path.join(__dirname +'/static/edit.html' ))
// })

// app.get('/sign_in', (req, res) => {
//   res.sendFile(path.join(__dirname +'/static/sign_in.html' ))
// })

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname +'/static/login.html' ))
// })

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })