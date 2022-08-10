const fileLocation = "card-data/card-output.json";
const fs = require('fs'),
    JSONStream = require('JSONStream');
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');
let returnCount = 0;

stream.pipe(parser);

function searchAllCards() {
    parser.on('data', function (data) {
        if (data.name.replace(/\s/g, "").toLowerCase().includes("dwell") && data.reprint === false) {
            console.log(data.name);
            console.log(`${data.set} # ${data.collector_number} - ${data.name}`);
            returnCount++
        }
    });

    stream.on('end', function () {
        console.log(returnCount);
    })
}

searchAllCards();