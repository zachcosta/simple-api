// IMPORTS
import dotenv from "dotenv";
import express from "express";
import _ from "lodash";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {getConnection, makeConnection, queryCards} from "./lib/utils/mongoose-utils.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + '/';
const app = express();

// VARIABLES
console.log(process.env.MONGODB_USERNAME)
const dbUrl = process.env.MONGODB_URL;

app.use(express.json());

await makeConnection(dbUrl);

getConnection().then((Card) => {
    console.log("Awaiting database queries...");
    const query = { name: /dwell/i, reprint: false, booster: true }
    queryCards(query, Card).then(cards => {
        console.log(`Found ${cards.length} cards containing "dwell"`)
        cards.forEach(card => {
            console.log(`"${card.name}" (${card.set} # ${card.collector_number})`);
        })
    })
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '../dist/index.html');
})

app.get('/src/search-page.js', (req,res) => {
    res.sendFile(__dirname + 'src/search-page.js');
})

app.get('/models/CardSchema.js', (req,res) => {
    res.sendFile(__dirname + 'models/CardSchema.js');
})

app.get('/utils/mongoose-utils', (req,res) => {
    res.sendFile(__dirname + 'utils/mongoose-utils.js');
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