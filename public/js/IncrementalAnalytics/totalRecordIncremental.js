const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("../parser").rankingData

var cachedtotalWinsJSON = []
var DataJSON = []

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../../html/IncrementalAnalytics/totalRecordIncremental.html'))
    });

router
    .route('/totalRecordIncrementalQuery')
    .post((req, res) => {
        console.time('Incremental timer for total record')
        if(DataJSON.length == 0) {
            //1. populate JSON
            for (var season = 2004; season <= 2020; season++){
                var games = 82
                if (season == 2011){
                    games = 66
                }
                else if (season == 2019){
                    games = 64
                }
                else if (season == 2020){
                    games = 72
                }
                DataJSON.push(getRecordPerTeam(rankingData, season, games))
            }
            var allNames = []
            for (var i = 0; i < DataJSON.length; i++){
                for (var j = 0; j < DataJSON[i].length; j++){
                    if (allNames.indexOf(DataJSON[i][j].TEAMNAME) == -1){
                        allNames.push(DataJSON[i][j].TEAMNAME)
                    }
                }
            }
            for (var i = 0; i < allNames.length; i++){
                cachedtotalWinsJSON.push(calcWins(allNames[i]))
            }
        }
        var teamName = req.body.teamName
        var wins = 0
        for (var i = 0; i < cachedtotalWinsJSON.length; i++){
            if (cachedtotalWinsJSON[i].TEAMNAME == teamName){
                wins = cachedtotalWinsJSON[i].WINS
            }
        }
        res.send(makeGraph(teamName, wins))
        console.timeEnd('Incremental timer for total record')
    });

function getRecordPerTeam(rankingData, season, games) {
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

function calcWins(teamName){
    var winsTotal = 0
    for (var i = 0; i < DataJSON.length; i++){
        for (var j = 0; j < DataJSON[i].length; j++){
            if (DataJSON[i][j].TEAMNAME == teamName){
                winsTotal += (DataJSON[i][j].HOMEWINS + DataJSON[i][j].AWAYWINS)
            }
        }
    }
    return createJSON2(teamName, winsTotal)
}

function createJSON(teamName, season, homeWins, awayWins){
    return {"TEAMNAME": teamName, "SEASON": season, "HOMEWINS": homeWins, "AWAYWINS": awayWins}
}

function createJSON2(teamName, totalWins){
    return {"TEAMNAME": teamName, "WINS": totalWins}
}

function makeGraph(teamName, wins){

    var sendData = "<script src=\"https://cdn.plot.ly/plotly-2.4.2.min.js\"></script>" +
        
                            "<div id=\"myDiv\">" + "</div>" +
                            "<script>" + 
                            "var data = [\n" + 
                            "{\n" +
                            " x: [" + "\"" + teamName + "\"" + "],\n" +
                            " y: [" + wins + "],\n" +
                            " type: \'bar\'\n" +
                            "}\n" +
                            "];\n" +
                            "Plotly.newPlot('myDiv', data);\n" +
                            "</script>" 

    return sendData
}


module.exports = {router, cachedtotalWinsJSON}