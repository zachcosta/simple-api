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

app.listen(3000, () => {
    console.log("Now listening on port 3000!")
});