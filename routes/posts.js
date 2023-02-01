const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('We are on the posts page!');
})

router.get('/specific', (req,res) => {
    res.send('This is very specific');
})

module.exports = router;