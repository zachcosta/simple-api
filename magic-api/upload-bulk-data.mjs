import Card from "../models/CardSchema.js";

const fileLocation = "card-data/test-cards.json";
import fs from 'fs';
import JSONStream from "JSONStream"
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');

stream.pipe(parser);

export function iterateOnCards() {
    let cardResults = new Promise((resolve) => {
        let results = [];

        parser.on('data', function (data) {
            // if (data.name.replace(/\s/g, "").toLowerCase().includes(query) && data.reprint === false) {
            //     let returnText = `${data.set} # ${data.collector_number} - ${data.name}`
            //     results.push(returnText);
            // }
            const card = async (e) => {
                return Card.create(data);
            }
        });

        stream.on('end', function () {
            console.log(results);
            // resolve(results);
        })
    })

    // cardResults.then(function(value) {
    //     value.forEach((result) => {
    //         console.log(result);
    //     })
    // })
}

iterateOnCards();