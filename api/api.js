var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello Node !');
});

app.listen(3000, function () {
  console.log('Api listening on port 3000 !');
});
