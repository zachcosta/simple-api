// const axios = require('axios');
import axios from 'axios'
import fs from 'fs'
// const fs = require('fs');

const fileLocationBulk = "card-data/card-output.json";
const fileLocationSets = "card-data/set-data.json";

const bulkType = 'default_cards';
const urlBulk = 'https://api.scryfall.com/bulk-data';
const urlSets = 'https://api.scryfall.com/sets';

async function downloadThenUpdateCardData(urlToGet, fileToFill) {
    const downloadUrl = await getDownloadUrl(urlToGet);
    console.log(`Url retrieved as ${downloadUrl}, downloading data`)
    const fileDownloaded = await downloadFile(downloadUrl, fileToFill);
    if (fileDownloaded) {
        console.log('Download finished. Exiting process now');
    } else {
        console.log('There was an error downloading the file.')
    }
}

function getDownloadUrl (urlToGet) {
    console.log('Getting download url for bulk data')
    return axios.get(urlToGet)
        .then(function (resp) {
            return new Promise((resolve) => {
                resp.data.data.forEach(dataSet => {
                    if (dataSet.type === bulkType) {
                        console.log(dataSet);
                        resolve(dataSet.download_uri);
                    }
                });
            })
        });
}

function downloadFile(fileUrl, outputPath) {
    const writer = fs.createWriteStream(outputPath);
    console.log(fileUrl);
    console.log(outputPath);

    return axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream'
    }).then(resp => {
        return new Promise((resolve, reject) => {
            resp.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error =err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
            })
        })
    })
}

function getAPIData(endpoint, outputPath) {
   return axios({
        method: 'GET',
        url: endpoint
    }).then(resp => {
       fs.writeFileSync(outputPath, JSON.stringify(resp.data))
   })
}

await downloadThenUpdateCardData(urlBulk, fileLocationBulk);
await downloadThenUpdateCardData(urlSets, fileLocationSets);

process.exit();

// getAPIData(urlSets, fileLocationSets);