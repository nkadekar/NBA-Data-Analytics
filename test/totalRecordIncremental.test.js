var rankingData = require("../public/js/parser").rankingData
var getRecordPerTeam = require("../public/js/IncrementalAnalytics/totalRecordIncremental").getRecordPerTeam

test("Testing record per team 2011", () => {
    expect(getRecordPerTeam(rankingData, 2011, 66).length).toBe(30)
})

test("Testing record per team 2019 ", () => {
    expect(getRecordPerTeam(rankingData, 2019, 63).length).toBe(30)
})

test("Testing record per team 2020 ", () => {
    expect(getRecordPerTeam(rankingData, 2020, 72).length).toBe(30)
})

test("Testing record per team 2015 ", () => {
    expect(getRecordPerTeam(rankingData, 2015, 82).length).toBe(30)
})