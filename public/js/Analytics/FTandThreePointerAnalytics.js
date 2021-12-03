const express = require('express')
const router = express.Router()
const path = require('path')
var gamesData = require("../parser").gamesData
const alert = require('alert');

/**
 * Route serving average stats for home vs away team analytic.
 * @name get/FTandThreePointerAnalytics
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .get('./', (req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/FTandThreePointerAnalytics.html'))
    });

/**
 * Route compiling stats information
 * @name get/FTandThreePointerAnalytics/FTandThreePointerQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.route('/FTandThreePointerQuery')
    .post((req, res) => {
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../../html/Analytics/FTandThreePointerAnalytics.html'))
        }
        else {
            var obj = computeFTandThreePointerQuery(gamesData, req.body.season)
            res.send(makeGraph(obj.avgHomeFreeThrow, obj.avgAwayFreeThrow, obj.avgHomeThreePoint, obj.avgAwayThreePoint, req.body.season))
        }
    });

/**
 * Computations for all statistics for avgFG, avgFT, and avg3PT
 * @param {Array.<Object>} gameData
 * @param {string} season
 * @returns {Object} obj
 */
function computeFTandThreePointerQuery(gamesData, season){
    var homeFreeThrowCounter = awayFreeThrowCounter = homeThreePointCounter = awayThreePointCounter = 0
    var totalGames = 0
    for (var i = 0; i < gamesData.length; ++i){
        if (parseInt(gamesData[i].SEASON) == season){
            homeFreeThrowCounter += parseFloat(gamesData[i].FT_PCT_home)
            awayFreeThrowCounter += parseFloat(gamesData[i].FT_PCT_away)
            homeThreePointCounter += parseFloat(gamesData[i].FG3_PCT_home)
            awayThreePointCounter += parseFloat(gamesData[i].FG3_PCT_away)
            totalGames++
        }
    }
    var avgHomeFreeThrow = (homeFreeThrowCounter / totalGames) * 100
    var avgHomeThreePoint = (homeThreePointCounter / totalGames) * 100
    var avgAwayFreeThrow = (awayFreeThrowCounter / totalGames) * 100
    var avgAwayThreePoint = (awayThreePointCounter / totalGames) * 100
    var obj = {
        "avgHomeFreeThrow": avgHomeFreeThrow.toPrecision(4),
        "avgHomeThreePoint": avgHomeThreePoint.toPrecision(4),
        "avgAwayFreeThrow": avgAwayFreeThrow.toPrecision(4),
        "avgAwayThreePoint": avgAwayThreePoint.toPrecision(4)
    }
        return obj
}
/**
 * Creates html for graph visualization
 * @param {int} avgHomeFreeThrow
 * @param {int} avgAwayFreeThrow
 * @param {int} avgHomeThreePoint
 * @param {int} avgAwayThreePoint
 * @param {int} season
 * @returns {string} sendData
 */
function makeGraph(avgHomeFreeThrow, avgAwayFreeThrow, avgHomeThreePoint, avgAwayThreePoint, season){

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
                    " x: [" +  "\"" + "Avg Home Free Throw Percentage" + "\"" + "," + "\"" + "Avg Away Free Throw Percentage" + "\"" + "," + "\"" + "Avg Home 3PT Percentage" + "\"" + "," + "\"" + "Avg Away 3PT Percentage" + "\"" + "],\n" +
                    " y: [" + avgHomeFreeThrow + "," + avgAwayFreeThrow + "," + avgHomeThreePoint + "," + avgAwayThreePoint + "],\n" +
                    " type: \'bar\'\n" +
                    "}\n" +
                    "];\n" +
                    "var layout = {title:'Average Shooting Stats during  the " + season + " season" + "\'}\n"+
                    "Plotly.newPlot('myDiv', data, layout);\n" +
                    "</script>" 

    return sendData
}

module.exports = {router, computeFTandThreePointerQuery}