const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("../parser").rankingData

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../html/SelectQuery/homeRecord.html'))
    });

router
    .route('/homeQuery')
    .post((req, res) => {
        let year = req.body.year
        var homeRecord = PrintHomeTeamWins(rankingData, year)
        res.send(makeTable(homeRecord, year))
    });

function getHomeWinsPerTeam(rankingData, season, games) {
    var visited = []
    var arr = []
    for (var i = 0; i < rankingData.length; i++){
        if((rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == games)){
            if(visited.indexOf(rankingData[i].TEAM_ID) == -1){
                visited.push(rankingData[i].TEAM_ID)
                arr.push(rankingData[i])
            }
        } 
    }
    return arr;
}

function PrintHomeTeamWins(rankingData, season){
    if (season == 2011) {
        var seasonList = getHomeWinsPerTeam(rankingData, season, 66)
    }
    else if (season == 2019) {
        var seasonList = getHomeWinsPerTeam(rankingData, season, 63)
    }
    else if (season == 2020) {
        var seasonList = getHomeWinsPerTeam(rankingData, season, 72)
    }
    else {
        var seasonList = getHomeWinsPerTeam(rankingData, season, 82)
    }
    var res = []
    for (var i = 0; i < seasonList.length; i++) {
        res.push(seasonList[i].TEAM + " : " + seasonList[i].HOME_RECORD)
    }
    return res
}

function makeTable(myArray, year) {

    var result = "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"" + 
        "integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\"></link>"
     result += "<table class=\"table\" border=1>"
     result += "<thead class=\"thead-dark\">"

     result += "<th scope=\"col\">Team Name</th>"
     result += "<th scope=\"col\">Home record during the " + year + " Season" + "</th>"
    result += "</thead>"
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>"
        result += "<th scope=\"row\">" + myArray[i].substr(0, myArray[i].indexOf(':')) + "</th>"
        result += "<td>" + myArray[i].substr(myArray[i].indexOf(':') + 2, myArray[i].length) +"</td>"
        result += "</tr>"
    }
    result += "</table>"
    result +=   "<form method=\"get\" action=\"/back\">"
    result +=   "<button class=\"btn btn-primary btn-lg\" id=\"save-button\" type=\"submit\" text-align=\"center\">Back</button>"
    result +=   "</form>"

    return result;
}

module.exports = {router, getHomeWinsPerTeam}