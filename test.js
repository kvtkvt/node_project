//BTC API 
var Request = require("request");
setInterval( function(){

Request.get("https://api.cryptonator.com/api/ticker/btc-usd", (error, response) => {
    if(error) {
        return console.log(error);
    }
    //console.log('connected');
    //console.log(response.body);
    console.log(JSON.parse(response.body));
});
},10000);