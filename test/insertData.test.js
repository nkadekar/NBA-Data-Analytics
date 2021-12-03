const createJSONVar = require("../public/js/ManipulateData/insertData").createJSONVar

test("testing createJSONVar function in insertData", () =>{
    expect(createJSONVar("a","b","c","d").PLAYER_NAME).toBe("a")
})

test("testing createJSONVar function in insertData", () =>{
    expect(createJSONVar("a","b","c","d").TEAM_ID).toBe("b")
})

test("testing createJSONVar function in insertData", () =>{
    expect(createJSONVar("a","b","c","d").SEASON).toBe("d")
})

test("testing createJSONVar function in insertData", () =>{
    expect(createJSONVar("a","b","c","d").PLAYER_ID).toBe("c")
})

