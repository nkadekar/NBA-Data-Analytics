const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/insertData.html'))
    });

module.exports = router