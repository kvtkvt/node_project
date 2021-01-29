//BTC API 
var Request = require('request');
var fs = require('fs');
var crone = require('node-cron');
// setInterval( function(){

// Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
//     if(error) {
//         return console.log(error);
//     }
//     //console.log('connected');
//     //console.log(response.body);
//     console.log(JSON.parse(response.body));
// });
// },10000);

// crone.schedule('*/10 * * * * *', () => {
//     console.log('5th second');
//     Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log(JSON.stringify(response.body));
//         fs.appendFileSync('23.txt', '\r\n new data ');
//         fs.appendFileSync('23.txt', JSON.stringify(response.body));
//     });
// })

Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
        if (error) {
            return console.log(error);
        }
        console.log(JSON.stringify(response.body));
        fs.appendFileSync('23.txt', '\r\n new data ');
        fs.appendFileSync('23.txt', JSON.stringify(response.body));
    });