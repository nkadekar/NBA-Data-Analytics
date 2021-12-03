const express = require('express')
const router = express.Router()
const path = require('path')
const alert = require('alert')

/**
 * Route serving insert manipulation.
 * @name get/insertButton
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../html/ManipulateData/insertData.html'));
    });

/**
 * Route serving player inserts
 * @name get/insertButton/insertPlayerQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/insertPlayerQuery')
    .post((req, res) => {
        var players = require("../parser").playerData
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
        alert("Player successfully inserted.")
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

/**
 * Route serving team inserts
 * @name get/insertButton/insertTeamQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/insertTeamQuery')
    .post((req, res) => {
        var teams = require("../parser").teamsData
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
        alert("Team successfully inserted.")
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

/**
 * Route serving ranking inserts
 * @name get/insertButton/insertRankingQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/insertRankingQuery')
    .post((req, res) => {
        var ranking = require('../parser').rankingData
        const team = req.body.team
        const teamID= req.body.teamID
        const awayRecord = req.body.awayRecord
        const homeRecord = req.body.homeRecord
        const season = req.body.season
        const wins = req.body.wins
        const loses = req.body.loses
        var cachedDataJSON = require("../IncrementalAnalytics/homeAwayWinsIncremental").cachedDataJSON
        var cachedDataJSON2 = require("../IncrementalAnalytics/totalRecordIncremental").cachedtotalWinsJSON
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
        if(Object.keys(cachedDataJSON).length != 0) {
            var index = season - 2004
            const home_wins = homeRecord.substr(0, homeRecord.indexOf('-'))
            const away_wins = awayRecord.substr(0, awayRecord.indexOf('-'))
            var newCachedEntry = {
                "TEAMNAME": team,
                "SEASON": season,
                "HOMEWINS":home_wins,
                "AWAYWINS": away_wins
            }
            if(cachedDataJSON[index][team] != undefined)
                cachedDataJSON[index][team].push(newCachedEntry)
            
        }
        if(Object.keys(cachedDataJSON2).length != 0) {
            var newCachedEntry = {
                "TEAMNAME": team,
                "WINS": wins
            }
            if(cachedDataJSON2 != undefined)
                cachedDataJSON2.push(newCachedEntry)
        }
        alert("Ranking successfully inserted.")
        res.sendFile(path.join(__dirname, '../../html/index.html'))
    });

/**
 * Called on click to visualize correct form for "Delete" data manipulation
 */
function checkInsertDropdown(){
    var val = document.getElementById("insertSelect").value
    if (val == "Players") {
        document.getElementById("userInput1").innerHTML = 
        "<div class=\"form-group\">" + 
        "<label>PlayerID</label> <input class=\"form-control\" name=\"PlayerID\" required > </input> <br>" + 
        "</div>" + 
        "<div class=\"form-group\">" + 
        "<label>TeamID</label> <input class=\"form-control\" name=\"TeamID\" required > </input> <br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "<label>Player Name</label> <input class=\"form-control\" name=\"PlayerName\" required> </input> <br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "<label>Season Played</label> <input class=\"form-control\" name = \"SeasonPlayed\" required></input> <br>" +
        "</div>" + 
        "<input   class=\"btn btn-primary\" type=\"Submit\"> </input>"  

        document.getElementById("userInput2").innerHTML = ""
        document.getElementById("userInput3").innerHTML = ""
    }
    else if (val == "Teams") {
        document.getElementById("userInput2").innerHTML =
        "<div class=\"form-group\">" + 
        "Team Name <input class=\"form-control\" name=\"nickname\" required> </input><br>" +
        "</div>" + 
         "<div class=\"form-group\">" + 
        "Team Abbreviation <input class=\"form-control\" name=\"teamAbbreviation\" required></input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Year Founded <input class=\"form-control\" name=\"yearFounded\" required></input><br>" + 
        "</div>" + 
         "<div class=\"form-group\">" + 
        "City <input class=\"form-control\" name=\"city\" required></input><br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\"> </input>"
        document.getElementById("userInput1").innerHTML = ""
        document.getElementById("userInput3").innerHTML = ""
    }
    else if(val == "Ranking"){
        document.getElementById("userInput3").innerHTML =
        "<div class=\"form-group\">" + 
        "Team: <input class=\"form-control\" name=\"team\" required></input><br>" + 
        "</div>" + 
        "<div class=\"form-group\">" + 
        "TeamID: <input class=\"form-control\" name=\"teamID\" required> </input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Season: <input class=\"form-control\" name=\"season\" required></input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Wins: <input class=\"form-control\" name=\"wins\" required> </input><br>" +
        "</div>" + 
        "<div class=\"form-group\">" + 
        "Losses: <input class=\"form-control\" name=\"loses\" required></input><br>" +
        "</div>" + 
         "<div class=\"form-group\">" + 
        "Home Record: <input class=\"form-control\" name=\"homeRecord\" required></input><br>" + 
        "</div>" + 
        "<div class=\"form-group\">" +
        "Away Record: <input class=\"form-control\" name=\"awayRecord\" required></input><br>" +
        "</div>" + 
        "<input class=\"btn btn-primary\" type=\"Submit\"> </input>"
        document.getElementById("userInput1").innerHTML = ""
        document.getElementById("userInput2").innerHTML = ""

    }
}

module.exports = router