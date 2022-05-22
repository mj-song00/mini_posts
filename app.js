const express = require('express');
const app = express();
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res)=> {
    res.send('hi! this is main page')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })