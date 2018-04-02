const http = require('http');
const express = require('express');

const app = express();

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const path = require('path'); // eslint-disable-line global-require
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  // Serve the HTML file included in the CRA client
  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}


//app.get('/', (request, response) => {
//  response.send('Hello World');
//});

const server = http.createServer(app).listen(process.env.PORT || 5042);
console.log('Listening on port %d', server.address().port);
