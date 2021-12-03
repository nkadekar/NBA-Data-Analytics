var rankingData = require("../public/js/parser").rankingData
var getWinsPerTeam = require("../public/js/SelectQuery/wins").getWinsPerTeam

test("Testing wins per team 2011", () => {
    expect(getWinsPerTeam(rankingData, 2011, 66).length).toBe(30)
})

test("Testing wins per team 2019 ", () => {
    expect(getWinsPerTeam(rankingData, 2019, 63).length).toBe(30)
})

test("Testing wins per team 2020 ", () => {
    expect(getWinsPerTeam(rankingData, 2020, 72).length).toBe(30)
})

test("Testing wins per team 2015 ", () => {
    expect(getWinsPerTeam(rankingData, 2015, 82).length).toBe(30)
})