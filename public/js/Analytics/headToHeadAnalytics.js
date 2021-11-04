const express = require('express')
const router = express.Router()
const path = require('path')
var gamesData = require("../parser").gamesData
var teamsData = require("../parser").teamsData
const alert = require('alert');

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/Analytics/headToHeadAnalytics.html'))
    });

router
    .route('/headToHeadQuery')
    .post((req, res) => {
        if(parseInt(req.body.season) < 2004 || parseInt(req.body.season) > 2020){
            alert("Invalid Season")
            res.sendFile(path.join(__dirname , '../../html/Analytics/headToHeadAnalytics.html'))
        }
        else {
            var team1ID, team2ID;
            var team1Counter = team2Counter = 0
            for (var i = 0; i < teamsData.length; ++i){
                if (teamsData[i].NICKNAME == req.body.team1){
                    team1ID = teamsData[i].TEAM_ID
                }
                else if (teamsData[i].NICKNAME == req.body.team2){
                    team2ID = teamsData[i].TEAM_ID
                }
            }

            for (var i = 0; i < gamesData.length; ++i){
                if ((parseInt(gamesData[i].SEASON) == req.body.season) && (gamesData[i].HOME_TEAM_ID == team1ID || gamesData[i].HOME_TEAM_ID == team2ID) && (gamesData[i].VISITOR_TEAM_ID == team1ID || gamesData[i].VISITOR_TEAM_ID == team2ID)){
                    if (parseInt(gamesData[i].HOME_TEAM_WINS)){
                        if (team1ID == gamesData[i].HOME_TEAM_ID){
                            team1Counter++
                        }
                        else {
                            team2Counter++
                        }
                    }
                    else {
                        if (team1ID == gamesData[i].VISITOR_TEAM_ID){
                            team1Counter++
                        }
                        else {
                            team2Counter++
                        }
                    }
                }
            }
        }
        var outputStr = "The head to head record between " + req.body.team1 + " and " + req.body.team2 + " during the " + req.body.season + " is " + team1Counter + "-" + team2Counter
        res.send(outputStr)
    });

module.exports = router