var rankingData = require("../public/js/parser").rankingData
var outOfBounds = require("../public/js/Analytics/mostHomeAndAwayWinsAnalytics").outOfBounds

test("Testing Lower Bound", () => {
    expect(outOfBounds(2003)).toBe(true)
})

test("Testing Upper Bound", () => {
    expect(outOfBounds(2021)).toBe(true)
})

test("Testing Correctness Bound", () => {
    expect(outOfBounds(2015)).toBe(false)
})

test("Testing Correctness Bound", () => {
    expect(outOfBounds(2019)).toBe(false)
})