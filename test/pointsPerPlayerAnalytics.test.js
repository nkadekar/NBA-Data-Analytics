var gameDetailsData = require("../public/js/parser").gamesDetailsData
var findPlayerIndex = require("../public/js/Analytics/pointsPerPlayerAnalytics").findPlayerIndex



test("Testing findPlayerIndex", () => {
    var playername = gameDetailsData[0].PLAYER_NAME.toLowerCase()
    expect(findPlayerIndex(playername)).toBe(0)
})

test("Testing findPlayerIndex", () => {
    var playername = gameDetailsData[1].PLAYER_NAME.toLowerCase()
    expect(findPlayerIndex(playername)).toBe(1)
})

test("Testing findPlayerIndex", () => {
    var playername = gameDetailsData[2].PLAYER_NAME.toLowerCase()
    expect(findPlayerIndex(playername)).toBe(2)
})