const rankingData = require('../../data/json/ranking.json')

function getWinsPerTeam(rankingData, season, games) {
    var visited = []
    var arr = [];
    var counter = 0;
    for (var i = 0; i < rankingData.length; i++){
        if((rankingData[i].SEASON_ID.substring(1) == season) && (rankingData[i].G == games)){
            if(visited.indexOf(rankingData[i].TEAM_ID) == -1){
                visited.push(rankingData[i].TEAM_ID);
                arr.push(rankingData[i]);
            }
        } 
    }
    return arr;
}
function PrintTeamWins(rankingData, season){
    var seasonList = getWinsPerTeam(rankingData, season, 82)
    var res = []
    for (var i = 0; i < seasonList.length; i++) {
        res.push(seasonList[i].TEAM + ": " +  seasonList[i].W)
    }
    return res
}
module.exports = PrintTeamWins