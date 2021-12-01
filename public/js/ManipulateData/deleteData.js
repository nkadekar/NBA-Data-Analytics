const express = require('express')
const router = express.Router()
const path = require('path')
const alert = require('alert')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/ManipulateData/deleteData.html'))
    });

router
    .route('/deletePlayerQuery')
    .post((req, res) => {
        var playerData = require('../parser').playerData;
        const playerName = req.body.PlayerName
        const index = playerData.findIndex(x => x.PLAYER_NAME === playerName)
        if (index !== undefined) playerData.splice(index, 1);
        alert('Successfully deleted player')
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

router
    .route('/deleteTeamQuery')
    .post((req, res) => {
        const teamData = require('../parser').teamData
        const teamName = req.body.TeamName
        const index = teamData.findIndex(x => x.NICKNAME === teamName)
        if (index !== undefined) teamData.splice(index, 1);
        alert('Successfully deleted a team')
        res.sendFile(path.join(__dirname, '../../html/index.html'))
});

router
    .route('/deleteRankingQuery')
    .post((req, res) => {
        const rankingData = require('../parser').rankingData
        var cachedDataJSON = require("../IncrementalAnalytics/homeAwayWinsIncremental").cachedDataJSON
        var cachedDataJSON2 = require("../IncrementalAnalytics/totalRecordIncremental").cachedtotalWinsJSON
        const teamName = req.body.TeamName
        const season = req.body.Season
        for(var i = 0; i < rankingData.length; i++){
            if((rankingData[i].TEAM == teamName) && (rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == '82')) {
                rankingData.splice(i, 1)
            }
        }
        if(Object.keys(cachedDataJSON).length != 0) {
            // look for it 
            // if found --> delete
            // if not --> skip
            // console.log(cachedDataJSON[season - 2004][teamName])
            if(cachedDataJSON[season][teamName] != undefined)
                cachedDataJSON[season - 2004].splice(teamName, 1)

        }
        if(Object.keys(cachedDataJSON2).length != 0) {
            // look for it 
            // if found --> delete
            // if not --> skip
            // console.log(cachedDataJSON2[season - 2004][teamName])
            if(cachedDataJSON2[season][teamName] != undefined)
                cachedDataJSON2[season - 2004].splice(teamName, 1)

        }
        alert('Successfully deleted a team')
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

    
function CheckVal(){
    var val = document.getElementById("deleteSelect").value
    if (val == "Players") {
        document.getElementById("userInput").innerHTML = 
        "<div class=\"form-group\">" + 
        "<label>Enter a player name to delete from the player dataset</label>  <input class=\"form-control\" name=\"PlayerName\" ></input> <br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\"> </input>" 
        document.getElementById("userInput2").innerHTML = ""
        document.getElementById("userInput3").innerHTML = ""
    }
    else if (val == "Teams") {
        document.getElementById("userInput2").innerHTML = 
         "<div class=\"form-group\">" + 
        "Enter a team name to delete from the teams dataset <input class=\"form-control\" name=\"TeamName\" > </input> <br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\" onClick=getTeam()> </input>" 
        document.getElementById("userInput").innerHTML = ""
        document.getElementById("userInput3").innerHTML = ""
    }
    else if (val == "Ranking") {
        document.getElementById("userInput3").innerHTML = 
        "Enter a team name and season to update from the ranking dataset <br><br>" +
        "<div class=\"form-group\">" + 
        "Team Name: <input class=\"form-control\" name=\"TeamName\" > </input>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Season: <input class=\"form-control\" name=\"Season\"></input><br><br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\" onClick=getRanking()> </input>" 
        document.getElementById("userInput").innerHTML = ""
        document.getElementById("userInput2").innerHTML = ""
    }
}
    
module.exports = router