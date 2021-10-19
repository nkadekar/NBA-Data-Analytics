const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())


app.route('/insertButton').get((req, res) => {
    res.sendFile(path.join(__dirname , 'public/html/insertData.html'));
});

app.route('/updateButton').get((req, res) => {
    res.sendFile(path.join(__dirname , 'public/html/updateData.html'));
});

app.route('/deleteButton').get((req, res) => {
    res.sendFile(path.join(__dirname , 'public/html/deleteData.html'));
});

app
	.route('/')
	.get((req, res) => {
    	res.sendFile(path.join(__dirname , 'public/html/index.html'));
	});

app.route('/back'). get((req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

const players = require('./public/js/Player')
app.use('/players', players)

const teams = require('./public/js/teams')
app.use('/teams', teams)

const teamWins = require('./public/js/TeamWins')
app.use('/wins', teamWins)

const home = require('./public/js/HomeRecord')
app.use('/home', home)

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`)
});
