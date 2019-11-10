const parser = require('csv-parse');
const fs = require('fs');
const latlng = require('../services/utm_to_latlng');

const results = [];

const ws = fs.createWriteStream('../data/crime.json')

fs.createReadStream('./crimedata_csv_all_years/crimedata_csv_all_years.csv')
.pipe(parser())
.on('data', (data) => {
    const weight = data[0] === 'Vehicle Collision or Pedestrian Struck (with Injury)' ?
        3 : 1;
    const {lat, lng} = latlng(data[8], data[9], 10, false);
    if (lat && lng) {
        results.push({lat,lng,weight})
    }
    })
.on('end', () => {
    console.log(results.length)
    ws.write(`${JSON.stringify(results, null, 2)}`)
});


ws.write(`${results}`)