const express = require('express')
const router = express.Router()
const path = require('path');
const { teamsData } = require('./parser');


router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/updateData.html'));
});

router
    .route('/updatePlayerQuery')
    .post((req, res) => {
        var playerData = require("./parser").playerData
        const oldPlayerName = req.body.oldPlayerName
        const newPlayerName = req.body.newPlayerName
        const teamID = req.body.TeamID
        const playerID = req.body.PlayerID
        const seasonPlayed = req.body.SeasonPlayed


        const index = playerData.findIndex(x => x.PLAYER_NAME === oldPlayerName);
        if (index !== undefined) {
            playerData.splice(index, 1);
            var playerJSON = 
            {
                "PLAYER_NAME": newPlayerName,
                "TEAM_ID": teamID,
                "SEASON": seasonPlayed,
                "PLAYER_ID": playerID
            }
            playerData.push(playerJSON)
        // alert('Successfully added player')
        }
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

router
    .route('/updateTeamQuery')
    .post((req, res) => {
        var teamData = require("./parser").teamsData
        const oldTeamName = req.body.oldTeamName
        const newTeamName = req.body.newTeamName
        const teamAbbreviation = req.body.teamAbbreviation
        const yearFounded = req.body.yearFounded
        const city = req.body.city

        const index = teamData.findIndex(x => x.NICKNAME === oldTeamName);
        console.log(teamData)
        console.log("Break")
        if (index !== undefined) {
            teamData[index].NICKNAME = newTeamName
            teamData[index].ABBREVIATION = teamAbbreviation
            teamData[index].YEARFOUNDED = yearFounded
            teamData[index].CITY = city
            //teamData.splice(index, 1);
            /*
            var teamJSON = 
                {
                    "NICKNAME": newTeamName,
                    "ABBREVIATION": teamAbbreviation,
                    "YEARFOUNDED": yearFounded,
                    "CITY": city,
                    "LEAGUE_ID": '',
                    "TEAM_ID": '',
                    "MIN_YEAR": '',
                    "MAX_YEAR": '',
                    "ARENA": '',
                    "ARENACAPACITY": '',
                    "OWNER": '',
                    "GENERALMANAGER": '',
                    "HEADCOACH": '',
                    "DLEAGUEAFFILIATION": ''
                }
                teamData.push(teamJSON) */
        }
        console.log(teamData)
        // alert('Successfully added player')
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

router
    .route('/updateRankingQuery')
    .post((req, res) => {
        var rankingData = require("./parser").rankingData
        const teamName = req.body.teamName
        const season = req.body.season
        const wins = req.body.wins
        const loses = req.body.loses 
        const homeRecord = req.body.homeRecord
        const awayRecord = req.body.awayRecord

        const index = rankingData.findIndex(x => (x.TEAM === teamName && x.SEASON_ID === season));
        if (index !== undefined) {
        rankingData.splice(index, 1);
        var rankingJSON = 
            {
                "TEAM": teamName,  //Phoenix
                "TEAM_ID": "46565456",  //46565456
                "LEAGUE_ID": '',
                "STANDINGSDATE": '',
                "W_PCT": '',
                "RETURNTOPLAY": '',
                "CONFERENCE": '',
                "ROAD_RECORD": awayRecord,
                "HOME_RECORD": homeRecord,
                "SEASON_ID": "2" + season, //22015
                "G": '82',
                "W": wins,
                "L": loses
            } 
            rankingData.push(rankingJSON)
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