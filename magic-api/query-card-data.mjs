import dotenv from 'dotenv'
dotenv.config();

const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.12mxfzp.mongodb.net/magic-cards?retryWrites=true&w=majority`;
import {makeConnection, queryCards} from "./utils/mongoose-utils.mjs";

makeConnection(dbUrl).then((Card) => {
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