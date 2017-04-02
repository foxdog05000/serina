var express = require('express')
var bodyParser = require('body-parser')
var jsonfile = require('jsonfile')
var path = require('path')
var fs = require('fs')
var app = express()

var pathJsonFile = path.join(__dirname, '/json/translate/')
var pathApi = '/api'
jsonfile.spaces = 2

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())

function readFile (lang) {
  var file = pathJsonFile + lang + '.json'
  jsonfile.readFile(file, function (req, obj) {
    return obj
  })
}

app.get('/', function (req, res) {
  res.send('Hello Node !')
})

app.get(pathApi + '/list-lang', function (req, res) {
  fs.readdir(pathJsonFile, function (err, files) {
    if (err) { throw err }

    var langs = { listLangs: [] }
    files.forEach(function (file) {
      langs.listLangs.push(file.substring(0, 2))
    })

    res.send(langs)
  })
})

app.get(pathApi + '/create/:lang', function (req, res) {
  var file = pathJsonFile + req.params.lang + '.json'
  var obj = {}

  jsonfile.writeFile(file, obj, function (err) {
    if (err) { return console.log('Error on create json file', err) }
    res.sendStatus(200)
  })
})

app.get(pathApi + '/delete/:lang', function (req, res) {
  fs.stat(pathJsonFile + req.params.lang + '.json', function (err, stats) {
    if (err) { return console.error(err) }

    fs.unlink(pathJsonFile + req.params.lang + '.json', function (err) {
      if (err) { return console.log(err) }
      console.log('file "' + req.params.lang + '.json" deleted successfully')
      res.sendStatus(200)
    })
  })
})

app.get(pathApi + '/open/:lang', function (req, res) {
  res.sendFile(pathJsonFile + req.params.lang + '.json')
})

app.get(pathApi + '/:lang/group/:groupName/add', function (req, res) {
  var groupName = req.params.groupName
  var file = pathJsonFile + req.params.lang + '.json'
  jsonfile.readFile(file, function (req, obj) {
    obj[groupName] = {}
    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on add group name on json file', err) }
      res.sendStatus(200)
    })
  })
})

app.post(pathApi + '/:lang/trad/add', function (req, res) {
  var trad = req.body
  var file = pathJsonFile + req.params.lang + '.json'
  jsonfile.readFile(file, function (req, obj) {
    obj[trad.key] = trad.trad
    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on add group name on json file', err) }
      res.sendStatus(200)
    })
  })
})

app.listen(3000, function () {
  console.log('Api listening on port 3000 !')
})
