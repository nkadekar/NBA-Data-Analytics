var gamesData = require("../public/js/parser.js").gamesData
var teamsData = require("../public/js/parser.js").teamsData
var computeHeadToHeadQuery = require("../public/js/Analytics/headToHeadAnalytics").computeHeadToHeadQuery

test("testing head to head analytics team 1 in 2015", () => {
    expect(computeHeadToHeadQuery(gamesData, teamsData, 2015, "Hawks", "Celtics").team1Counter).toBe(7)
})

test("testing head to head analytics team 2 in 2015", () => {
    expect(computeHeadToHeadQuery(gamesData, teamsData, 2015, "Hawks", "Celtics").team2Counter).toBe(3)
})

test("testing head to head analytics team 1 in 2010", () => {
    expect(computeHeadToHeadQuery(gamesData, teamsData, 2010, "Nets", "Heat").team1Counter).toBe(0)
})

test("testing head to head analytics team 2 in 2010", () => {
    expect(computeHeadToHeadQuery(gamesData, teamsData, 2010, "Nets", "Heat").team2Counter).toBe(3)
})