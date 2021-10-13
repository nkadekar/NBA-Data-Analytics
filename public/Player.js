

function filterplayerData(playerData, value) { 
    for (var i = 0; i < value; i++) {
        console.log(playerData[i].PLAYER_NAME)
    }
}


module.exports = filterplayerData;