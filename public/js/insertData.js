const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/insertData.html'))
    });

function CheckVal(){
    var val = $('#insertSelect').val();
    if (val == "Players") {
        document.getElementById("userInput").innerHTML = 
        "<h3>PlayerID:</h3> <input id=\"PlayerID\" > </input> <br>" + 
        "<h3>TeamID:</h3> <input id=\"TeamID\" > </input> <br>" +
        "<h3>PlayerName:</h3> <input id=\"PlayerName\"> </input> <br>" +
        "<h3>Season Played:</h3> <input id = \"SeasonPlayed\"></input> <br>" +
        "<input type=\"Submit\" onClick=func()>" 
        var playerIDButton = document.getElementById("PlayerID")
        console.log(playerIDButton.value)
    }
    else if (val == "Teams") {
        document.getElementById("userInput").innerHTML =
        "Team Name: <input > </input>"
    }
}

module.exports = router