const axios = require('axios');
const fs = require('fs');

const fileLocationBulk = "card-data/card-output.json";
const fileLocationSets = "card-data/set-data.json";

const bulkType = 'default_cards';
const urlBulk = 'https://api.scryfall.com/bulk-data';
const urlSets = 'https://api.scryfall.com/sets';

async function downloadThenUpdateCardData() {
    const downloadUrl = await getDownloadUrl();
    console.log(`Url retrieved as ${downloadUrl}, downloading data`)
    const fileDownloaded = await downloadFile(downloadUrl, fileLocationBulk);
    if (fileDownloaded) {
        console.log('Download finished. Exiting process now');
    } else {
        console.log('There was an error downloading the file.')
    }
    process.exit();
}

function getDownloadUrl () {
    console.log('Getting download url for bulk data')
    return axios.get(urlBulk)
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

// downloadThenUpdateCardData();
getAPIData(urlSets, fileLocationSets);