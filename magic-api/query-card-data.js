import dotenv from 'dotenv'
dotenv.config();

const dbUrl = process.env.MONGODB_URL;
import {getConnection, makeConnection, queryCards} from "../utils/mongoose-utils.js";

await makeConnection(dbUrl);

getConnection().then((Card) => {
    console.log('Opening filestream. Please be patient!')
    const query = { name: /dwell/i, reprint: false, booster: true }
    queryCards(query, Card).then(cards => {
        console.log(`Found ${cards.length} cards containing "dwell"`)
        cards.forEach(card => {
            console.log(`"${card.name}" (${card.set} # ${card.collector_number})`);
        })
    }).then(() => {
        process.exit();
    })
})