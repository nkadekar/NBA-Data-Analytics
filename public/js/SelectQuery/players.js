const express = require('express')
const router = express.Router()
const path = require('path') 
var playerData = require("../parser").playerData
const alert = require('alert')

/**
 * Route serving players request.
 * @name get/players
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../html/SelectQuery/players.html'))
    });

/**
 * Route serving players query computation.
 * @name get/players/playersQuery
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
    .route('/playersQuery')
    .post((req, res) => {
        let numberOfPlayers = req.body.numberOfPlayers
        if(checkLengthOfPlayerData(playerData, req.body.numberOfPlayers)){
                res.sendFile(path.join(__dirname, '../../html/SelectQuery/players.html'))
        }
        else {
            var players = filterplayerData(playerData, numberOfPlayers)
            res.send(makeTable(players))
        }
    });

/**
 * Gets a certain number of player names from playerData
 * @param {Array.<Object>} playerData
 * @param {string} value
 * @returns {Array.<string>} res
 */
function filterplayerData(playerData, value) { 
    let res = []
    for (var i = 0; i < value; i++) {
        res.push(playerData[i].PLAYER_NAME)
    }
    return res
}

/**
 * Verifies that the value passed in is less than the length of the playerData array
 * @param {Array.<Object>} playerData
 * @param {string} value
 * @returns {boolean}
 */
function checkLengthOfPlayerData(playerData, value){
    if(value > playerData.length) {
        var alertMessage = "Number of players length is too big. Current length of player data is: " + playerData.length + " players."
        alert(alertMessage)
        return true  
    }
    return false
}

/**
 * Makes html table given data
 * @param {Array.<string>} myArray
 * @returns {HTML_Table} result
 */
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

module.exports = {router, filterplayerData, checkLengthOfPlayerData};