const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...


app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  const random=pickFromArray(quotes);
  response.send(random);
});

app.get("/one", function (request, response) {
  response.send("You asked for route /one");
});

app.get("/two", function (request, response) {
  response.send("You asked for route /two");
});

app.get("/quotes/search", function (request, response) {
  const searchQuotes= request.query.term.toLowerCase();
  if (!searchQuotes){
    response.send("Falta el parametro")
  }
  
  const quoteFilter=quotes.filter(quote =>{
    const quotePhrase= quote.quote;
    const quoteAuthor= quote.author;
    console.log(quotePhrase);
    return quotePhrase.includes(searchQuotes) || quoteAuthor.includes(searchQuotes);
  })
  response.send(quoteFilter);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
