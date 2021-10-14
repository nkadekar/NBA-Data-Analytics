


function EasternConferenceArray(rankingData) {
    var East = new Set()
    for (var i = 0; i < 20000; i++) {
        if (rankingData[i].CONFERENCE == "East") {
            East.add(rankingData[i].TEAM_ID);
        }
    }
    return East
}

function EasternConferencePrint(rankingData, teamData) {
    var EastTeam = []
    var East = EasternConferenceArray(rankingData)

    var temp = [...East]
    var count = 0
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 30; j++) {
            if (temp[i] == (teamData[j].TEAM_ID)) {
                EastTeam.push(teamData[j].NICKNAME)
            }
        }
    }
    return EastTeam
}

module.exports = EasternConferencePrint