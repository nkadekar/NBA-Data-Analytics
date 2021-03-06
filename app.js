/** Express router providing user related routes
 * @module routers/users
 * @requires express
 */ 

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 */
//router in all JS files

const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')

// const funcs = require('./public/js/fileHandler')

const playerDataFileName = __dirname + "/data/csv/players.csv"
const teamDataFileName = __dirname + "/data/csv/teams.csv"
const rankingDataFileName = __dirname + "/data/csv/ranking.csv"

const playerDataBackupFolder = __dirname + "/data/backup/players/"
const teamDataBackupFolder = __dirname + "/data/backup/teams/"
const rankingDataBackupFolder = __dirname + "/data/backup/rankings/"

app
	.route('/public/css/main.css')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/css/main.css'));
	});

app
	.route('/public/css/bootstrap.min.css')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/css/bootstrap.min.css'));
	});

app
	.route('/public/js/ManipulateData/insertData.js')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/js/ManipulateData/insertData.js'));
	});

app
	.route('/public/js/ManipulateData/updateData.js')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/js/ManipulateData/updateData.js'));
	});

app
	.route('/public/js/ManipulateData/deleteData.js')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/js/ManipulateData/deleteData.js'));
	});

app
	.route('/public/js/Analytics/pointsPerPlayerAnalytics.js')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/js/Analytics/pointsPerPlayerAnalytics.js'));
	});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

/**
 * Route serving main page of website.
 * @name get/index.html
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app
	.route('/')
	.get((req, res) => {
    	res.sendFile(path.join(__dirname , 'public/html/index.html'));
	});

/**
 * Route serving Save Data button.
 * @name get/saveButton
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.
	route('/saveButton')
	.get((req, res) => {
		var files = require("./public/js/parser.js")
		var playersCSV = fs.readFileSync("./data/csv/players.csv")
		var teamsCSV = fs.readFileSync("./data/csv/teams.csv")
		var rankingsCSV = fs.readFileSync('./data/csv/ranking.csv')
		// 1. get the last added csv file, and put it in the backlog folder
		var numOfFilesInPlayers = fs.readdirSync(path.join(playerDataBackupFolder)).length
		var numOfFilesInTeams = fs.readdirSync(path.join(teamDataBackupFolder)).length
		var numOfFilesInRankings = fs.readdirSync(path.join(rankingDataBackupFolder)).length
		var versionPlayers = numOfFilesInPlayers++;
		var versionTeams = numOfFilesInTeams++;
		var versionRankings = numOfFilesInRankings++;

		fs.writeFile(path.join(playerDataBackupFolder, 'backup-' + versionPlayers), playersCSV, (err) => {
			if(err) return console.log(err)
			console.log('writing to ' + path.join(playerDataBackupFolder, 'backup'+ versionPlayers));
		});
		fs.writeFile(path.join(teamDataBackupFolder, 'backup-'+ versionTeams), teamsCSV, (err) => {
			if(err) return console.log(err)
			console.log('writing to ' + path.join(teamDataBackupFolder, 'backup'+ versionTeams));
		});
		fs.writeFile(path.join(rankingDataBackupFolder, 'backup-' + versionRankings), rankingsCSV, (err) => {
			if(err) return console.log(err)
			console.log('writing to ' + path.join(rankingDataBackupFolder, 'backup'+ versionRankings));
		})
		// 2. get the current json object, turn it into csv and push it into the data folder
		var playersData = files.playerData
		var teamsData = files.teamsData
		var rankingsData = files.rankingData

		playersCSV = files.jsonCSV(playersData)
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

/**
 * Route serving back buttons.
 * @name get/back
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app
	.route('/back')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/html/index.html'));
	});

const players = require('./public/js/SelectQuery/players')
app.use('/players', players.router)

const teams = require('./public/js/SelectQuery/teams')
app.use('/teams', teams.router)

const teamWins = require('./public/js/SelectQuery/wins')
app.use('/wins', teamWins.router)

const home = require('./public/js/SelectQuery/homeRecord')
app.use('/home', home.router)

const deleteData = require('./public/js/ManipulateData/deleteData')
app.use('/deleteButton', deleteData)

const updateData = require('./public/js/ManipulateData/updateData')
app.use('/updateButton', updateData)

const insertData = require('./public/js/ManipulateData/insertData')
app.use('/insertButton', insertData.router)

const pointsPerPlayerAnalytics = require("./public/js/Analytics/pointsPerPlayerAnalytics")
app.use('/pointsPerPlayerAnalytics', pointsPerPlayerAnalytics.router)

const pointsDifferenceAnalytics = require('./public/js/Analytics/PointsDifferenceAnalytics')
app.use('/pointsDifferenceAnalytics', pointsDifferenceAnalytics.router)

const headToHeadAnalytics = require('./public/js/Analytics/headToHeadAnalytics')
app.use('/headToHeadAnalytics', headToHeadAnalytics.router)

const averageFGAnalytics = require("./public/js/Analytics/averageFGAnalytics")
app.use("/averageFGAnalytics", averageFGAnalytics.router)

const FTandThreePointerAnalytics = require("./public/js/Analytics/FTandThreePointerAnalytics")
app.use("/FTandThreePointerAnalytics", FTandThreePointerAnalytics.router)

const MostHomeAndAwayWinsAnalytics = require("./public/js/Analytics/MostHomeAndAwayWinsAnalytics")
app.use("/MostHomeAndAwayWinsAnalytics", MostHomeAndAwayWinsAnalytics.router)

const MostHomeAndAwayWinsAnalyticsIncremental = require("./public/js/IncrementalAnalytics/homeAwayWinsIncremental")
app.use("/homeAwayWinsIncremental", MostHomeAndAwayWinsAnalyticsIncremental.router)

const totalRecordIncremental = require("./public/js/IncrementalAnalytics/totalRecordIncremental")
app.use("/totalRecordIncremental", totalRecordIncremental.router)

app
	.route('/saveButton')
	. get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/html/index.html'));
	});

app.listen(3000, () => {
	console.log(`Example app listening on port ${port}!`)
});