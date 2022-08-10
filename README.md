# Magic API Project
An app to download, store, sort, and interact with Magic card data provided via [Scryfall](https://scryfall.com/docs/api).

## Available Commands
- `npm run get-bulk`: Will download the "default-cards" set of bulk data from Scryfall, then save it to `card-data/card-output.json`
- `npm run read-file`: Will iterate through `card-data/card-output.json`, attempting to return all cards with the word "Dwell" in their name. (Should currently return 11 cards)

## Things to look up
- Default routing for Node or React applications
- Possibly Bootstrap or Init
- NodeJS Breakpoints / Debugging

Currently using npm version 8.5.3
Currently using node version 16.14.0