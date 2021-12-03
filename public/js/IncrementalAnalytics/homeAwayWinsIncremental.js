const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("../parser").rankingData

var cachedDataJSON = []

/**
 * Route serving home and away wins incremental analytic.
 * @name get/homeAwayWinsIncremental
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/IncrementalAnalytics/homeAwayWinsIncremental.html'))
    });

/**
 * Route compiling stats information
 * @name get/homeAwayWinsIncremental/homeAwayWinsIncrementalQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/homeAwayWinsIncrementalQuery')
    .post((req, res) => {
        console.time('Incremental timer for home away wins')
        if(cachedDataJSON.length == 0) {
            //1. populate JSON
            for (var season = 2004; season <= 2020; season++){
                var games = 82
                if (season == 2011){
                    games = 66
                }
                else if (season == 2019){
                    games = 64
                }
                else if (season == 2020){
                    games = 72
                }
                cachedDataJSON.push(getWinsPerTeam(rankingData, season, games))
            }
        }
        // Reading and answering the query
        var season = req.body.season
        index = season - 2004
        maxHome = 0;
        maxHomeIndex = 0;
        maxAway = 0;
        maxAwayIndex = 0;
        for(var idx = 0; idx < cachedDataJSON[index].length; idx++) {
             if (maxHome < cachedDataJSON[index][idx].HOMEWINS) {
                 maxHome = cachedDataJSON[index][idx].HOMEWINS
                 maxHomeIndex = idx;
             }
             if (maxAway < cachedDataJSON[index][idx].AWAYWINS) {
                maxAway = cachedDataJSON[index][idx].AWAYWINS
                maxAwayIndex = idx;
            }
        }
        homeTeam = cachedDataJSON[index][maxHomeIndex].TEAMNAME
        awayTeam = cachedDataJSON[index][maxAwayIndex].TEAMNAME
        res.send(makeGraph(maxHome, homeTeam, maxAway, awayTeam))
        console.timeEnd('Incremental timer for home away wins')
    });

/**
 * Compiles home and away record per team
 * @param {Array.<Object>} rankingData
 * @param {string} season
 * @param {int} games
 * @returns {Array.<Object>} arr: JSON Objects with team, season, home record, away record
 */
function getWinsPerTeam(rankingData, season, games) {
    var visited = []
    var arr = [];
    for (var i = 0; i < rankingData.length; i++){
        if((rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == games)){
            if(visited.indexOf(rankingData[i].TEAM_ID) == -1){
                visited.push(rankingData[i].TEAM_ID)
                var homeRec = parseInt(rankingData[i].HOME_RECORD.substr(0, rankingData[i].HOME_RECORD.indexOf('-')))
                var awayRec = parseInt(rankingData[i].ROAD_RECORD.substr(0, rankingData[i].ROAD_RECORD.indexOf('-')))
                arr.push(createJSON(rankingData[i].TEAM, parseInt(rankingData[i].SEASON_ID.substring(1)), homeRec, awayRec))
            }
        } 
    }
    return arr
}

/**
 * Creates formatted JSON given inputs
 * @param {string} teamName
 * @param {string} season
 * @param {int} homeWins
 * @param {int} awayWins
 * @returns {Object}
 */
function createJSON(teamName, season, homeWins, awayWins){
    return {"TEAMNAME": teamName, "SEASON": season, "HOMEWINS": homeWins, "AWAYWINS": awayWins}
}

/**
 * Creates html for graph visualization
 * @param {int} mostHomeWins
 * @param {string} homeTeam
 * @param {int} mostAwayWins
 * @param {string} awayTeam
 * @returns {string} sendData
 */
function makeGraph(mostHomeWins, homeTeam, mostAwayWins, awayTeam){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
                             "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"" +
                            "integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">" +
                            "<link rel=\"stylesheet\" href=\"http://localhost:3000/public/css/main.css\">" +
                            "<link rel=\"stylesheet\" href=\"http://localhost:3000/public/css/bootstrap.min.css\"></link>" +
                            "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-dark\">" +
                            "<a class=\"navbar-brand\" href=\"#\">NBA Analytics - XYZ Coders</a>" +
                            "<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExampleDefault\"" +
                            "aria-controls=\"navbarsExampleDefault\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">" +
                            "<span class=\"navbar-toggler-icon\"></span>" +
                            "</button>" +
                            "<div class=\"collapse navbar-collapse\" id=\"navbarsExampleDefault\">" +
                                "<ul class=\"navbar-nav mr-auto\">" +
                                    "<li class=\"nav-item active\">" +
                                    "</li>" +
                                "</ul>" +
                            "</div>" +
                        "</nav>" + 
                            "<div id=\"myDiv\">" + "</div>" +
                            "<form method=\"get\" action=\"/back\">" +
                            "<button style=\"position:relative; left:90px; top:2px;\" class=\"btn btn-primary\" type=\"submit\">Back</button>" +
                            "</form>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + "Most Home Wins (" + homeTeam + ")" + "\"" + "," + "\"" + "Most Away Wins (" + awayTeam  + ")" + "\"" + "],\n" +
                            " y: [" + mostHomeWins + "," + mostAwayWins + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myDiv', data);\n" +
                            "</script>" 

    return sendData
}
    
module.exports = {router, cachedDataJSON, getWinsPerTeam}