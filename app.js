//REQUIRE PACKAGES
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const {MongoClient} = require("mongodb");
const fs = require('fs');

const cardsTest = JSON.parse(fs.readFileSync('./card-data/test-cards.json'));

//STARTING SERVICES
const app = express();
const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/?retryWrites=true&w=majority`;
const db = new MongoClient(dbUrl);

//IMPORT ROUTES
const postsRoute = require('./routes/posts');
const cardsRoute = require('./routes/cards');

app.use('/posts', postsRoute);
app.use('/cards', cardsRoute);

// ROUTES
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/dist/index.html');
})
app.get('/search-page', (req,res) => {
    res.sendFile(__dirname + '/dist/index.html');
})
app.get('/post-test', (req,res) => {
    res.send('Testing MongoDB POST request');
    axios.post(`https://data.mongodb-api.com/app/${process.env.MONGODB_API_APP_ID}/endpoint/data/v1/action/insertMany`, {
        'dataSource': process.env.MONGODB_CLUSTER_NAME,
        'database': "Magic-Cards-Test",
        "collection": "all-cards",
        "documents": cardsTest
    }, {
        headers: {
            'Content-Type': 'application/json',
            'apiKey': process.env.MONGODB_API_SECRET
        }
    }).catch(function (error) {
        console.log(error);
    })
})

//CONNECT TO DB
db.connect().then(() => {
    console.log('You have successfully connected!')
})

// STARTING SERVER
app.listen(3000);