

const playerData = require('./data/json/players.json');
const teamData = require('./data/json/team.json');
const rankingData = require('./data/json/ranking.json')

const filterplayerData = require("./public/Player")
var EasternConferencePrint = require("./public/Team")
var WesternConferencePrint = require("./public/Team")



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

// app.listen(3000, () => {
//   console.log(`Example app listening on port ${port}!`)
// });

filterplayerData(playerData, 10)
var East = EasternConferencePrint(rankingData, teamData)
console.log("East Teams: ", East)
var West = WesternConferencePrint(rankingData, teamData)
console.log("West Teams:" , West)
app.route('/back'). get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/players', function(req, res){
  res.sendFile(path.join(__dirname, 'public/players.html'));
});

app.route('/getPlayers').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/players.html'));
});

app.route('/getTeams').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/teams.html'));
});

app.route('/getWins').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/wins.html'));
});

app.route('/getHome').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.post('/playersQuery', (req, res) => {
  let year = req.body.year;
  res.send(`Year: ${year}`);
  console.log(year);
});

app.post('/homeQuery', (req, res) => {
  let year = req.body.year;
  res.send(`Message: ${year}`);
  console.log(year)
});

app.post('/teamsQuery', (req, res) => {
  let year = req.body.year  
  res.send(`Message: ${year}`);
  console.log(year)
});

app.post('/winsQuery', (req, res) => {
  let year = req.body.year;
  res.send(`Message: ${year}`);
  console.log(year)
});



app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`)
});


// var csvFilePath = "./data/players.csv"
// var playerData

// function resolveAfterSeconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
      
//     }, 2000);
//   });
// }

//  function getJSON() {
// const result = await resolveAfterSeconds();
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     playerData = jsonObj;
//     console.log(playerData)
// })

// }



















//var csv is the CSV file with headers





// app.post('/index', (req, res) =>{
//     console.log(req.body.message);
// });
