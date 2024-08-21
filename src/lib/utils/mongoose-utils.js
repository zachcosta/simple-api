import mongoose from "mongoose";
import {CardSchema} from "../models/CardSchema.js";
import fs from "fs";
import JSONStream from "JSONStream";

let dbConnection;

export async function makeConnection(dbUrl) {
    console.log('Connecting to DB now...')
    const conn = await mongoose.connect(dbUrl);
    console.log('Successfully connected!')
    dbConnection = conn.model('cards', CardSchema);
}

export async function getConnection() {
    return dbConnection;
}

export function iterateOnObjects(fileLocation) {
    return new Promise((resolve) => {
        let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
            parser = JSONStream.parse('*');

        stream.pipe(parser);

        let results = [];

        stream.on('start', function () {
            console.log('Running through all objects, please be patient!')
        })

        parser.on('data', function (data) {
            results.push(data);
        });

        stream.on('end', function () {
            console.log('All objects gathered!');
            resolve([results, performance.now()]);
        })
    });
}

export async function createCardObject(data, CardSchema) {
    let card = await CardSchema.findOneAndUpdate(
        {_id: data.id},
        {
            _id: data.id,
            oracle_id: data.oracle_id,
            name: data.name,
            set: data.set,
            collector_number: data.collector_number,
            reserved: data.reserved,
            promo: data.promo,
            variant: data.variant,
            reprint: data.reprint,
            frame: data.frame_effects,
            frame_effects: data.frame_effects,
            finishes: data.finishes,
            layout: data.layout,
            promo_types: data.promo_types,
            booster: data.booster
        },
        {upsert: true, new: true});
    return card;
}

export async function queryCards(query, Collection) {
    console.log('Querying DB for cards, please be patient...');
    return await Collection.find(query);
}

export async function getUniqueValues(field, Collection) {
    console.log(`Finding all unique values for the ${field} field`);
    return await Collection.distinct(field);
}