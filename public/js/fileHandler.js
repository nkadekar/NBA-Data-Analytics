const fs = require('fs')

const playerDataFileName = __dirname + "/../data/csv/players.csv"
const teamDataFileName = __dirname + "/../data/csv/teams.csv"
const rankingDataFileName = __dirname + "/../data/csv/ranking.csv"

const playerDataBackupFolder = __dirname + "/../data/players"
const teamDataBackupFolder = __dirname + "/../data/teams"
const rankingDataBackupFolder = __dirname + "/../data/rankings"

/**
 * Backs up old json data and writes new data to a new json file
 * @param {object} orig
 * @param {object} backup
 * @param {JSON object} newData
 */
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

/**
 * Backs up old json data and writes it to a backup file
 * @param {object} orig
 * @param {object} backup
 */
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