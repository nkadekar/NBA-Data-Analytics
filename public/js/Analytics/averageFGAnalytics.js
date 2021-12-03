const express = require('express')
const router = express.Router()
const path = require('path')
var gameData = require("../parser").gamesData
var alert = require("alert")

/**
 * Route serving average stats winning analytic.
 * @name get/averageFGAnalytics
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/averageFGAnalytics.html'))
    });

/**
 * Route compiling stats information
 * @name get/averageFGAnalytics/averageFGQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/averageFGQuery')
    .post((req, res) => {
        var season = req.body.season
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../../html/Analytics/averageFGAnalytics.html'))
        }
        else{
            var obj = computeAverageFGQuery(gameData, season)
            res.send(makeGraph(obj.avgFG, obj.avg3PT, obj.avgFT, obj.avgPTS, obj.avgREB, obj.avgAST))
        }
    });

/**
 * Computations for all statistics for home and away teams
 * @param {Array.<Object>} gameData
 * @param {string} season
 * @returns {Object} obj
 */
function computeAverageFGQuery(gameData, season){
    var fieldGoalCounter = 0
    var threePointCounter = 0
    var freeThrowCounter = 0
    var pointsCounter = 0
    var reboundsCounter = 0
    var assistsCounter = 0
    var totalGames = 0
        for (var i = 0; i < gameData.length; ++i){
        if (parseInt(gameData[i].SEASON) == season){
            if (parseInt(gameData[i].HOME_TEAM_WINS)){
                fieldGoalCounter += parseFloat(gameData[i].FG_PCT_home)
                threePointCounter += parseFloat(gameData[i].FG3_PCT_home)
                freeThrowCounter += parseFloat(gameData[i].FT_PCT_home)
                pointsCounter += parseFloat(gameData[i].PTS_home)
                reboundsCounter += parseFloat(gameData[i].REB_home)
                assistsCounter += parseFloat(gameData[i].AST_home)
            }
            else {
                fieldGoalCounter += parseFloat(gameData[i].FG_PCT_away)
                threePointCounter += parseFloat(gameData[i].FG3_PCT_away)
                freeThrowCounter += parseFloat(gameData[i].FT_PCT_away)
                pointsCounter += parseFloat(gameData[i].PTS_away)
                reboundsCounter += parseFloat(gameData[i].REB_away)
                assistsCounter += parseFloat(gameData[i].AST_away)
            }
            totalGames++;
        }
    }
    var avgFG = (fieldGoalCounter / totalGames)
    var avg3PT = (threePointCounter / totalGames)
    var avgFT = (freeThrowCounter / totalGames)
    var avgPTS = (pointsCounter / totalGames)
    var avgREB = (reboundsCounter / totalGames)
    var avgAST = (assistsCounter / totalGames)
    var sendData = "Average field goal for the winning team in the " + season + " is " + avgFG.toPrecision(4) * 100 + "%"
    var obj = {
        "avgFG": avgFG.toPrecision(4),
        "avg3PT": avg3PT.toPrecision(4),
        "avgFT": avgFT.toPrecision(4) ,
        "avgPTS": avgPTS.toPrecision(4) ,
        "avgREB": avgREB.toPrecision(4) ,
        "avgAST":avgAST.toPrecision(4) ,
        "sendData": sendData
    }
    return obj
}

/**
 * Creates html for graph visualization
 * @param {int} avgFG
 * @param {int} avg3PT
 * @param {int} avgFT
 * @param {int} avgPTS
 * @param {int} avgREB
 * @param {int} avgAST
 * @returns {string} sendData
 */
function makeGraph(avgFG, avg3PT, avgFT, avgPTS, avgREB, avgAST){

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
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + "Avg Field Goal Percentage" + "\"" + "," + "\"" + "Avg 3PT Percentage" + "\"" + "," + "\"" + "Avg Free Throw Percentage" + "\"" + "],\n" +
                            " y: [" + avgFG + "," + avg3PT + "," + avgFT + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "var layout = {title: 'Average Shooting Stats'}\n" +
                            "Plotly.newPlot('myDiv', data, layout);\n" +
                            "</script>" + 
                            "<div id=\"myDiv2\">" + "</div>" +
                            "<form method=\"get\" action=\"/back\">" +
                            "<button style=\"position:relative; left:90px; top:2px;\" class=\"btn btn-primary\" type=\"submit\">Back</button>" +
                             "</form>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + "Avg Points Per Game" + "\"" + "," + "\"" + "Avg Rebounds Per Game" + "\"" + "," + "\"" + "Avg Assists Per Game" + "\"" + "],\n" +
                            " y: [" + avgPTS + "," + avgREB + "," + avgAST + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "var layout = {title: 'Average Points, Rebounds, Assists'}\n" +
                            "Plotly.newPlot('myDiv2', data, layout);\n" +
                            "</script>"  

    return sendData
}

module.exports = {router, computeAverageFGQuery}