const fileLocation = "card-data/card-output.json";
import fs from 'fs';
import JSONStream from "JSONStream";
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');

const searchQuery = 'dwell';
let totalCards = 0;
let rixCount = 0;

stream.pipe(parser);

export function searchAllCards(query) {
    let cardResults = new Promise((resolve) => {
        let results = [];

        parser.on('data', function (data) {
            if (data.name.replace(/\s/g, "").toLowerCase().includes(query) && data.reprint === false) {
                let returnText = `${data.set} # ${data.collector_number} - ${data.name}`
                results.push(returnText);
            }
            totalCards++;
        });

        stream.on('end', function () {
            console.log(`We found ${results.length} matches out of ${totalCards} cards!`);
            resolve(results);
        })
    })

    cardResults.then(function(value) {
        console.log(`Rivals of Ixalan includes ${rixCount} cards`)
        value.forEach((result) => {
            console.log(result);
        })
    }).then(() => {
        process.exit();
    })
}

console.log(`Sure thing! Searching for ${searchQuery} now. Hang tight, this can take a few seconds...`);
searchAllCards(searchQuery);