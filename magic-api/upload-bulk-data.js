import dotenv from 'dotenv'
dotenv.config();

const t0 = performance.now();

import mongoose from "mongoose";
const dbUrl = process.env.MONGODB_URL;
const fileLocation = "card-data/card-output.json";
import {createCardObject, iterateOnObjects, makeConnection} from "../utils/mongoose-utils.js";

makeConnection(dbUrl).then((Card) => {
    console.log('Opening filestream. Please be patient!')
    iterateOnObjects(fileLocation).then(function(returnedPromise) {
        let results = returnedPromise[0],
            t1 = returnedPromise[1];
        console.log(`${results.length} cards found! Beginning upload now.`)
        let i = 0;
        results.forEach((result) => {
            createCardObject(result, Card).then(() => {
                i++
                if (i % 2500 === 0 && i < results.length) {
                    console.log(`Uploaded ${i} out of ${results.length} (${Math.round((i / results.length) * 100)}%)`);
                } else if (i >= results.length) {
                    const t2 = performance.now();
                    console.log("All cards uploaded!");
                    console.log(`Scanning file took ${Math.round((t1 - t0)/1000)} seconds`);
                    console.log(`Uploading data took ${Math.round((t2 - t1)/1000)} seconds`);
                    console.log(`Full script took ${Math.round((t2 - t0)/1000)} seconds`);
                    mongoose.connection.close().then(() => {
                        console.log('Database connection terminated. Have a good one!')
                    }).then(() => {
                        process.exit();
                    })
                }
            });
        })
    })
})