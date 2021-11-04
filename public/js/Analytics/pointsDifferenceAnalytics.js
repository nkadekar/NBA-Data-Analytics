const express = require('express')
const router = express.Router()
const path = require('path')
var gameData = require("../parser").gamesData
var teamData = require("../parser").teamsData
const alert = require('alert');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/pointsDifferenceAnalytics.html'))
    });

router
    .route('/pointsDifferenceQuery')
    .post((req, res) => {
        var largestDifference = 0;
        var homeTeam;
        var awayTeam;
        var homeNickname;
        var awayNickname;
        var homeTeamPts
        var awayTeamPts
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../../html/Analytics/pointsDifferenceAnalytics.html'))
        }
        else{     
            for (var i = 0; i < gameData.length; i++) {
                if (gameData[i].SEASON == req.body.season){
                    var difference = Math.abs(parseInt(gameData[i].PTS_home) - parseInt(gameData[i].PTS_away))
                    if (difference > largestDifference) {
                        homeTeam = gameData[i].HOME_TEAM_ID
                        awayTeam = gameData[i].VISITOR_TEAM_ID
                        largestDifference = difference
                        homeTeamPts = gameData[i].PTS_home
                        awayTeamPts = gameData[i].PTS_away
                    }
                }
            }
            for (var i = 0; i < teamData.length; i++) {
                if (teamData[i].TEAM_ID == homeTeam) {
                    homeNickname = teamData[i].NICKNAME
                }
                if (teamData[i].TEAM_ID == awayTeam) {
                    awayNickname = teamData[i].NICKNAME
                }
            }
            var DifferenceInPointsJSON = 
            {
                "Difference": largestDifference,
                "HomeTeam": homeNickname,
                "AwayTeam": awayNickname
            } 
            var DifferenceString = "In the season " + req.body.season + ", " + DifferenceInPointsJSON.HomeTeam + " vs " 
            + DifferenceInPointsJSON.AwayTeam + " has the largest difference of " 
            + DifferenceInPointsJSON.Difference + " points."
            res.send(makeGraph(DifferenceInPointsJSON.HomeTeam, DifferenceInPointsJSON.AwayTeam, homeTeamPts, awayTeamPts, DifferenceInPointsJSON.Difference))
        }
    });

function makeGraph(homeTeamName, awayTeamName, homeTeamPts, awayTeamPts, difference){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
        
                                "<div id=\"myDiv\">" + "</div>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + homeTeamName + "\"" + "," +  "\"" + awayTeamName + "\"" + "," + "\"" + "Difference" + "\"" + "],\n" +
                            " y: [" + homeTeamPts +  "," + awayTeamPts + "," + difference + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myDiv', data);\n" +
                            "</script>" 

    return sendData
}

module.exports = router