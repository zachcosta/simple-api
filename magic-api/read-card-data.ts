const fileLocation = "card-data/card-output.json";
const fs = require('fs'),
    JSONStream = require('JSONStream');
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');

stream.pipe(parser);

export function searchAllCards(query: string) {
    let results: string[] = [];

    parser.on('data', function (data: any) {
        if (data.name.replace(/\s/g, "").toLowerCase().includes(query) && data.reprint === false) {
            let returnText = `${data.set} # ${data.collector_number} - ${data.name}`
            console.log(returnText);
            results.push(returnText);
        }
    });

    stream.on('end', function () {
        console.log(`We found ${results.length} cards!`);
    })

    return results
}

searchAllCards('dwell')
    .forEach((result: string) => {
        console.log('Test inside forEach');
        console.log(result);
})