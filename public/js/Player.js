

function filterplayerData(playerData, value) { 
    var listOfPlayers = []
    for (var i = 0; i < value; i++) {
        listOfPlayers.push(playerData[i].PLAYER_NAME)
    }

    return listOfPlayers
}


module.exports = filterplayerData;
