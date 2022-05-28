const express = require('express');
const app = express();
const port = 3000
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'))

const postsRouter = require("./routes/posts")
const userRouter = require('./routes/users')
app.use('', [postsRouter, userRouter])




app.get('', (req, res)=> {
    res.render(index)
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })