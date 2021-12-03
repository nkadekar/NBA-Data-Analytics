var rankingData = require("../public/js/parser").rankingData
var WesternConferenceArray = require("../public/js/SelectQuery/teams").WesternConferenceArray
var EasternConferenceArray = require("../public/js/SelectQuery/teams").EasternConferenceArray


test("Testing western conference", () => {
    expect(WesternConferenceArray(rankingData).size).toBe(15)
})

test("Testing eastern conference", () => {
    expect(EasternConferenceArray(rankingData).size).toBe(15)
})