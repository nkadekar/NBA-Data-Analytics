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
            res.send(makeGraph(DifferenceInPointsJSON.HomeTeam, DifferenceInPointsJSON.AwayTeam, homeTeamPts, awayTeamPts, DifferenceInPointsJSON.Difference, req.body.season))
        }
    });

/**
 * Creates html for graph visualization
 * @param {string} homeTeamName
 * @param {string} awayTeamName
 * @param {int} homeTeamPts
 * @param {int} awayTeamPts
 * @param {int} difference
 * @param {int} season
 * @returns {string} sendData
 */
function makeGraph(homeTeamName, awayTeamName, homeTeamPts, awayTeamPts, difference, season){

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
                            "<div class=\"container\">" +
                            "<h4 style=\"position:relative; left:90px; top:20px;\">" +  "The largest difference in points during the " + season + " is " + difference + " between " +
                             homeTeamName  +  " and " + awayTeamName + "</h4>" + 
                            "<div style=\"position:relative; top:10px;\"  id=\"myDiff\">" + "</div>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" +  "\"" + homeTeamName + "\"" + "," +  "\"" + awayTeamName + "\"" + "," + "\"" + "Difference" + "\"" + "],\n" +
                            " y: [" + homeTeamPts +  "," + awayTeamPts + "," + difference + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myDiff', data);\n" +
                            "</script>" +
                            "<form method=\"get\" action=\"/back\">" +
                            "<button style=\"position:relative; left:90px; top:2px;\" class=\"btn btn-primary\" type=\"submit\">Back</button>" +
                             "</form>" +
                             "</div>"


    return sendData
}

module.exports = router