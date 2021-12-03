const express = require('express')
const router = express.Router()
const path = require('path');
const { teamsData } = require('../parser');
const alert = require('alert')

/**
 * Route serving update manipulation
 * @name get/updateButton
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/ManipulateData/updateData.html'));
});

/**
 * Route serving player updates
 * @name get/updateButton/updatePlayerQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/updatePlayerQuery')
    .post((req, res) => {
        var playerData = require("../parser").playerData
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
        alert('Successfully updated player')
        }
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

/**
 * Route serving team updates
 * @name get/updateButton/updateTeamQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/updateTeamQuery')
    .post((req, res) => {
        var teamData = require("../parser").teamsData
        const oldTeamName = req.body.oldTeamName
        const newTeamName = req.body.newTeamName
        const teamAbbreviation = req.body.teamAbbreviation
        const yearFounded = req.body.yearFounded
        const city = req.body.city
        const index = teamData.findIndex(x => x.NICKNAME === oldTeamName);
        if (index !== undefined) {
            teamData[index].NICKNAME = newTeamName
            teamData[index].ABBREVIATION = teamAbbreviation
            teamData[index].YEARFOUNDED = yearFounded
            teamData[index].CITY = city
        }
        alert('Successfully updated team')
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

/**
 * Route serving ranking updates
 * @name get/updateButton/updateRankingQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/updateRankingQuery')
    .post((req, res) => {
        var rankingData = require("../parser").rankingData
        var cachedDataJSON = require("../IncrementalAnalytics/homeAwayWinsIncremental").cachedDataJSON
        var cachedDataJSON2 = require("../IncrementalAnalytics/totalRecordIncremental").cachedtotalWinsJSON
        const teamName = req.body.teamName
        const season = req.body.season
        const wins = req.body.wins
        const loses = req.body.loses 
        const homeRecord = req.body.homeRecord
        const awayRecord = req.body.awayRecord
        var index = rankingData.findIndex(x => (x.TEAM === teamName && x.SEASON_ID === season));
        if (index !== undefined) {
        rankingData.splice(index, 1);
        var rankingJSON = 
            {
                "TEAM": teamName, 
                "TEAM_ID": "46565456",  
                "LEAGUE_ID": '',
                "STANDINGSDATE": '',
                "W_PCT": '',
                "RETURNTOPLAY": '',
                "CONFERENCE": '',
                "ROAD_RECORD": awayRecord,
                "HOME_RECORD": homeRecord,
                "SEASON_ID": "2" + season, 
                "G": '82',
                "W": wins,
                "L": loses
            }
            rankingData.push(rankingJSON)
        }
        if(Object.keys(cachedDataJSON).length != 0) {
            var index = season - 2004
            for(var idx = 0; idx < cachedDataJSON[index].length; idx++) {
                if (teamName == cachedDataJSON[index][idx].TEAMNAME) {
                    var homeWins = parseInt(homeRecord.substr(0, homeRecord.indexOf('-')))
                    var awayWins = parseInt(awayRecord.substr(0, awayRecord.indexOf('-')))
                    cachedDataJSON[index][idx].HOMEWINS = homeWins
                    cachedDataJSON[index][idx].AWAYWINS = awayWins
                }
            }
        }
        if(Object.keys(cachedDataJSON2).length != 0) {
            for(var idx = 0; idx < cachedDataJSON2.length; idx++) {
                if (teamName == cachedDataJSON2[idx].TEAMNAME) {
                    cachedDataJSON2[idx].WINS = wins
                }
            }
        }
        alert('Successfully added ranking')
        // check if cached data is empty
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

/**
 * Called on click to visualize correct form for "Delete" data manipulation
 */
function CheckVal(){
    var val = document.getElementById("updateSelect").value 
    if (val == "Players") {
        document.getElementById("userInput").innerHTML = 
        "<div class=\"form-group\">" + 
        "Enter a player name to update from the player dataset <input class=\"form-control\" name=\"oldPlayerName\" > </input> <br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "New PlayerID <input class=\"form-control\" name=\"PlayerID\" required > </input> <br>" + 
        "</div>" +
         "<div class=\"form-group\">" + 
        "New TeamID <input class=\"form-control\" name=\"TeamID\" required > </input> <br>" +
        "</div>" + 
         "<div class=\"form-group\">" + 
        "New PlayerName <input class=\"form-control\" name=\"newPlayerName\" required> </input> <br>" +
        "</div>" +
         "<div class=\"form-group\">" + 
        "Season Played <input class=\"form-control\" name = \"SeasonPlayed\" required></input> <br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\"> </input>"  
        document.getElementById("userInput2").innerHTML  = ""
        document.getElementById("userInput3").innerHTML =  ""
    }
    else if (val == "Teams") {
        document.getElementById("userInput2").innerHTML =
        "<div class=\"form-group\">" + 
        "Enter a team name to update <input class=\"form-control\" name=\"oldTeamName\" > </input> <br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Team Name <input class=\"form-control\" name=\"newTeamName\" > </input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Team Abbreviation <input class=\"form-control\" name=\"teamAbbreviation\"></input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Year Founded <input class=\"form-control\" name=\"yearFounded\"></input><br>" + 
        "</div>" + 
        "<div class=\"form-group\">" + 
        "City <input class=\"form-control\" name=\"city\" ></input><br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\"> </input>"
        document.getElementById("userInput").innerHTML = ""
        document.getElementById("userInput3").innerHTML = ""
    }
    else if (val == "Ranking") {
        document.getElementById("userInput3").innerHTML =
        "Enter a team name and season to update from the ranking dataset <br> <br>" + 
        "<div class=\"form-group\">" + 
        "Team Name <input class=\"form-control\" name=\"teamName\" > </input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Season <input class=\"form-control\" name=\"season\"></input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Wins <input class=\"form-control\" name=\"wins\" > </input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Losses <input class=\"form-control\" name=\"losses\"></input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Home Record <input class=\"form-control\" name=\"homeRecord\"></input><br>" + 
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Away Record <input class=\"form-control\" name=\"awayRecord\" ></input><br>" +
        "</div>" +
        "<input class=\"btn btn-primary\" type=\"Submit\"> </input>"
         document.getElementById("userInput").innerHTML = ""
         document.getElementById("userInput2").innerHTML = ""
    }
}

module.exports = router