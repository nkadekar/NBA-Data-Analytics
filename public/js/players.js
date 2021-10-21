const express = require('express')
const router = express.Router()
const path = require('path')
const playerData = require('../../data/json/players.json');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../html/players.html'));
    });

router
    .route('/playersQuery')
    .post((req, res) => {
        let numberOfPlayers = req.body.numberOfPlayers;
        var players = filterplayerData(playerData, numberOfPlayers)
        res.send(makeTable(players));
    });

function filterplayerData(playerData, value) { 
    let res = []
    for (var i = 0; i < value; i++) {
        res.push(playerData[i].PLAYER_NAME)
    }
    return res
}

function makeTable(myArray) {
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        result += "<td>"+myArray[i]+"</td>";
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

module.exports = router;