const fs = require('fs')

const playerDataFileName = __dirname + "/../data/csv/players.csv"
const teamDataFileName = __dirname + "/../data/csv/teams.csv"
const rankingDataFileName = __dirname + "/../data/csv/ranking.csv"

const playerDataBackupFolder = __dirname + "/../data/players"
const teamDataBackupFolder = __dirname + "/../data/teams"
const rankingDataBackupFolder = __dirname + "/../data/rankings"

function backupAndPush(orig, backup, newData) {
    const jsonFile = require(orig)
    // backing up the data
    fs.writeFile(backup, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + backup);
    }) 

    // updating the current json file
    jsonFile.push(newData)

    fs.writeFile(orig, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + orig);
    })
}

function backup(orig, backup) {
    const jsonFile = require(orig)
    // backing up the data
    fs.writeFile(backup, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + backup);
    }) 

    // updating the current json file
    fs.writeFile(orig, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + orig);
    })
}

function backup(orig, backup) {
    const jsonFile = require(orig)
    // backing up the data
    fs.writeFile(backup, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + backup);
    }) 

    // updating the current json file
    fs.writeFile(orig, JSON.stringify(jsonFile), (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + orig);
    })
}

module.exports = {backupAndPush , backup}