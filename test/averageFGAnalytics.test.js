var gameData = require("../public/js/parser.js").gamesData
var computeAverageFGQuery = require("../public/js/Analytics/averageFGAnalytics").computeAverageFGQuery


test("testing average FG Analytics for PTS", () => {
    expect(computeAverageFGQuery(gameData, 2015).avgPTS).toBe("107.9")
})

test("testing average FG Analytics for FG", () => {
    expect(computeAverageFGQuery(gameData, 2015).avgFG).toBe("0.4754")
})

test("testing average FG Analytics for 3PT", () => {
    expect(computeAverageFGQuery(gameData, 2015).avg3PT).toBe("0.3831")
})

test("testing average FG Analytics for REB", () => {
    expect(computeAverageFGQuery(gameData, 2015).avgREB).toBe("45.59")
})

test("testing average FG Analytics for AST", () => {
    expect(computeAverageFGQuery(gameData, 2015).avgAST).toBe("23.62")
})


test("testing average FG Analytics for FT", () => {
    expect(computeAverageFGQuery(gameData, 2015).avgFT).toBe("0.7684")
})