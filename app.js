const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

app
	.route('/')
	.get((req, res) => {
    	res.sendFile(path.join(__dirname , 'public/html/index.html'));
	});

app
	.route('/back')
	.get((req, res) => {
		res.sendFile(path.join(__dirname, 'public/html/index.html'));
	});

const insertDataFunction = require('./public/js/insertDataFunction')
	  
	


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

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`)
});
