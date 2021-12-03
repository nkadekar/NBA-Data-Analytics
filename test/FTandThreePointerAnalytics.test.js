var gameData = require("../public/js/parser.js").gamesData
var computeFTandThreePointerQuery = require("../public/js/Analytics/FTandThreePointerAnalytics").computeFTandThreePointerQuery

test("testing FTandThreePointerQuery, FT Home", () => {
    expect(computeFTandThreePointerQuery(gameData, 2015).avgHomeFreeThrow).toBe("76.01")
})


test("testing FTandThreePointerQuery, Three Home", () => {
    expect(computeFTandThreePointerQuery(gameData, 2015).avgHomeThreePoint).toBe("35.46")
})

test("testing FTandThreePointerQuery, FT Away", () => {
    expect(computeFTandThreePointerQuery(gameData, 2015).avgAwayFreeThrow).toBe("75.48")
})

test("testing FTandThreePointerQuery, Three Away", () => {
    expect(computeFTandThreePointerQuery(gameData, 2015).avgAwayThreePoint).toBe("34.60")
})

