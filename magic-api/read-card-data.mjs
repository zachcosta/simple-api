const fileLocation = "card-data/card-output.json";
import fs from 'fs';
import JSONStream from "JSONStream"
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');

stream.pipe(parser);

export function searchAllCards(query) {
    let cardResults = new Promise((resolve) => {
        let results = [];

        parser.on('data', function (data) {
            if (data.name.replace(/\s/g, "").toLowerCase().includes(query) && data.reprint === false) {
                let returnText = `${data.set} # ${data.collector_number} - ${data.name}`
                results.push(returnText);
            }
        });

        stream.on('end', function () {
            console.log(`We found ${results.length} cards!`);
            resolve(results);
        })
    })

    cardResults.then(function(value) {
        value.forEach((result) => {
            console.log(result);
        })
    })
}

searchAllCards('dwell');