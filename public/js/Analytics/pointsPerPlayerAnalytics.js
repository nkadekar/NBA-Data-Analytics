const express = require('express')
const router = express.Router()
const path = require('path')
var gameDetailsData = require("../parser").gamesDetailsData
const alert = require('alert')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/pointsPerPlayerAnalytics.html'))
    });

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
        for (var i = 0; i < gameDetailsData.length; i++){
            if (req.body.playerName.toLowerCase() == gameDetailsData[i].PLAYER_NAME.toLowerCase()){
                if (gameDetailsData[i].PTS != "") {
                    playerFoundFlag = true
                    totalPoints += parseInt(gameDetailsData[i].PTS)
                    if (gameDetailsData[i].REB != ""){
                        totalRebounds += parseInt(gameDetailsData[i].REB)
                    }
                    if (gameDetailsData[i].AST != ""){
                        totalAssists += parseInt(gameDetailsData[i].AST)
                    }
                    if (gameDetailsData[i].STL != ""){
                        totalSteals += parseInt(gameDetailsData[i].STL)
                    }
                    if (gameDetailsData[i].BLK != ""){
                        totalBlocks += parseInt(gameDetailsData[i].BLK)
                    }
                    playerIndex = i
                }
            }
        }
        if(playerFoundFlag == false){
            var alertMessage = req.body.playerName + " is not found. Please try again."
            alert(alertMessage)
            res.sendFile(path.join(__dirname , '../../html/Analytics/pointsPerPlayerAnalytics.html'))
        }
        else{
            var sendData = gameDetailsData[playerIndex].PLAYER_NAME + " has scored: " + totalPoints.toString() + " points."
            res.send(makeGraph(gameDetailsData[playerIndex].PLAYER_NAME, totalPoints, totalRebounds, totalAssists, totalSteals, totalBlocks))
        }
    });

function makeGraph(playerName, totalPoints, totalRebounds, totalAssists, totalSteals, totalBlocks){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
     
                             "<div id=\"myDiv\">" + "</div>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + "Points" + "\"" + "," + "\"" + "Rebounds" + "\"" + "," + "\"" + "Assists" + "\"" + "," + "\"" + "Steals" + "\"" + "," + "\"" + "Blocks" + "\"" + "],\n" +
                            " y: [" + totalPoints + "," + totalRebounds + "," + totalAssists + "," + totalSteals + "," + totalBlocks + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myDiv', data);\n" +
                            "</script>" 

    return sendData
}

module.exports = router