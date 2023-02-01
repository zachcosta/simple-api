const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.get('/', (req,res) => {
    res.send('We are on the cards page!');
})

router.post('/', (req,res) => {
    console.log(req.body);
})

module.exports = router;