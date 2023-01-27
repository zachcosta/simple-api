const express = require('express');

const app = express();

// MIDDLEWARES
app.use('/posts', () => {
    console.log('Kept ya waiting, huh?');
})

// ROUTES
app.get('/', (req,res) => {
    res.send('We are home!');
})

app.get('/posts', (req,res) => {
    res.send('We are on the posts page!');
})


// STARTING SERVER
app.listen(3000);