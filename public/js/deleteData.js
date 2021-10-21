const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/deleteData.html'))
    });

router
    .route('/deletePlayerQuery')
    .post((req, res) => {
        var playerData = require('../../data/json/players.json');
        const playerName = req.body.PlayerName
        
        const index = playerData.findIndex(x => x.PLAYER_NAME === playerName);
        if (index !== undefined) playerData.splice(index, 1);


        // // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'));
    });

router
    .route('/deleteTeamQuery')
    .post((req, res) => {
        const teamData = require('../../data/json/team.json')
        const teamName = req.body.TeamName
        console.log(teamData[0].NICKNAME)

        const index = teamData.findIndex(x => x.NICKNAME === teamName);
        if (index !== undefined) teamData.splice(index, 1);

        console.log(teamData[0].NICKNAME)

        // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'));
});

router
    .route('/deleteRankingQuery')
    .post((req, res) => {
        const rankingData = require('../../data/json/ranking.json')
        const teamName = req.body.TeamName
        const season = req.body.Season

        for(var i = 0; i < rankingData.length; i++){
            if((rankingData[i].TEAM == teamName) && (rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == '82')) {
                rankingData.splice(i, 1)
            }
        }
        
      //  var index = rankingData.findIndex(x => (x.TEAM == teamName) && (x.SEASON_ID.substring(1) == season) && (x.G == '82'));
      //  if (index !== undefined) rankingData.splice(index, 1);
        

     /*   var index = rankingData.findIndex(x => (x.TEAM == teamName) && (x.SEASON_ID.substring(1) == season) && (x.G == '82'));
        console.log(rankingData[index])
        if (index !== undefined) rankingData.splice(index, 1);
        console.log(rankingData[index])
    */
        // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

    
function CheckVal(){
    var val = document.getElementById("deleteSelect").value
    if (val == "Players") {
        document.getElementById("userInput").innerHTML = 
        "<h3>Enter a player name to delete from the player dataset. :</h3> <input name=\"PlayerName\" > </input> <br>" +
        "<input type=\"Submit\"> </input>" 
    }
    else if (val == "Teams") {
        document.getElementById("userInput2").innerHTML = 
        "<h3>Enter a team name to delete from the teams dataset. :</h3> <input name=\"TeamName\" > </input> <br>" +
        "<input type=\"Submit\" onClick=getTeam()> </input>" 
    }
    else if (val == "Ranking") {
        document.getElementById("userInput3").innerHTML = 
        "<h3>Enter a team name and season to update from the ranking dataset. </h3> Team Name: <input name=\"TeamName\" > </input>" +
        "Season: <input name=\"Season\"></input><br><br>" +
        "<input type=\"Submit\" onClick=getRanking()> </input>" 
    }
}
    
module.exports = router