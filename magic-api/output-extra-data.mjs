const fileLocation = "card-data/card-output.json";
import fs from 'fs';
import JSONStream from "JSONStream"
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');
let arrayFrameEffects = [];
let arrayFinishes = [];
let arrayPromoTypes = [];

stream.pipe(parser);

export function getAllFrameTypes() {
    let cardResults = new Promise((resolve) => {
        parser.on('data', function (data) {
            if (data.frame_effects) {
                data.frame_effects.forEach((item) => {
                    if (!arrayFrameEffects.includes(item)) {
                        console.log(item);
                        arrayFrameEffects.push(item);
                    }
                });
            }
            if (data.finishes) {
                data.finishes.forEach((item) => {
                    if (!arrayFinishes.includes(item)) {
                        console.log(item);
                        arrayFinishes.push(item);
                    }
                });
            }
            if (data.promo_types) {
                data.promo_types.forEach((item) => {
                    if (!arrayPromoTypes.includes(item)) {
                        console.log(item);
                        arrayPromoTypes.push(item);
                    }
                });
            }
        });

        stream.on('end', function () {
            console.log(`We found ${arrayFrameEffects.length} frame effects!`);
            console.log(arrayFrameEffects);
            console.log(arrayFinishes);
            console.log(arrayPromoTypes);
            resolve(results);
        })
    })

    cardResults.then(function(value) {
        value.forEach((result) => {
            console.log(result);
        })
    })
}

getAllFrameTypes();