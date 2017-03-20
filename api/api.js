var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var path = require('path');
var fs = require('fs');
var app = express();

var pathJsonFile = path.join(__dirname, '/json/translate/');
var pathApi = '/api';
jsonfile.spaces = 2;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
  res.send('Hello Node !');
});

app.get(pathApi +'/create/:lang', function (req, res) {
  var file = pathJsonFile + req.params.lang + '.json';
  var obj = {};

  jsonfile.writeFile(file, obj, function (err) {
    if (err) { console.error('Error on create json file', err); };
    res.sendStatus(200)
  })
});

app.get(pathApi + '/list-lang', function (req, res) {
  fs.readdir(pathJsonFile, function (err, files) {
    if (err) { throw err; }

    var langs = { listLangs: []};
    files.forEach(function (file) {
      langs.listLangs.push(file.substring(0, 2));
    });

    res.send(langs);
  });
});

app.listen(3000, function () {
  console.log('Api listening on port 3000 !');
});
