const http = require('http');
const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

const server = http.createServer(app).listen(process.env.PORT || 5042);
console.log('Listening on port %d', server.address().port);