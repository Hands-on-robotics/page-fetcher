const request = require('request');
const fs = require('fs');
const input = process.argv.slice(2, 4);
const siteUrl = input[0];
const filePathForSaving = input[1];

// uses request() and then a callback function to handle body
const fetchingFileFromURL = function(siteUrl, callback) {
  // only body is needed.
  request(siteUrl, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      callback(filePathForSaving, body);
    }
  });
};

// uses fs.write to write the file on local
const saveFileToLocal = (filePathForSaving, body) => {
  fs.writeFile(filePathForSaving, body, err => {
    if (err) {
      console.error(err);
    } else {
      // uses fs.stat to show file size
      fs.stat(filePathForSaving, (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          const fileSize = stats.size;
          console.log(`Downloaded and saved ${fileSize} bytes to ${filePathForSaving}`);
        }
      });
    }
  });
};

fetchingFileFromURL(siteUrl,saveFileToLocal);
