const request = require('request');
const fs = require('fs');
const input = process.argv.slice(2, 4);
const siteUrl = input[0];
const filePathForSaving = input[1];

const fetchFileFromUrl = (url, callback) => {
  request(url, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      callback(`HTTP Error: ${response.statusCode}`, null);
    } else {
      callback(null, body);
    }
  });
}

const saveFileToLocal = (filePath, data, callback) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

fetchFileFromUrl(siteUrl, (fetchErr, body) => {
  if (fetchErr) {
    console.error('Error fetching the file:', fetchErr);
  } else {
    console.log('File fetched successfully. Body Size:', body.length, 'Bytes');

    saveFileToLocal(filePathForSaving, body, (saveErr) => {
      if (saveErr) {
        console.error('Error saving the file:', saveErr);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${filePathForSaving}`);
      }
    });
  }
});
