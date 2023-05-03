import Card from "../models/CardSchema.js";
// require('dotenv').config();

// import mongoose from "mongoose";
// const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/?retryWrites=true&w=majority`;
const fileLocation = "card-data/card-output.json";
import fs from 'fs';
import JSONStream from "JSONStream"
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');

// const conn = await mongoose.createConnection(dbUrl).
// asPromise();
// conn.readyState; // 1, means Mongoose is connected

stream.pipe(parser);

export function iterateOnCards() {
    return new Promise((resolve) => {
        let results = [];

        parser.on('data', function (data) {
            results.push(data)
        });

        stream.on('end', function () {
            // console.log(results[0]);
            resolve(results);
        })
    });
}

iterateOnCards().then(function(value) {
    console.log(value.length)
    // value.forEach((result) => {
    //     console.log(result.name);
    // })
});