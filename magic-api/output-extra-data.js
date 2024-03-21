const fileLocation = "card-data/card-output.json";
import fs from 'fs';
import JSONStream from "JSONStream"
let stream = fs.createReadStream(fileLocation, {encoding: 'utf8'}),
    parser = JSONStream.parse('*');
let arrayFrameEffects = [];
let arrayFinishes = [];
let arrayPromoTypes = [];
let arrayColors = [];
let arrayColorIDs = [];
let arrayLayout = [];
let arrayObject = [];

stream.pipe(parser);

export function getAllFrameTypes() {
    let cardResults = new Promise(() => {
        parser.on('data', function (data) {
            if (data.frame_effects) {
                data.frame_effects.forEach((item) => {
                    if (!arrayFrameEffects.includes(item)) {
                        console.log(`Frame: ${item}`);
                        arrayFrameEffects.push(item);
                    }
                });
            }
            if (data.finishes) {
                data.finishes.forEach((item) => {
                    if (!arrayFinishes.includes(item)) {
                        console.log(`Finish: ${item}`);
                        arrayFinishes.push(item);
                    }
                });
            }
            if (data.promo_types) {
                data.promo_types.forEach((item) => {
                    if (!arrayPromoTypes.includes(item)) {
                        console.log(`Promo: ${item}`);
                        arrayPromoTypes.push(item);
                    }
                });
            }
            if (data.colors) {
                data.colors.forEach((item) => {
                    if (!arrayColors.includes(item)) {
                        console.log(`Color: ${item}`);
                        arrayColors.push(item);
                    }
                });
            }
            if (data.color_identity) {
                data.color_identity.forEach((item) => {
                    if (!arrayColorIDs.includes(item)) {
                        console.log(`Color: ${item}`);
                        arrayColorIDs.push(item);
                    }
                });
            }
            if (!arrayLayout.includes(data.layout)) {
                console.log(`Layout: ${data.layout}`);
                arrayLayout.push(data.layout);
            }
            if (!arrayObject.includes(data.object)) {
                console.log(`Object: ${data.object}`);
                arrayObject.push(data.object);
            }
        });

        stream.on('end', function () {
            console.log(`We found ${arrayFrameEffects.length} frame effects!`);
            console.log(`Frame Effects: ${arrayFrameEffects}`);
            console.log(`Finishes: ${arrayFinishes}`);
            console.log(`Promo Types: ${arrayPromoTypes}`);
            console.log(`Colors: ${arrayColors}`);
            console.log(`Color IDs: ${arrayColorIDs}`);
            console.log(`Layouts: ${arrayLayout}`);
            console.log(`Object Types: ${arrayObject}`);

            // resolve(results);
        })
    })

    cardResults.then(function(value) {
        value.forEach((result) => {
            console.log(result);
        })
    })
}

getAllFrameTypes();