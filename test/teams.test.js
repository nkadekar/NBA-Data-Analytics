var rankingData = require("../public/js/parser").rankingData
var teamData = require("../public/js/parser").teamsData
var WesternConferenceArray = require("../public/js/SelectQuery/teams").WesternConferenceArray


test("Testing western conference", () => {
    expect(WesternConferenceArray(rankingData).size).toBe(15)
})