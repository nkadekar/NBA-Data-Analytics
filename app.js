const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const csv=require('csvtojson')

app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

const path = require('path');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname , 'public/index.html'));
});

app.post('/', (req, res) => {
    let message = req.body.message;
    res.send(`Message: ${message}`);
    console.log(message);
});

app.get('/players', function(req, res){
  res.sendFile(path.join(__dirname, 'public/players.html'));
});

app.post('/players', (req, res) => {
  
});

app.route('/getPlayers').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/players.html'));
});

// app.get('/wins', (req, res) => {
//     res.sendFile(path.join(_dirname, 'public/wins.html'));
// })


app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`)
});


var csvFilePath = "./data/players.csv"
var playerData

function resolveAfterSeconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
      
    }, 2000);
  });
}

 function getJSON() {
const result = await resolveAfterSeconds();
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    playerData = jsonObj;
    console.log(playerData)
})

}



















//var csv is the CSV file with headers





// app.post('/index', (req, res) =>{
//     console.log(req.body.message);
// });
