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

// complementary to the POST request in FileUpload.js
app.post('/submissions', (request, response) => {
  console.log('server post triggered');
  const test = request.body;
  // Obtain file data from the request
  // Create a temporary file with the request body contents
  // fs.mkdtemp
  // Run pylint with that temporary
  // Read in the result file and set if back
  // Process run pylint

  // file encapsulated as a form
  response.send(test);
  console.log(test);
});

const server = http.createServer(app).listen(process.env.PORT || 5042);
console.log('Listening on port %d', server.address().port);
