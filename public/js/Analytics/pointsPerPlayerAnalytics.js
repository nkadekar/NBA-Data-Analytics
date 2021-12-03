const express = require('express')
const router = express.Router()
const path = require('path')
var gameDetailsData = require("../parser").gamesDetailsData
const alert = require('alert')

/**
 * Route serving player stats analytic.
 * @name get/pointsPerPlayerAnalytics
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/pointsPerPlayerAnalytics.html'))
    });

/**
 * Route compiling stats information
 * @name get/pointsPerPlayerAnalytics/pointsPerPlayerQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/pointsPerPlayerQuery')
    .post((req, res) => {
        var totalPoints = 0
        var totalRebounds = 0
        var totalAssists = 0
        var totalSteals = 0
        var totalBlocks = 0
        var playerFoundFlag = false
        var playerIndex
        playerIndex = findPlayerIndex(req.body.playerName.toLowerCase())
        
        if (gameDetailsData[playerIndex].PTS != "") {
            playerFoundFlag = true
            totalPoints += parseInt(gameDetailsData[playerIndex].PTS)
            if (gameDetailsData[playerIndex].REB != ""){
                totalRebounds += parseInt(gameDetailsData[playerIndex].REB)
            }
            if (gameDetailsData[playerIndex].AST != ""){
                totalAssists += parseInt(gameDetailsData[playerIndex].AST)
            }
            if (gameDetailsData[playerIndex].STL != ""){
                totalSteals += parseInt(gameDetailsData[playerIndex].STL)
            }
            if (gameDetailsData[playerIndex].BLK != ""){
                totalBlocks += parseInt(gameDetailsData[playerIndex].BLK)
            }
        }
        
        if(playerFoundFlag == false){
            var alertMessage = req.body.playerName + " is not found. Please try again."
            alert(alertMessage)
            res.sendFile(path.join(__dirname , '../../html/Analytics/pointsPerPlayerAnalytics.html'))
        }
        else{
            res.send(makeGraph(gameDetailsData[playerIndex].PLAYER_NAME, totalPoints, totalRebounds, totalAssists, totalSteals, totalBlocks))
        }
    });

/**
 * Finds index of specific player
 * @param {string} playerName
 * @returns {int} i: index
 */
function findPlayerIndex(playerName) {
    for (var i = 0; i < gameDetailsData.length; i++){
        var player = gameDetailsData[i].PLAYER_NAME.toLowerCase()
        if (playerName == player) {
            return i
        }
    }
}

/**
 * Creates html for graph visualization
 * @param {string} playerName
 * @param {int} totalPoints
 * @param {int} totalRebounds
 * @param {int} totalAssists
 * @param {int} totalSteals
 * @param {int} totalBlocks
 * @returns {string} sendData
 */
function makeGraph(playerName, totalPoints, totalRebounds, totalAssists, totalSteals, totalBlocks){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
                            "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"" +
                            "integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">" +
                            "<link rel=\"stylesheet\" href=\"http://localhost:3000/public/css/main.css\">" +
                            "<link rel=\"stylesheet\" href=\"http://localhost:3000/public/css/bootstrap.min.css\"></link>" +
                            "<body>" +
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
                            "<div class=\"container\">" +
                            "<div>" +
                            "<h1 style=\"position:relative; left:90px; top:20px;\">" + playerName + "'\s stats"  + "</h1>" + 
                            "<h4 style=\"position:relative; left:90px; top:20px;\">Points: " + totalPoints +  "</h4>" + 
                            "<h4 style=\"position:relative; left:90px; top:20px;\">Rebounds: " + totalRebounds  +  "</h4>" + 
                            "<h4 style=\"position:relative; left:90px; top:20px;\">Assists: " + totalAssists  +  "</h4>" + 
                            "<h4 style=\"position:relative; left:90px; top:20px;\">Steals: " + totalSteals  +  "</h4>" + 
                            "<h4 style=\"position:relative; left:90px; top:20px;\">Blocks: " + totalBlocks  +  "</h>" + 
                            "</div>" + 
                             "<div style=\"position:relative; top:10px;\" id=\"myPlayer\">" + "</div>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + "Points" + "\"" + "," + "\"" + "Rebounds" + "\"" + "," + "\"" + "Assists" + "\"" + "," + "\"" + "Steals" + "\"" + "," + "\"" + "Blocks" + "\"" + "],\n" +
                            " y: [" + totalPoints + "," + totalRebounds + "," + totalAssists + "," + totalSteals + "," + totalBlocks + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myPlayer', data);\n" +
                            "</script>" + 
                            "<form method=\"get\" action=\"/back\">" +
                            "<button style=\"position:relative; left:90px; top:2px;\" class=\"btn btn-primary\" type=\"submit\">Back</button>" +
                             "</form>" +
                            "</div>" +
                            "</body>"

    return sendData
}

module.exports = {router, findPlayerIndex}