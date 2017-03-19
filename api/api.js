var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var path = require('path');
var app = express();

var pathJsonFile = path.join(__dirname, '/json/translate/');
jsonfile.spaces = 2;

app.get('/', function (req, res) {
  res.send('Hello Node !');
});

app.get('/create/:lang', function (req, res) {
  var file = pathJsonFile + req.params.lang + '.json';
  var obj = {};

  jsonfile.writeFile(file, obj, function (err) {
    if (err) { console.error('Error on create json file', err); };
    res.sendStatus(200)
  })
});

app.listen(3000, function () {
  console.log('Api listening on port 3000 !');
});
