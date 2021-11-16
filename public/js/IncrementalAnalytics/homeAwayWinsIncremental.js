const express = require('express')
const router = express.Router()
const path = require('path')
// var cachedDataJSON = require("../../../app.js").cachedHomeAwayWinsJSON
var rankingData = require("../parser").rankingData
const alert = require('alert');
var cachedDataJSON = [];

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/IncrementalAnalytics/homeAwayWinsIncremental.html'))
    });

router
    .route('/homeAwayWinsIncrementalQuery')
    .post((req, res) => {
        //0. Check if JSON file is empty 
        if(Object.keys(cachedDataJSON).length != 0)
        {
            // console.log(cachedDataJSON[0])
            return;
        }
        else{
            //1. populate JSON
            for (var season = 2004; season <= 2020; season++){
                var games = 82
                if (season == 2011){
                    games = 66
                }
                else if (season == 2019 || season == 2020){
                    games = 72
                }
                // console.log("here")
                cachedDataJSON.push(getWinsPerTeam(rankingData, season, games))
                // console.log(cachedDataJSON)
            }

            //2. option to change

            //3. compare times
        }
    });

function getWinsPerTeam(rankingData, season, games) {
    var visited = []
    var arr = [];
    for (var i = 0; i < rankingData.length; i++){
        if((rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == games)){
            if(visited.indexOf(rankingData[i].TEAM_ID) == -1){
                visited.push(rankingData[i].TEAM_ID)
                var homeRec = parseInt(rankingData[i].HOME_RECORD.substr(0, rankingData[i].HOME_RECORD.indexOf('-')))
                var awayRec = parseInt(rankingData[i].ROAD_RECORD.substr(0, rankingData[i].ROAD_RECORD.indexOf('-')))
                arr.push(createJSON(rankingData[i].TEAM, rankingData[i].SEASON_ID.substring(1), homeRec, awayRec))
            }
        } 
    }
    return arr
}

function createJSON(teamName, season, homeWins, awayWins){
    return {"TEAM NAME": teamName, "SEASON": season, "HOMEWINS": homeWins, "AWAYWINS": awayWins}
}
    
module.exports = router