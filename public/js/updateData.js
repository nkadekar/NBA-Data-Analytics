const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/updateData.html'));
});

router
    .route('/updatePlayerQuery')
    .post((req, res) => {
        const playerData = require('../../data/json/players.json')
        const oldPlayerName = req.body.oldPlayerName
        const newPlayerName = req.body.newPlayerName
        const teamID = req.body.TeamID
        const playerID = req.body.PlayerID
        const seasonPlayed = req.body.SeasonPlayed
        
        for(var i = 0; i < playerData.length; i++){
            if(playerData[i].PLAYER_NAME == oldPlayerName){
                playerData[i].PLAYER_NAME = newPlayerName
                playerData[i].TEAM_ID = teamID
                playerData[i].PLAYER_ID = playerID
                playerData[i].SEASON = seasonPlayed
                break;
            }
        }
        // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

router
    .route('/updateTeamQuery')
    .post((req, res) => {
        const teamData = require('../../data/json/team.json')
        const oldTeamName = req.body.oldTeamName
        const newTeamName = req.body.newTeamName
        const teamAbbreviation = req.body.teamAbbreviation
        const yearFounded = req.body.yearFounded
        const city = req.body.city
        console.log(teamData[0].NICKNAME)

        for(var i = 0; i < teamData.length; i++){
            if(teamData[i].NICKNAME == oldTeamName){
                teamData[i].NICKNAME = newTeamName
                teamData[i].ABBREVIATION = teamAbbreviation
                teamData[i].YEARFOUNDED = yearFounded
                teamData[i].CITY = city
                break;
            }
        }

        console.log(teamData[0].NICKNAME)
        // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'));
    });

router
    .route('/updateRankingQuery')
    .post((req, res) => {
        const rankingData = require('../../data/json/ranking.json')
        const teamName = req.body.teamName
        const season = req.body.season
        const wins = req.body.wins
        const loses = req.body.loses 
        const homeRecord = req.body.homeRecord
        const awayRecord = req.body.awayRecord



        for(var i = 0; i < rankingData.length; i++){
            if((rankingData[i].TEAM == teamName) && (rankingData[i].SEASON_ID.substring(1) == season)){
                rankingData[i].HOME_RECORD = homeRecord
                rankingData[i].W = wins
                rankingData[i].L = loses
                rankingData[i].ROAD_RECORD = awayRecord
                break;
            }
        }
        // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

function CheckVal(){
    var val = document.getElementById("updateSelect").value 
    if (val == "Players") {
        document.getElementById("userInput").innerHTML = 
        "<h3>Enter a player name to update from the player dataset. </h3> <input name=\"oldPlayerName\" > </input> <br>" +
        "<h3>New PlayerID:</h3> <input name=\"PlayerID\" required > </input> <br>" + 
        "<h3>New TeamID:</h3> <input name=\"TeamID\" required > </input> <br>" +
        "<h3>New PlayerName:</h3> <input name=\"newPlayerName\" required> </input> <br>" +
        "<h3>Season Played:</h3> <input name = \"SeasonPlayed\" required></input> <br>" +
        "<input type=\"Submit\"> </input>"  
    }
    else if (val == "Teams") {
        document.getElementById("userInput2").innerHTML =
        "<h3>Enter a team name to update</h3> <input name=\"oldTeamName\" > </input> <br>" +
        "Team Name: <input name=\"newTeamName\" > </input><br>" +
        "Team Abbreviation: <input name=\"teamAbbreviation\"></input><br>" +
        "Year Founded: <input name=\"yearFounded\"></input><br>" + 
        "City: <input name=\"city\" ></input><br>" +
        "<input type=\"Submit\"> </input>"
    }
    else if (val == "Ranking") {
        document.getElementById("userInput3").innerHTML =
        "<h3>Enter a team name and season to update from the ranking dataset. </h3> Team Name: <input name=\"teamName\" > </input>" +
        "Season: <input name=\"season\"></input><br><br>" +
        "Wins: <input name=\"wins\" > </input><br>" +
        "Losses: <input name=\"losses\"></input><br>" +
        "Home Record: <input name=\"homeRecord\"></input><br>" + 
        "Away Record: <input name=\"awayRecord\" ></input><br>" +
        "<input type=\"Submit\"> </input>"
    }
}

module.exports = router