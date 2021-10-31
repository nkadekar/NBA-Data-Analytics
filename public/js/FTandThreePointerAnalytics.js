const express = require('express')
const router = express.Router()
const path = require('path')
var gamesData = require("./parser").gamesData
const alert = require('alert');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/FTandThreePointerAnalytics.html'))
    });

router
    .route('/FTandThreePointerQuery')
    .post((req, res) => {
        var homeFreeThrowCounter = awayFreeThrowCounter = homeThreePointCounter = awayThreePointCounter = 0
        var totalGames = 0
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../html/FTandThreePointerAnalytics.html'))
        }
        else {
            for (var i = 0; i < gamesData.length; ++i){
                if (parseInt(gamesData[i].SEASON) == req.body.season){
                    homeFreeThrowCounter += parseFloat(gamesData[i].FT_PCT_home)
                    awayFreeThrowCounter += parseFloat(gamesData[i].FT_PCT_away)
                    homeThreePointCounter += parseFloat(gamesData[i].FG3_PCT_home)
                    awayThreePointCounter += parseFloat(gamesData[i].FG3_PCT_away)
                    totalGames++
                }
            }
        }

        var avgHomeFreeThrow = (homeFreeThrowCounter / totalGames) * 100
        var avgHomeThreePoint = (homeThreePointCounter / totalGames) * 100
        var avgAwayFreeThrow = (awayFreeThrowCounter / totalGames) * 100
        var avgAwayThreePoint = (awayThreePointCounter / totalGames) * 100

        var outputString = "Average Home FT Percentage: " + avgHomeFreeThrow.toPrecision(4) + "%<br> Average Away FT Percentage: " + avgAwayFreeThrow.toPrecision(4) + "%<br> Average Home 3 PT Percentage: " + avgHomeThreePoint.toPrecision(4) + "%<br> Average Away 3 PT Percentage: " + avgAwayThreePoint.toPrecision(4) + "%"
        res.send(outputString)
    });

module.exports = router