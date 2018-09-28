const cheerio = require('cheerio');
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs')
const request = require('request');
const router = express.Router();

const MAX_QUOTES = 10;
const url = 'https://www.goodreads.com/author/quotes/1244.Mark_Twain';

router.get('/', (req, res) => {
  // fetch, parse, and send quotes from goodreads to our frontend
  fetchQuotes = (done) => {
    fetch(url)
      .then(res => res.text())  // need to run text() method on fetch response in order for Cheerio to parse the results
      .then(body => {
        const $ = cheerio.load(body);
        // find each quote based on class name, then loop through the results, storing quote text, tags, and likes into
        // individual objects. push all objects to a quotes array, and return the array to our frontend for display in the UI.
        const quotes = $('.quote').map( (index, quote) => {
          if (index < MAX_QUOTES) {
            return {
              quoteText: $(quote).find('.quoteText').text().match(/“(.*?)”/g)[0],
              quoteTags: $(quote).find('.greyText').text().trim().match(/\s\w+/g),
              quoteLikes: $(quote).find('.right').text().trim()
            }
          }
        }).get()
        
        // write results to a file. note: this data will also be returned to the front-end for display on the UI.
        fs.writeFile('./goodreads_quotes_output.txt', JSON.stringify(quotes, null, 2), function(err) {
          if(err) { return console.log(err); }
        });

        // resolve promise
        return done(quotes);
      })
      .catch(err => console.log('error fetching from goodreads:', err));
  }

  fetchQuotes(quotes => {
    // send quotes array to the frontend to display in the UI.
    res.send(quotes);
  });
})

module.exports = router;