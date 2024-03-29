// IMPORTS
import dotenv from "dotenv";
import express from "express";
import * as mongoose from 'mongoose';
import * as Card from './models/CardSchema.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + '/';
const app = express();

// VARIABLES
console.log(process.env.MONGODB_USERNAME)
const dbUrl = process.env.MONGODB_URL;

app.use(express.json())
// app.use(express.static('public'));

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
    res.sendFile(__dirname + 'index.html');
})

app.get('/src/search-page.js', (req,res) => {
    res.sendFile(__dirname + 'src/search-page.js');
})

app.get('/models/CardSchema.mjs', (req,res) => {
    res.sendFile(__dirname + 'models/CardSchema.js');
})

app.get('/cards/search', async (req, res) => {
    try {
        const cards = await Card.find({});
        res.status(200).json(cards)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// app.get('/card', async (req, res) => {
//     try {
//         const cards = await Card.find({});
//         res.status(200).json(cards)
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })
//
// app.get('/card/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const card = await Card.findById(id);
//         res.status(200).json(card)
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })
//
// app.post('/card', async (req, res) => {
//     try {
//         const card = await Card.create(req.body);
//         res.status(200).json(card);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message})
//     }
// })
//
// app.put('/card/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const card = await Card.findByIdAndUpdate(id, req.body);
//         if (!card) {
//             res.status(404).json({message: `Cannot find product with ID ${id}.`})
//         }
//         const updatedCard = await Card.findById(id);
//         res.status(200).json(updatedCard)
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })
//
// app.delete('/card/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const card = await Card.findByIdAndDelete(id);
//         if (!card) {
//             res.status(404).json({message: `Cannot find product with ID ${id}.`})
//         }
//         res.status(200).json(card)
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })

app.listen(3000, () => {
    console.log("Now listening on port 3000!")
});