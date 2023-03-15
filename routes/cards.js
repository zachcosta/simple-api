const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('We are on the cards page!');
})

router.post('/', (req) => {
    console.log(req.body);
})

module.exports = router;