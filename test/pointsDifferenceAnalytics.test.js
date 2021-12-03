var teamData = require("../public/js/parser").teamsData
var findAwayName = require("../public/js/Analytics/pointsDifferenceAnalytics").findAwayName
var findHomeName = require("../public/js/Analytics/pointsDifferenceAnalytics").findHomeName

test("Testing find home name", () => {
    var string = teamData[0].TEAM_ID
    var nickname = teamData[0].NICKNAME
    expect(findHomeName(teamData, string)).toBe(nickname)
})

test("Testing find home name", () => {
    var string = teamData[1].TEAM_ID
    var nickname = teamData[1].NICKNAME
    expect(findHomeName(teamData, string)).toBe(nickname)
})

test("Testing find away name", () => {
    var string = teamData[2].TEAM_ID
    var nickname = teamData[2].NICKNAME
    expect(findAwayName(teamData, string)).toBe(nickname)
})

test("Testing find away name", () => {
    var string = teamData[3].TEAM_ID
    var nickname = teamData[3].NICKNAME
    expect(findAwayName(teamData, string)).toBe(nickname)
})