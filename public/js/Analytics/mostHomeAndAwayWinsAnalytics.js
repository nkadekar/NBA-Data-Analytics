const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("../parser").rankingData
const alert = require('alert');

/**
 * Route serving most home and away wins analytic.
 * @name get/mostHomeAndAwayWinsAnalytics
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/mostHomeAndAwayWinsAnalytics.html'))
    });

/**
 * Route compiling stats information
 * @name get/mostHomeAndAwayWinsAnalytics/mostHomeAndAwayWinsQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/mostHomeAndAwayWinsQuery')
    .post((req, res) => { 
        // console.time("Regular home away query")
        var maxHome = maxAway = 0
        var maxHomeTeam, maxAwayTeam;
        if(outOfBounds(req.body.season)){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '.../../html/Analytics/mostHomeAndAwayWinsAnlytics.html'))
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
        
        res.send(makeGraph(maxHome, maxHomeTeam, maxAway, maxAwayTeam))
        // console.timeEnd("Regular home away query")
    });
function outOfBounds(season) {
    if(parseInt(season) < 2004 || parseInt(season) > 2020){
        return true
    }
    else {
        return false
    }
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

module.exports = {router, outOfBounds}