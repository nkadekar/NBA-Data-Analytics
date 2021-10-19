const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname , '../html/deleteData.html'))
    });

module.exports = router