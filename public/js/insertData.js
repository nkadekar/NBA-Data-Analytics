const express = require('express')
const router = express.Router()
const path = require('path')
const alert = require('alert');


router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../html/insertData.html'));
    });

router
    .route('/insertPlayerQuery')
    .post((req, res) => {
        var players = require("./parser").playerData
        const playerName = req.body.PlayerName
        const teamID = req.body.TeamID
        const playerID = req.body.PlayerID
        const seasonPlayed = req.body.SeasonPlayed
        var playerJSON = 
            {
                "PLAYER_NAME": playerName,
                "TEAM_ID": teamID,
                "SEASON": seasonPlayed,
                "PLAYER_ID": playerID
            }
        players.push(playerJSON)
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

router
    .route('/insertTeamQuery')
    .post((req, res) => {
        var teams = require("./parser").teamsData
        const nickname = req.body.nickname
        const teamAbbreviation = req.body.teamAbbreviation
        const yearFounded = req.body.yearFounded
        const city = req.body.city
        var teamJSON = 
            {
                "NICKNAME": nickname,
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
                "DLEAGUEAFFILIATION": '', 
                
            } 
        teams.push(teamJSON)
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });


router
    .route('/insertRankingQuery')
    .post((req, res) => {
        var ranking = require('./parser').rankingData
        const team = req.body.team
        const teamID= req.body.teamID
        const awayRecord = req.body.awayRecord
        const homeRecord = req.body.homeRecord
        const season = req.body.season
        const wins = req.body.wins
        const loses = req.body.loses
        //console.log(ranking[ranking.length - 1])
        var rankingJSON = 
            {
                "TEAM": team,  //Phoenix
                "TEAM_ID": teamID,  //46565456
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
        ranking.push(rankingJSON)
        //console.log(ranking[ranking.length - 1])
        res.sendFile(path.join(__dirname, '../html/index.html'))
    });

function checkInsertDropdown(){
    var val = document.getElementById("insertSelect").value
    if (val == "Players") {
        document.getElementById("userInput1").innerHTML = 
        "<h3>PlayerID:</h3> <input name=\"PlayerID\" required > </input> <br>" + 
        "<h3>TeamID:</h3> <input name=\"TeamID\" required > </input> <br>" +
        "<h3>PlayerName:</h3> <input name=\"PlayerName\" required> </input> <br>" +
        "<h3>Season Played:</h3> <input name = \"SeasonPlayed\" required></input> <br>" +
        "<input type=\"Submit\"> </input>"  
    }
    else if (val == "Teams") {
        document.getElementById("userInput2").innerHTML =
        "Team Name: <input name=\"nickname\" required> </input><br>" +
        "Team Abbreviation: <input name=\"teamAbbreviation\" required></input><br>" +
        "Year Founded: <input name=\"yearFounded\" required></input><br>" + 
        "City: <input name=\"city\" required></input><br>" +
        "<input type=\"Submit\"> </input>"
    }
    else if(val == "Ranking"){
        document.getElementById("userInput3").innerHTML =
        "Team: <input name=\"team\" required></input><br>" + 
        "TeamID: <input name=\"teamID\" required> </input><br>" +
        "Season: <input name=\"season\" required></input><br>" +
        "Wins: <input name=\"wins\" required> </input><br>" +
        "Losses: <input name=\"loses\" required></input><br>" +
        "Home Record: <input name=\"homeRecord\" required></input><br>" + 
        "Away Record: <input name=\"awayRecord\" required></input><br>" +
        "<input type=\"Submit\"> </input>"

    }
}

module.exports = router