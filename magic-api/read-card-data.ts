const fileLocation = "card-data/card-output.json";
const fs = require('fs'),
    JSONStream = require('JSONStream');
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');
let returnCount = 0;
let cardResults: any[] = [];

stream.pipe(parser);

export function searchAllCards(query: string) {
    return new Promise((resolve) => {
        parser.on('data', function (data: any) {
            if (data.name.replace(/\s/g, "").toLowerCase().includes(query) && data.reprint === false) {
                cardResults.push(data);
            }
        });

        stream.on('end', function () {
            resolve(cardResults);
        })
    })
}

// export function testFunction() {
//     console.log('This is a test')
// }

// searchAllCards('dwell');