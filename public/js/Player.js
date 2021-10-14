

function filterplayerData(playerData, value) { 
    let res = []
    for (var i = 0; i < value; i++) {
        //console.log(playerData[i].PLAYER_NAME)
        res.push(playerData[i].PLAYER_NAME)
    }
    return res
}


module.exports = filterplayerData;
