//BTC API 
const Request = require('request');
const fs = require('fs');
const crone = require('node-cron');
const express = require('express');
const app = express();
const bcrypt=require('bcrypt');
const plainTextPassword1 = "DFGh5546*%^__90";

for (let saltRounds = 10; saltRounds < 21; saltRounds++) {
  console.time(`time to hash`);
  bcrypt.hash(plainTextPassword1, saltRounds);
  console.timeEnd(`time to hash`);
}

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
// crone.schedule('*/10 * * * * *', () => {
//     Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log(JSON.stringify(response.body));
//         fs.appendFileSync('23.txt', '\n'+ JSON.stringify(response.body));
//     });
// })

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

