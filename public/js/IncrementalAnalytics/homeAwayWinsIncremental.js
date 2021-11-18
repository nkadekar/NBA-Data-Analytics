const express = require('express')
const router = express.Router()
const path = require('path')
// var cachedDataJSON = require("../../../app.js").cachedHomeAwayWinsJSON
var rankingData = require("../parser").rankingData

var cachedDataJSON = [];

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/IncrementalAnalytics/homeAwayWinsIncremental.html'))
    });

router
    .route('/homeAwayWinsIncrementalQuery')
    .post((req, res) => {
        if(Object.keys(cachedDataJSON).length != 0){

            //Read from data and deal with updates
            
            //2. option to change

            //3. compare times

        }
        else{
            //1. populate JSON
            for (var season = 2004; season <= 2020; season++){
                var games = 82
                if (season == 2011){
                    games = 66
                }
                else if (season == 2019){
                    games = 63
                }
                else if (season == 2020){
                    games = 72
                }
                cachedDataJSON.push(getWinsPerTeam(rankingData, season, games))
            }
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
                arr.push(createJSON(rankingData[i].TEAM, parseInt(rankingData[i].SEASON_ID.substring(1)), homeRec, awayRec))
            }
        } 
    }
    return arr
}

function createJSON(teamName, season, homeWins, awayWins){
    return {"TEAMNAME": teamName, "SEASON": season, "HOMEWINS": homeWins, "AWAYWINS": awayWins}
}
    
module.exports = router