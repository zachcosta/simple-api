import dotenv from 'dotenv'
dotenv.config();

const dbUrl = process.env.MONGODB_URL;
import {makeConnection, getUniqueValues} from "#utils/mongoose-utils.mjs";

makeConnection(dbUrl).then((CardCollection) => {
    console.log('Opening filestream. Please be patient!')
    const field = 'promo_types'
    getUniqueValues(field, CardCollection).then(uniqueValues => {
        console.log(`Found ${uniqueValues.length} different values for the ${field} field`)
        uniqueValues.forEach(value => {
            console.log(value);
        })
    }).then(() => {
        process.exit();
    })
})