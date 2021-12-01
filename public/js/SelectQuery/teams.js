const express = require('express')
const router = express.Router()
const path = require('path')
var rankingData = require("../parser").rankingData
var teamData = require("../parser").teamsData

var West = WesternConferencePrint(rankingData, teamData)
var East = EasternConferencePrint(rankingData, teamData)

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../html/SelectQuery/teams.html'))
    });

router
    .route('/conferenceQuery')
    .post((req, res) => {
        var choice = req.body.conf
        if(choice == 1) {
            res.send(makeTable(West, "Western Conference Teams"))
        }
        else if(choice == 2){
            res.send(makeTable(East, "Eastern Conference Teams"))
        }
    });

/**
 * Compiles all teams in the Western Conference
 * @param {Array[JSON Object]} rankingData
 * @returns {Array[string]} West
 */
function WesternConferenceArray(rankingData) { 
    var West = new Set()
    for (var i = 0; i < rankingData.length - 1; i++) {
        if (rankingData[i].CONFERENCE == "West") {
            West.add(rankingData[i].TEAM_ID)
        }
    }
    return West
}

/**
 * Converts team ID to team nicknames for Western Conference
 * @param {Array[JSON Object]} rankingData 
 * @param {Array[JSON Object]} teamData 
 * @returns {Array[string]} WestTeams
 */
function WesternConferencePrint(rankingData, teamData) { 
    var WestTeams = []
    var West = WesternConferenceArray(rankingData)
    var temp = [...West]
    var count = 0
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < teamData.length; j++) {
            if (temp[i] == (teamData[j].TEAM_ID)) {
                WestTeams.push(teamData[j].NICKNAME)
            }
        }
    }
    return WestTeams
}

/**
 * Compiles all teams in the Eastern Conference
 * @param {Array[JSON Object]} rankingData
 * @returns {Array[string]} East
 */
function EasternConferenceArray(rankingData) {
    var East = new Set()
    for (var i = 0; i < 20000; i++) {
        if (rankingData[i].CONFERENCE == "East") {
            East.add(rankingData[i].TEAM_ID)
        }
    }
    return East
}

/**
 * Converts team ID to team nicknames for Eastern Conference
 * @param {Array[JSON Object]} rankingData 
 * @param {Array[JSON Object]} teamData 
 * @returns {Array[string]} EastTeams
 */
function EasternConferencePrint(rankingData, teamData) {
    var EastTeam = []
    var East = EasternConferenceArray(rankingData)
    var temp = [...East]
    var count = 0
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < teamData.length; j++) {
            if (temp[i] == (teamData[j].TEAM_ID)) {
                EastTeam.push(teamData[j].NICKNAME)
            }
        }
    }
    return EastTeam
}

/**
 * Makes html table given data
 * @param {Array[string]} myArray
 * @param {string} conference
 * @returns {HTML Table} result
 */
function makeTable(myArray, conference) {
    var result = "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"" + 
    "integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\"></link>"
    result += "<table class=\"table\" border=1>"
    result += "<thead class=\"thead-dark\">"

    result += "<th scope=\"col\">" + conference + "</th>"
    result += "</thead>"
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>"
        result += "<td>"+myArray[i]+"</td>"
        result += "</tr>"
    }
    result += "</table>"
    result +=   "<form method=\"get\" action=\"/back\">"
    result +=   "<button class=\"btn btn-primary btn-lg\" id=\"save-button\" type=\"submit\" text-align=\"center\">Back</button>"
    result +=   "</form>"
    return result;
}

module.exports = router