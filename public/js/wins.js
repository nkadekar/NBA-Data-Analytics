const express = require('express')
const router = express.Router()
const path = require('path')
const rankingData = require('../../data/json/ranking.json')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../html/wins.html'));
  });

router
    .route('/winsQuery')
    .post((req, res) => {
        let year = req.body.year;
        var winsPerTeam = PrintTeamWins(rankingData, year, 82)
        res.send(makeTable(winsPerTeam));
  });

function getWinsPerTeam(rankingData, season, games) {
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
    return arr;
}

function PrintTeamWins(rankingData, season){
    var seasonList = getWinsPerTeam(rankingData, season, 82)
    var res = []
    for (var i = 0; i < seasonList.length; i++) {
        res.push(seasonList[i].TEAM + ": " +  seasonList[i].W)
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

module.exports = router