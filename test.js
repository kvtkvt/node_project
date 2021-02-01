//BTC API 
var Request = require('request');
var fs = require('fs');
var crone = require('node-cron');
var express = require('express');
var app = express();

//fetch new data every 10 seconds.
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

// crone shedule for schedule file upload.
crone.schedule('*/10 * * * * *', () => {
    Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
        if (error) {
            return console.log(error);
        }
        console.log(JSON.stringify(response.body));
        fs.appendFileSync('23.txt', '\n'+ JSON.stringify(response.body));
    });
})

//request for api
// Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log(JSON.stringify(response.body));
//         fs.appendFileSync('23.txt', '\r\n new data ');
//         fs.appendFileSync('23.txt', JSON.stringify(response.body));
// });

// app.listen(3000);
// app.set('view engine','ejs');
// app.get('/',(req,res)=>{

//     setInterval( function(){
//         Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
//         if(error) {
//             return console.log(error);
//         }
//         console.log(JSON.parse(response.body));
//         res.render('about',{title:JSON.stringify(response.body)});    
//         });
//     },2000);
// })