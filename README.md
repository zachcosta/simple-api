# Magic API Project
An app to download, store, sort, and interact with Magic card data provided via [Scryfall](https://scryfall.com/docs/api).

## Available Commands
- `npm run get-bulk`: Will download the "default-cards" set of bulk data from Scryfall, then save it to `card-data/card-output.json`
- `npm run read-file`: Will iterate through `card-data/card-output.json`, attempting to return all cards with the word "Dwell" in their name. (Should currently return 11 cards)

## Things to look up
- Default routing for Node or React applications
- Possibly Bootstrap or Init
- NodeJS Breakpoints / Debugging
- Hosting platforms that allow large data sets
- Google Dev Account? [Sign up here](https://developers.google.com/)
  - Set up basic Google Auth for security
- Search Algorithm options
  - Bubble Sort
  - Merge Sort
  - Quick Sort
  - Red/Black Trees

### Current Dependencies
1) Runtime Level: These are needed to even start the scripts and develop the code
   1) `node` (version 16.14.0) - Runs JS code
   2) `npm` (version 8.5.3) - Node Package Manager, installs/removes packages
2) Dev Dependencies: Needed when writing the code, but NOT needed to actually run in production
   1) `nodemon` - Restarts scripts being run in node whenever a change is detected
   2) `typescript` - Adds additional syntax and functionality to JS, installed to gain support for the "export" term
   3) `ts-node` - Typescript would normally require compiling before I can run changes. TS-Node allows me to bypass this by compiling while running (??)
3) Dependencies: Add functionality, ARE needed to actually run in production
   1) `Axios` - Enables sending HTTP requests to REST APIs. Installed to let me get latest card data from Scryfall
   2) `body-parser` - Enables express to parse JSON data
   3) `Cors` - Cross-Origin Resource Sharing. Security feature, installed to limit where I accept requests from (??). Not currently in-use
   4) `Express` - Creates a basic HTTP server, so that I can serve files to my browser
   5) `JSONStream` - Creates a filestream that reads through JSON files efficiently. Installed to greatly reduce time spent searching through card data file
