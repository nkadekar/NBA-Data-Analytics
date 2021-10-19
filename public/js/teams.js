const express = require('express')
const router = express.Router()
const path = require('path')
const rankingData = require('../../data/json/ranking.json')
const teamData = require('../../data/json/team.json')

var West = WesternConferencePrint(rankingData, teamData)
var East = EasternConferencePrint(rankingData, teamData)

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../html/teams.html'))
    });

router
    .route('/conferenceQuery')
    .post((req, res) => {
        var choice = req.body.conf
        if(choice == 'west' || choice == "West") {
            res.send(West)
        }
        else if(choice == 'east' || choice == "East"){
            res.send(East)
        }
    });

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

module.exports = router