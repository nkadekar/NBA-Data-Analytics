const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("../parser").rankingData
const alert = require('alert');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/mostHomeAndAwayWinsAnalytics.html'))
    });

router
    .route('/mostHomeAndAwayWinsQuery')
    .post((req, res) => {
        var maxHome = maxAway = 0
        var maxHomeTeam, maxAwayTeam;
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '.../../html/Analytics/mostHomeAndAwayWinsAnlytics.htmll'))
        }
        else{
            for (var i = 0; i < rankingData.length; ++i){
                if (parseInt(rankingData[i].SEASON_ID.substr(1)) == req.body.season){
                    var homeRec = parseInt(rankingData[i].HOME_RECORD.substr(0, rankingData[i].HOME_RECORD.indexOf('-')))
                    var awayRec = parseInt(rankingData[i].ROAD_RECORD.substr(0, rankingData[i].ROAD_RECORD.indexOf('-')))
                    if(homeRec > maxHome){
                        maxHome = homeRec
                        maxHomeTeam = rankingData[i].TEAM
                    }
                    if(awayRec > maxAway){
                        maxAway = awayRec
                        maxAwayTeam = rankingData[i].TEAM
                    }
                }
            }
        }
        var outputString = "The team with the most home wins is " + maxHomeTeam + " with " + maxHome + " wins.<br> The team with the most away wins is " + maxAwayTeam + " with " + maxAway + " wins."
        // res.send(outputString)
        res.send(makeGraph(maxHome, maxHomeTeam, maxAway, maxAwayTeam))
    });

function makeGraph(mostHomeWins, homeTeam, mostAwayWins, awayTeam){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
        
                                "<div id=\"myDiv\">" + "</div>" +
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

module.exports = router