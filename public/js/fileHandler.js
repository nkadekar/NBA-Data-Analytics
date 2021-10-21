const fs = require('fs')

function backupAndPush(orig, backup, newData) {
    const jsonFile = require(orig)
    // backing up the data
    fs.writeFile(backup, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        //console.log(JSON.stringify(playerData));
        console.log('writing to ' + backup);
    }) 

    // updating the current json file
    jsonFile.push(newData)
    fs.writeFile(orig, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        //console.log(JSON.stringify(playerData));
        console.log('writing to ' + orig);
    })
}

module.exports = backupAndPush