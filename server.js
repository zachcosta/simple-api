// IMPORTS
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Card = require('./models/CardSchema')
const app = express();

// VARIABLES
const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/Card-Tests?retryWrites=true&w=majority`;

app.use(express.json())

async function connect() {
    try {
        await mongoose.connect(dbUrl);
        console.log("You have successfully connected!");
    } catch (error) {
        console.error(error);
    }
}

connect().then(() => {
    console.log("Awaiting database queries...")
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

app.get('/card', async (req, res) => {
    try {
        const cards = await Card.find({});
        res.status(200).json(cards)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/card/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const card = await Card.findById(id);
        res.status(200).json(card)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/card', async (req, res) => {
    try {
        const card = await Card.create(req.body);
        res.status(200).json(card);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/card/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const card = await Card.findByIdAndUpdate(id, req.body);
        if (!card) {
            res.status(404).json({message: `Cannot find product with ID ${id}.`})
        }
        const updatedCard = await Card.findById(id);
        res.status(200).json(updatedCard)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/card/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const card = await Card.findByIdAndDelete(id);
        if (!card) {
            res.status(404).json({message: `Cannot find product with ID ${id}.`})
        }
        res.status(200).json(card)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(3000, () => {
    console.log("Now listening on port 3000!")
});