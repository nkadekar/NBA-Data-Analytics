
const teamData = require('../team.json');
const data = require('../ranking.json')

var West = {}
var East = {}

function WesternConferenceArray(data) { 
    for (var i = 0; i < 30; i++) {
        if (data[i].Conference == "West") {
            West.push(data[i].teamID);
        }
    }
}

function WesternConferencePrint(teamData) { 
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 30; j++) {
            if (West[i] == (teamData[j].teamID)) {
             console.log(teamdata[j].Nickname)
            }
        }
    }
}

function EasternConferenceArray(data) { 
    for (var i = 0; i < 30; i++) {
        if (data[i].Conference == "East") {
            East.push(data[i].teamID);
        }
    }
}

function EasternConferencePrint(teamData) { 
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 30; j++) {
            if (East[i] == (teamData[j].teamID)) {
             console.log(teamdata[j].Nickname)
            }
        }
    }
}

//filterPrint(teamData)
