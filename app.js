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
app.use('', [postsRouter, userRouter])



app.get('', (req, res) => {
  res.sendFile(path.join(__dirname +'/static/index.html' ))
})

app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname +'/static/detail.html' ))
})

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname +'/static/edit.html' ))
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })