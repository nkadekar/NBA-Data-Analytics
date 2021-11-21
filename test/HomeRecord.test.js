var rankingData = require("../public/js/parser").rankingData
const getHomeWinsPerTeam = require("../public/js/SelectQuery/HomeRecord").getHomeWinsPerTeam

// regular nba season of 82 games
test("testing getHomeWinsPerTeam() for a regular nba season", () =>{
    expect(getHomeWinsPerTeam(rankingData, 2015, 82).length).toBe(30)
})

// special nba season due to lock down (66 games)
test("testing getHomeWinsPerTeam() for the 2011 season", () =>{
    expect(getHomeWinsPerTeam(rankingData, 2011, 66).length).toBe(30)
})

// special nba season due to COVID  (63 games)
test("testing getHomeWinsPerTeam() for the 2019 season", () =>{
    expect(getHomeWinsPerTeam(rankingData, 2019, 63).length).toBe(30)
})

// special nba season due to COVID  (72 games)
test("testing getHomeWinsPerTeam() for the 2020 season", () =>{
    expect(getHomeWinsPerTeam(rankingData, 2020, 72).length).toBe(30)
})