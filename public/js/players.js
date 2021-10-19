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
        res.send(players);
    });

function filterplayerData(playerData, value) { 
    let res = []
    for (var i = 0; i < value; i++) {
        res.push(playerData[i].PLAYER_NAME)
    }
    return res
}


module.exports = router;
