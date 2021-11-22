const filterplayerData = require("../public/js/SelectQuery/players").filterplayerData
var playerData = require("../public/js/parser").playerData
const checkLengthOfPlayerData = require("../public/js/SelectQuery/players").checkLengthOfPlayerData



test("Testing filterplayerData()", () => {
    expect(filterplayerData(playerData, 10).length).toBe(10)
})

test("Testing getting the name of a player", () => {
    expect(filterplayerData(playerData, 1)[0]).toBe("Royce O'Neale")
})


test("Testing filterplayerData()", () => {
    expect(checkLengthOfPlayerData(playerData, playerData.length + 1)).toBeTruthy()
})