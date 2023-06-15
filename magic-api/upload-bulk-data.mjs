import CardSchema from "../models/CardSchema.js";
import dotenv from 'dotenv'
dotenv.config();

const t0 = performance.now();
let t1;

import mongoose from "mongoose";
const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/magic-cards?retryWrites=true&w=majority`;
const fileLocation = "card-data/card-output.json";
import fs from 'fs';
import JSONStream from "JSONStream"
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');
let Card;

console.log(dbUrl);

async function makeConnection() {
    const conn = await mongoose.connect(dbUrl);
    Card = conn.model('all_cards', CardSchema);
    console.log('Successfully connected!')
}

stream.pipe(parser);

export function iterateOnCards() {
    return new Promise((resolve) => {
        let results = [];

        stream.on('start', function () {
            console.log('Running through all cards, please be patient!')
        })

        parser.on('data', function (data) {
            results.push(data);
        });

        stream.on('end', function () {
            console.log('All cards gathered. Beginning uploads now...')
            t1 = performance.now();
            resolve(results);
        })
    });
}

makeConnection().then(() => {
    console.log('Opening filestream. Please be patient!')
    iterateOnCards().then(function(value) {
        console.log(value.length)
        let i = 0;
        value.forEach((result) => {
            createCardObject(result).then(() => {
                i++
                if (i >= value.length) {
                    const t2 = performance.now();
                    console.log("All cards uploaded!");
                    console.log(`Scanning file took ${Math.round((t1 - t0)/1000)} seconds`);
                    console.log(`Uploading data took ${Math.round((t2 - t1)/1000)} seconds`);
                    console.log(`Full script took ${Math.round((t2 - t0)/1000)} seconds`);
                    mongoose.connection.close().then(() => {
                        console.log('Database connection terminated. Have a good one!')
                    })
                }
            });
        })
    })
})

async function createCardObject(data) {
    let card = await Card.findOneAndUpdate(
        {_id: data.id},
        {
            _id: data.id,
            oracle_id: data.oracle_id,
            name: data.name,
            set: data.set,
            collector_number: data.collector_number
        },
        {upsert: true, new: true})
    console.log(`Uploading "${card.name}" (${card.set} # ${card.collector_number})`);
    return card;
}