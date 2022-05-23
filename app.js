const express = require('express');
const app = express();
const port = 3000
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'))

const postsRouter = require("./routes/posts")
app.use('', [postsRouter])




app.get('', (req, res)=> {
    res.send('hi! this is main page')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })