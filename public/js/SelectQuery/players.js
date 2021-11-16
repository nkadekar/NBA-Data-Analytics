const express = require('express')
const router = express.Router()
const path = require('path') 
var playerData = require("../parser").playerData
const alert = require('alert')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../html/SelectQuery/players.html'))
    });

router
    .route('/playersQuery')
    .post((req, res) => {
        let numberOfPlayers = req.body.numberOfPlayers
        if (req.body.numberOfPlayers > playerData.length) {
            var alertMessage = "Number of players length is too big. Current length of player data is: " + playerData.length + " players."
            alert(alertMessage)
            res.sendFile(path.join(__dirname, '../../html/SelectQuery/players.html'))
        }
        else {
            var players = filterplayerData(playerData, numberOfPlayers)
            res.send(makeTable(players))
        }
    });

function filterplayerData(playerData, value) { 
    let res = []
    for (var i = 0; i < value; i++) {
        res.push(playerData[i].PLAYER_NAME)
    }
    return res
}

function makeTable(myArray) {
    var result = "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"" + 
        "integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\"></link>"
     result += "<table class=\"table\" border=1>"
     result += "<thead class=\"thead-dark\">"

     result += "<th scope=\"col\">#</th>"
     result += "<th scope=\"col\">Name</th>"
    result += "</thead>"
    for(var i=0; i < myArray.length; i++) {
        result += "<tr>"
        result += "<th scope=\"row\">" + (i + 1) + "</th>"
        result += "<td>"+myArray[i]+"</td>"
        result += "</tr>"
    }
    result += "</table>"
    result +=   "<form method=\"get\" action=\"/back\">"
    result +=   "<button class=\"btn btn-primary btn-lg\" id=\"save-button\" type=\"submit\" text-align=\"center\">Back</button>"
    result +=   "</form>"
    return result;
}

module.exports = router;