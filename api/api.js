let express = require('express')
let bodyParser = require('body-parser')
let jsonfile = require('jsonfile')
let path = require('path')
let fs = require('fs')
let app = express()

let pathJsonFile = path.join(__dirname, '/json/translate/')
let pathApi = '/api'
jsonfile.spaces = 2

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())

function isDefined (value) { return value !== undefined }

function createFolderIsNotExist (pathFolder) {
  if (!fs.existsSync(path.join(__dirname, pathFolder))) {
    fs.mkdir(path.join(__dirname, pathFolder), function (err) {
      if (!err || (err && err.code === 'EEXIST')) {
        console.log('Successful creation for the', pathFolder, 'folder on path', __dirname)
      } else {
        console.log('Error on create folder', pathFolder, 'on path', __dirname, err)
      }
    })
  }
}

function searchGroup (obj, groups, value, action, i) {
  for (let key in obj) {
    if (key === groups[i]) {
      if (key === groups[i] && i === groups.length - 1) {
        if (action === 'add' || action === 'upd') {
          if (typeof value === 'object') {
            obj[key][value.key] = value.trad
          } else {
            obj[key][value] = {}
          }
          return obj
        } else if (action === 'del') {
          if (typeof value === 'object') {
            delete obj[key][value.key]
          } else {
            delete obj[key][value]
          }
          return obj
        }
      }
      i++
      searchGroup(obj[key], groups, value, action, i)
    }
  }
}

createFolderIsNotExist('/json/')
createFolderIsNotExist('/json/translate/')

app.get('/', function (req, res) {
  res.send('Hello Node !')
})

app.get(pathApi + '/list-lang', function (req, res) {
  fs.readdir(pathJsonFile, function (err, files) {
    if (err) { throw err }

    let langs = { listLangs: [] }
    files.forEach(function (file) {
      langs.listLangs.push(file.substring(0, 2))
    })

    res.send(langs)
  })
})

app.get(pathApi + '/create/:lang', function (req, res) {
  let file = pathJsonFile + req.params.lang + '.json'
  let obj = {}

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

app.post(pathApi + '/:lang/group/add', function (req, res) {
  let groups = isDefined(req.body.groups) ? req.body.groups.split('/') : undefined
  let file = pathJsonFile + req.params.lang + '.json'
  jsonfile.readFile(file, function (err, obj) {
    if (err) { console.log('Error on read json file', err) }
    if (!isDefined(groups)) {
      obj[req.body.groupName] = {}
    } else {
      let i = 0
      searchGroup(obj, groups, req.body.groupName, 'add', i)
    }
    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on add group name on json file', err) }
      res.sendStatus(200)
    })
  })
})

app.post(pathApi + '/:lang/group/del', function (req, res) {
  let groups = isDefined(req.body.groups) ? req.body.groups.split('/') : undefined
  let file = pathJsonFile + req.params.lang + '.json'
  jsonfile.readFile(file, function (err, obj) {
    if (err) { console.log('Error on read json file', err) }
    if (!isDefined(groups)) {
      delete obj[req.params.groupName]
    } else {
      let i = 0
      searchGroup(obj, groups, req.body.groupName, 'del', i)
    }
    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on delete group name on json file', err) }
      res.sendStatus(200)
    })
  })
})

app.post(pathApi + '/:lang/trad/add', function (req, res) {
  let trad = req.body.trad
  let groups = isDefined(req.body.groups) ? req.body.groups.split('/') : undefined
  let file = pathJsonFile + req.params.lang + '.json'
  jsonfile.readFile(file, function (err, obj) {
    if (err) { console.log('Error on read json file', err) }
    if (!isDefined(groups)) {
      obj[trad.key] = trad.trad
    } else {
      let i = 0
      searchGroup(obj, groups, trad, 'add', i)
    }
    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on add trad on json file', err) }
      res.sendStatus(200)
    })
  })
})

app.post(pathApi + '/:lang/trad/del', function (req, res) {
  let trad = req.body.trad
  let groups = isDefined(req.body.groups) ? req.body.groups.split('/') : undefined
  let file = pathJsonFile + req.params.lang + '.json'
  jsonfile.readFile(file, function (err, obj) {
    if (err) { console.log('Error on read json file', err) }
    if (!isDefined(groups)) {
      delete obj[trad.key]
    } else {
      let i = 0
      searchGroup(obj, groups, trad, 'del', i)
    }
    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on delete trad on json file', err) }
      res.sendStatus(200)
    })
  })
})

let server = app.listen(3000, 'localhost', function () {
  console.log('API listen on ' + server.address().address + ':' + server.address().port + ' !')
})
