const express = require('express')
const router = express.Router()
const path = require('path')
var gameDetailsData = require("./parser").gamesDetailsData
const alert = require('alert');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/pointsPerPlayerAnalytics.html'))
    });

router
    .route('/pointsPerPlayerQuery')
    .post((req, res) => {
        var totalPoints = 0;
        var playerFoundFlag = false
        var playerIndex;
        for (var i = 0; i < gameDetailsData.length; i++){
            if (req.body.playerName.toLowerCase() == gameDetailsData[i].PLAYER_NAME.toLowerCase()){
                if (gameDetailsData[i].PTS != "") {
                    playerFoundFlag = true
                    totalPoints += parseInt(gameDetailsData[i].PTS)
                    playerIndex = i
                }
        }
    }
        if(playerFoundFlag == false){
            var alertMessage = req.body.playerName + " is not found. Please try again."
            alert(alertMessage)
            res.sendFile(path.join(__dirname , '../html/pointsPerPlayerAnalytics.html'))
        }
        else{
            var sendData = gameDetailsData[playerIndex].PLAYER_NAME + " has scored: " + totalPoints.toString() + " points."
            res.send(sendData)
        }
    });

module.exports = router