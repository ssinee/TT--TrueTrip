const express = require('express');
const router = express.Router();
const fs = require('fs');




var meanArr= new Array();
var wordArr= new Array();
var strstr= new Array();

// Main Page
router.get('/main', (req, res) => {
    res.render('../views/index.html');
});


module.exports = router;
