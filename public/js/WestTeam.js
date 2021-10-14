
function WesternConferenceArray(rankingData) { 
    var West = new Set()
    for (var i = 0; i < 30; i++) {
        if (rankingData[i].CONFERENCE == "West") {
            West.add(rankingData[i].TEAM_ID);
        }
    }
    return West
}

function WesternConferencePrint(rankingData, teamData) { 
    var WestTeams = []
    var West = WesternConferenceArray(rankingData)
    var temp = [...West]
    var count = 0
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 30; j++) {
            if (temp[i] == (teamData[j].TEAM_ID)) {
                WestTeams.push(teamData[j].NICKNAME)
            }
        }
    }
    return WestTeams
}


module.exports = WesternConferencePrint