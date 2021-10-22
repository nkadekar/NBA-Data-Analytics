const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')

const funcs = require('./public/js/fileHandler')

const playerDataFileName = __dirname + "/data/csv/players.csv"
const teamDataFileName = __dirname + "/data/csv/teams.csv"
const rankingDataFileName = __dirname + "/data/csv/ranking.csv"

const playerDataBackupFolder = __dirname + "/data/backup/players/"
const teamDataBackupFolder = __dirname + "/data/backup/teams/"
const rankingDataBackupFolder = __dirname + "/data/backup/rankings/"


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

app
	.route('/')
	.get((req, res) => {
    	res.sendFile(path.join(__dirname , 'public/html/index.html'));
	});

app.
	route('/saveButton')
	.get((req, res) => {
	var files = require("./public/js/parser.js")
	var playersCSV = fs.readFileSync("./data/csv/players.csv")
	var teamsCSV = fs.readFileSync("./data/csv/teams.csv")
	var rankingsCSV = fs.readFileSync('./data/csv/ranking.csv')
	// 1. get the last added csv file, and put it in the backlog folder

	const numOfFilesInPlayers = fs.readdirSync(path.join(playerDataBackupFolder)).length
	const numOfFilesInTeams = fs.readdirSync(path.join(teamDataBackupFolder)).length
	const numOfFilesInRankings = fs.readdirSync(path.join(rankingDataBackupFolder)).length
	console.log(numOfFilesInRankings)
	fs.writeFile(path.join(playerDataBackupFolder, 'backup-' + numOfFilesInPlayers + 1), playersCSV, (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + path.join(playerDataBackupFolder, 'backup'+ numOfFilesInPlayers + 1));
	});
	fs.writeFile(path.join(teamDataBackupFolder, 'backup-'+ numOfFilesInTeams + 1), teamsCSV, (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + path.join(teamDataBackupFolder, 'backup'+ numOfFilesInTeams + 1));
	});
	fs.writeFile(path.join(rankingDataBackupFolder, 'backup-' + numOfFilesInRankings + 1), rankingsCSV, (err) => {
        if(err) return console.log(err)
        console.log('writing to ' + path.join(rankingDataBackupFolder, 'backup'+ numOfFilesInRankings + 1));
	})
	// 2. get the current json object, turn it into csv and push it into the data folder
	var playersData = files.playersData
	var teamsData = files.teamsData
	var rankingsData = files.rankingData

	playersCSV = files.jsonCSV(playersData)
	console.log(playersCSV)
	fs.writeFile(playerDataFileName, playersCSV, (err) => {
		if(err) return console.log(err)
        console.log('writing to ' + playerDataFileName);
	})

	teamCSV = files.jsonCSV(teamsData)
	fs.writeFile(teamDataFileName, teamsCSV, (err) => {
		if(err) return console.log(err)
        console.log('writing to ' + teamDataFileName);
	})

	rankingsCSV = files.jsonCSV(rankingsData)
	fs.writeFile(rankingDataFileName, rankingsCSV, (err) => {
		if(err) return console.log(err)
        console.log('writing to ' + rankingDataFileName);
	})

	});



	
	

app
	.route('/back')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/html/index.html'));
	});

app
	.route('/public/js/insertData.js')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/js/insertData.js'));
	});

app
	.route('/public/js/updateData.js')
	. get((req, res) => {
	res.sendFile(path.join(__dirname, 'public/js/updateData.js'));
});

app
	.route('/public/js/deleteData.js')
	. get((req, res) => {
	res.sendFile(path.join(__dirname, 'public/js/deleteData.js'));
});

// app
// 	.route('/data/json/players.json')
// 	. get((req, res) => {
// 		res.sendFile(path.join(__dirname, 'data/json/players.json'));
// 	});

const players = require('./public/js/players')
app.use('/players', players)

const teams = require('./public/js/teams')
app.use('/teams', teams)

const teamWins = require('./public/js/wins')
app.use('/wins', teamWins)

const home = require('./public/js/homeRecord')
app.use('/home', home)

const deleteData = require('./public/js/deleteData')
app.use('/deleteButton', deleteData)

const updateData = require('./public/js/updateData')
app.use('/updateButton', updateData)

const insertData = require('./public/js/insertData')
app.use('/insertButton', insertData)

app
	.route('/saveButton')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/html/index.html'));
	});

app.listen(3000, () => {
	console.log(`Example app listening on port ${port}!`)
});