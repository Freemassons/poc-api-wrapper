var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const nasaKey = process.env.NASAKEY;
  const https = require('https');

  endpoint = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaKey;

  https.get(endpoint, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.write('<html><head></head><body>');
      res.write('<p>' + JSON.parse(data).explanation + '</p>');
      res.end('</body></html>');
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

module.exports = router;
