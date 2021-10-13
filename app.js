

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


app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

const path = require('path');




app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname , 'public/index.html'));
});

app.post('/index', (req, res) => {
    let message = req.body.message;
    res.send(`Message: ${message}`);
    console.log(message);
});

// app.listen(3000, () => {
//   console.log(`Example app listening on port ${port}!`)
// });

filterplayerData(playerData, 10)
var East = EasternConferencePrint(rankingData, teamData)
console.log(East)
var West = WesternConferencePrint(rankingData, teamData)
console.log(West)
