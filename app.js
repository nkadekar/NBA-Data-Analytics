const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

const path = require('path');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname , 'public/index.html'));
});

app.post('/index', (req, res) => {
    let message = req.body.message;
    res.send(`Message: ${message}`);
    console.log(message);
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`)
});

// app.post('/index', (req, res) =>{
//     console.log(req.body.message);
// });

