//REQUIRE PACKAGES
require('dotenv').config();
const express = require('express');
const {MongoClient} = require("mongodb");

//STARTING SERVICES
const app = express();
const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(dbUrl);

//IMPORT ROUTES
const postsRoute = require('./routes/posts');
const cardsRoute = require('./routes/cards');

app.use('/posts', postsRoute);
app.use('/cards', cardsRoute);

// ROUTES
app.get('/', (req,res) => {
    res.send('We are home!');
})

//CONNECT TO DB
dbClient.connect().then(() => {
    console.log('You have successfully connected!')
})

// STARTING SERVER
app.listen(3000);