
const playerData = require('./data/json/players.json');
const teamData = require('./data/json/team.json');
const rankingData = require('./data/json/ranking.json')

const filterplayerData = require("./public/js/Player")
const PrintTeamWins = require("./public/js/TeamWins")
const PrintHomeTeamWins = require("./public/js/HomeRecord")


var EasternConferencePrint = require("./public/js/EastTeam")
var WesternConferencePrint = require("./public/js/WestTeam")

var West = []
var East = []


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
    res.sendFile(path.join(__dirname , 'public/html/index.html'));
});

app.post('/', (req, res) => {
});

app.get('/players', function(req, res){
  res.sendFile(path.join(__dirname, 'public/html/players.html'));
});

app.route('/getPlayers').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/players.html'));
});

app.route('/getTeams').get((req, res) => {
  West = WesternConferencePrint(rankingData, teamData)
  console.log(West)
  East = EasternConferencePrint(rankingData, teamData)
  console.log(East)
  res.sendFile(path.join(__dirname, 'public/html/teams.html'));
});

app.route('/getWins').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/wins.html'));
});

app.route('/getHome').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/home.html'));
});

app.post('/playersQuery', (req, res) => {
  let numberOfPlayers = req.body.numberOfPlayers;
  var players = filterplayerData(playerData, numberOfPlayers)
  res.send(players);
});

app.post('/conferenceQuery', (req, res) => {
  var choice = req.body.conf
  if(choice == 'west' || choice == "West") {
    res.send(West)
  }
  else if(choice == 'east' || choice == "East"){
    res.send(East)
  }
}
);

app.post('/winsQuery', (req, res) => {
  let year = req.body.year;
  var winsPerTeam = PrintTeamWins(rankingData, year, 82)
  res.send(winsPerTeam);
});

app.post('/homeQuery', (req, res) => {
  let year = req.body.year;
  var homeRecord = PrintHomeTeamWins(rankingData, year, 82)
  console.log(homeRecord)
  res.send(homeRecord);

});



app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.route('/back'). get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});