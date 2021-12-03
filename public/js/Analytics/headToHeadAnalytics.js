const express = require('express')
const router = express.Router()
const path = require('path')
var gamesData = require("../parser").gamesData
var teamsData = require("../parser").teamsData
const alert = require('alert');

/**
 * Route serving the head to head analytic.
 * @name get/headToHeadAnalytics
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/headToHeadAnalytics.html'))
    });


function computeHeadToHeadQuery(gamesData,teamsData, season, team1, team2){
            var team1ID, team2ID;
            var team1Counter = team2Counter = 0
            for (var i = 0; i < teamsData.length; ++i){
                if (teamsData[i].NICKNAME == team1){
                    team1ID = teamsData[i].TEAM_ID
                }
                else if (teamsData[i].NICKNAME == team2){
                    team2ID = teamsData[i].TEAM_ID
                }
            }

            var team1Scores = []
            var team2Scores = []

            for (var i = 0; i < gamesData.length; ++i){
                if ((parseInt(gamesData[i].SEASON) == season) && 
                (gamesData[i].HOME_TEAM_ID == team1ID || 
                    gamesData[i].HOME_TEAM_ID == team2ID) 
                    && (gamesData[i].VISITOR_TEAM_ID == team1ID || 
                        gamesData[i].VISITOR_TEAM_ID == team2ID)) {

                    if (parseInt(gamesData[i].HOME_TEAM_WINS)){
                        if (team1ID == gamesData[i].HOME_TEAM_ID){
                            team1Scores.push(gamesData[i].PTS_home)
                            team2Scores.push(gamesData[i].PTS_away)
                            team1Counter++
                        }
                        else {
                            team1Scores.push(gamesData[i].PTS_away)
                            team2Scores.push(gamesData[i].PTS_home)
                            team2Counter++
                        }
                    }
                    else {
                        if (team1ID == gamesData[i].VISITOR_TEAM_ID){
                            team1Scores.push(gamesData[i].PTS_away)
                            team2Scores.push(gamesData[i].PTS_home)
                            team1Counter++
                        }
                        else {
                            team1Scores.push(gamesData[i].PTS_home)
                            team2Scores.push(gamesData[i].PTS_away)
                            team2Counter++
                        }
                    }
                }
            }

            var obj = {
                "team1Counter" : team1Counter,
                "team2Counter" : team2Counter,
                "team1Scores": team1Scores,
                "team2Scores": team2Scores
            }

            return obj
}

/**
 * Route compiling stats information
 * @name get/headToHeadAnalytics/headToHeadQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/headToHeadQuery')
    .post((req, res) => {
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../../html/Analytics/headToHeadAnalytics.html'))
        }
        else {
            var obj = computeHeadToHeadQuery(gamesData, teamsData, req.body.season, req.body.team1, req.body.team2)
            var numOfGames = []
            for(var i = 0; i < obj.team1Scores.length; i++){
                numOfGames.push(`Game ${i + 1}`)
            } 
            res.send(makeGraph(req.body.team1, req.body.team2, obj.team1Counter, obj.team2Counter, numOfGames, obj.team1Scores, obj.team2Scores, req.body.season))
        }

    });

/**
 * Creates html for graph visualization
 * @param {string} team1
 * @param {string} team2
 * @param {int} team1Counter
 * @param {int} team2Counter
 * @param {int} numOfGames
 * @param {int} team1Scores
 * @param {int} team2Scores
 * @param {int} season
 * @returns {string} sendData
 */
function makeGraph(team1, team2, team1Counter, team2Counter, numOfGames, team1Scores, team2Scores,season){
    var result = ""
    result += "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>"
    result += "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"" 
    result += "integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">" 
    result += "<link rel=\"stylesheet\" href=\"http://localhost:3000/public/css/main.css\">" 
    result += "<link rel=\"stylesheet\" href=\"http://localhost:3000/public/css/bootstrap.min.css\"></link>" 
    result += "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-dark\">" 
    result += "<a class=\"navbar-brand\" href=\"#\">NBA Analytics - XYZ Coders</a>" 
    result += "<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExampleDefault\"" 
    result += "aria-controls=\"navbarsExampleDefault\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">" 
    result += "<span class=\"navbar-toggler-icon\"></span>" 
    result += "</button>" 
    result += "<div class=\"collapse navbar-collapse\" id=\"navbarsExampleDefault\">" 
    result += "<ul class=\"navbar-nav mr-auto\">" 
    result += "<li class=\"nav-item active\">" 
    result += "</li>" 
    result += "</ul>" 
    result += "</div>" 
    result += "</nav>" 
    result += "<h4 style=\"position:relative; left:90px; top:20px;\" > "
    result += team1 
    result += " vs "
    result += team2
    result += ": "
    result += team1Counter
    result += " - "
    result += team2Counter
    result += "</h4>"
    result += "<div style=\"position:relative; top:12px;\" id=\"myDiv\"></div>"
    result += "<script>"
    result += "var trace1 = {\n"
    result += "x: ["
    for(var i = 0; i < numOfGames.length; i++){
        result += "\'"
        result += numOfGames[i]
        result += "\'"
        if(i != numOfGames.length -1){
            result += ","
        }
    }
    result += "],\n"
    result += "y: ["
    result += team1Scores
    result += "],\n"
    result += "name: \'"
    result += team1
    result += "\',\n"
    result += "type: 'bar'\n"
    result += "};\n"
    result += "var trace2 = {\n"
    result += "x: ["
    for(var i = 0; i < numOfGames.length; i++){
        result += "\'"
        result += numOfGames[i]
        result += "\'"
        if(i != numOfGames.length -1){
            result += ","
        }
    }
    result += "],\n"
        result += "y: ["
    result += team2Scores
    result += "],\n"
    result += "name: \'"
    result += team2
    result += "\',\n"
    result += "type: 'bar'\n"
    result += "};\n"
    result += "var data = [trace1, trace2];\n"
    result += "var layout = {barmode: 'group', title: 'Head to Head Record between "
    result += team1 
    result += " and "
    result += team2
    result += " during the "
    result += season
    result += " season"
    result += "\'};\n"
    result += "Plotly.newPlot('myDiv', data, layout);\n"
    result += "</script>\n"
    result += "<form method=\"get\" action=\"/back\">" 
    result += "<button style=\"position:relative; left:90px; top:2px;\" class=\"btn btn-primary\" type=\"submit\">Back</button>" 
    result += "</form>" 

    return result
}

module.exports = {router, computeHeadToHeadQuery}