const request = require('request');
const fs = require('fs');
const input = process.argv.slice(2, 4);
const siteUrl = input[0];
const filePathForSaving = input[1];

// This function will call savingFileToLocal
const fetchingFileFromURL = function(siteUrl, callback) {
  request(siteUrl, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      callback(filePathForSaving, body);
    }
  });
};

// To call in fetching file
const saveFileToLocal = (filePathForSaving, body) => {
  fs.writeFile(filePathForSaving, body, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(fs.body.Stats)
      console.log(`Downloaded and saved ${body.length} bytes to ${filePathForSaving}`);
    }
  });
};

fetchingFileFromURL(siteUrl,saveFileToLocal);



//request();

// layout
// request file body
// fs.write(fileBody);
// console.log(Downloaded and saved 32891 bytes to index.js)

// Takes in two arguments
// 1. url
// 2. local file path

// console logs message "Downloaded and saved 3294 bytes to ./index.html"

// Two asynchronous operations
// make http request and wait for response.
// upon connection take data and write it into your local file system.

