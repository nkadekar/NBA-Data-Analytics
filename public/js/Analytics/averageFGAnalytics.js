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
        var threePointCounter = 0
        var freeThrowCounter = 0
        var pointsCounter = 0
        var reboundsCounter = 0
        var assistsCounter = 0
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
            res.send(makeGraph(avgFG, avg3PT, avgFT, avgPTS, avgREB, avgAST))
        }
    });

function makeGraph(avgFG, avg3PT, avgFT, avgPTS, avgREB, avgAST){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
        
                                "<div id=\"myDiv\">" + "</div>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + "Avg Field Goal Percentage" + "\"" + "," + "\"" + "Avg 3PT Percentage" + "\"" + "," + "\"" + "Avg Free Throw Percentage" + "\"" + "],\n" +
                            " y: [" + avgFG + "," + avg3PT + "," + avgFT + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myDiv', data);\n" +
                            "</script>" 

    return sendData
}

//Add another Chart for Pts, reb, ast

// function makeGraph(avgFG, avg3PT, avgFT, avgPTS, avgREB, avgAST){
//     var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
//                             "<div id=\"myDiv\">" + "</div>" +
//                             "<script>" + 
//                             "var data = [\n" + 
//                             "{\n" +
//                             " x: [" +  "\"" + "Avg Field Goal Percentage" + "\"" + "," + "\"" + "Avg 3PT Percentage" + "\"" + "," + "\"" + "Avg Free Throw Percentage" + "\"" + "," + "\"" + "Avg Points Per Game" + "\"" + "," + "\"" + "Avg Rebounds Per Game" + "\"" + "," + "\"" + "Avg Assists Per Game" + "\"" + "],\n" +
//                             " y: [" + avgFG + "," + avg3PT + "," + avgFT +  "," + avgPTS + "," + avgREB + "," + avgAST + "],\n" +
//                             " type: \'bar\'\n" +
//                             "}\n" +
//                             "];\n" +
//                             "Plotly.newPlot('myDiv', data);\n" +
//                             "</script>" 

//     return sendData
// }

module.exports = router