const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

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


app.use(bodyParser.text());

// complementary to the POST request in FileUpload.js
app.post('/submissions', (request, response) => {
  console.log('server post triggered');
  console.log(request.body);

  fs.writeFile('samplePython.py', request.body, (err) => {
  	if(err) throw err;
  	console.log('The file has been saved!');
  });

  var exec = require('child_process').exec, child;
  //runs command line
  child = exec('pylint ./samplePython.py --output-format=json > testOutput.json',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });

  // CHANGE THIS RESPONSE!!!
  response.send(request.body);
});


const server = http.createServer(app).listen(process.env.PORT || 5042);
console.log('Listening on port %d', server.address().port);
