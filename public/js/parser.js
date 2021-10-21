const fs = require("fs");

function csvJSON(csv){
    var lines = csv.split("\n");
    var result = [];
    var finalString = "[\n";
    var headers = lines[0].split(",");
  
    for(var i = 1; i < lines.length; i++){
  
        var obj = {};
        var currentline = lines[i].split(",");
  
        for(var j=0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result
}

function jsonCSV(json) {
    var lines = json.split("\n");
    var result = [];
    var finalString = "[\n";
    var headers = lines[0].split(",");
  
    for(var i = 1; i < lines.length; i++){
  
        var obj = {};
        var currentline = lines[i].split(",");
  
        for(var j=0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result
}

const playerData = csvJSON(fs.readFileSync("../../data/csv/players.csv").toString())
const gamesData = csvJSON(fs.readFileSync("../../data/csv/games.csv").toString())
const gamesDetailsData = csvJSON(fs.readFileSync("../../data/csv/games_details.csv").toString())
const rankingData = csvJSON(fs.readFileSync("../../data/csv/ranking.csv").toString())
const teamsData = csvJSON(fs.readFileSync("../../data/csv/teams.csv").toString())

module.exports = {playerData, gamesData, gamesDetailsData, rankingData, teamsData}