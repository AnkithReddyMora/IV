const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from a specified directory (e.g., 'public')
app.use(express.static('public'));

const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

https.createServer(options, app).listen(8080, () => {
  console.log('HTTPS server running on port 8080');
});
