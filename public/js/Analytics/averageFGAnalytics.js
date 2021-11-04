const express = require('express')
const router = express.Router()
const path = require('path')
var gameData = require("../parser").gamesData
var alert = require("alert")

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/averageFGAnalytics.html'))
    });

router
    .route('/averageFGQuery')
    .post((req, res) => {
        var season = req.body.season
        var fieldGoalCounter = 0
        var totalGames = 0
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../../html/Analytics/averageFGAnalytics.html'))
        }
        else{
            for (var i = 0; i < gameData.length; ++i){
                if (parseInt(gameData[i].SEASON) == season){
                    if (parseInt(gameData[i].HOME_TEAM_WINS)){
                        fieldGoalCounter += parseFloat(gameData[i].FG_PCT_home)
                    }
                    else {
                        fieldGoalCounter += parseFloat(gameData[i].FG_PCT_away)
                    }
                    totalGames++;
                }
            }
            var avgFG = (fieldGoalCounter / totalGames)
            var sendData = "Average field goal for the winning team in the " + season + " is " + avgFG.toPrecision(4) * 100 + "%"
            res.send(sendData)
        }
    });

module.exports = router