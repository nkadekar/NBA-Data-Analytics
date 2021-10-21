const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("./parser").rankingData

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../html/homeRecord.html'))
    });

router
    .route('/homeQuery')
    .post((req, res) => {
        let year = req.body.year;
        var homeRecord = PrintHomeTeamWins(rankingData, year, 82)
        res.send(makeTable(homeRecord))
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