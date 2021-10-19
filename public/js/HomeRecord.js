const express = require('express')
const router = express.Router()
const path = require('path')
const rankingData = require('../../data/json/ranking.json')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../html/home.html'))
    });

router
    .route('/homeQuery')
    .post((req, res) => {
        let year = req.body.year;
        var homeRecord = PrintHomeTeamWins(rankingData, year, 82)
        console.log(homeRecord)
        res.send(homeRecord)
    });

function getHomeWinsPerTeam(rankingData, season, games) {
    var visited = []
    var arr = [];
    var counter = 0;
    for (var i = 0; i < rankingData.length; i++){
        if((rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == games)){
            if(visited.indexOf(rankingData[i].TEAM_ID) == -1){
                visited.push(rankingData[i].TEAM_ID);
                arr.push(rankingData[i]);
            }
        } 
    }
    console.log(visited.length)
    return arr;
}

function PrintHomeTeamWins(rankingData, season){
    var res = []
    var seasonList = getHomeWinsPerTeam(rankingData, season, 82)
    for (var i = 0; i < seasonList.length; i++) {
        res.push(seasonList[i].TEAM + " : " + seasonList[i].HOME_RECORD)
    }
    return res
}

module.exports = router