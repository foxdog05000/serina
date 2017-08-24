let express = require('express')
let bodyParser = require('body-parser')
let jsonfile = require('jsonfile')
let path = require('path')
let fs = require('fs')
let app = express()

const pathJsonFile = path.join(__dirname, '/json/')
const pathApi = '/api'
jsonfile.spaces = 2

const ADD = 'add'
const UPD = 'upd'
const DEL = 'del'

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())

function isDefined (value) { return value !== undefined }
function isObject (value) { return typeof value === 'object' }

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

function targetLevelForAction (obj, levels, i, action, value, newValue) {
  for (let key in obj) {
    if (key === levels[i]) {
      if (key === levels[i] && i === levels.length - 1) {
        if (action === ADD || action === UPD) {
          if (isObject(value)) {
            obj[key][value.key] = value.trad
          } else {
            if (action === ADD) {
              obj[key][value] = {}
            } else {
              let copyContent = obj[key][value]
              delete obj[key][value]
              obj[key][newValue] = copyContent
            }
          }
          return obj
        } else if (action === DEL) {
          if (isObject(value)) {
            delete obj[key][value.key]
          } else {
            delete obj[key][value]
          }
          return obj
        }
      }
      i++
      targetLevelForAction(obj[key], levels, i, action, value, newValue)
    }
  }
}

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

app.get(pathApi + '/download/:lang', function (req, res) {
  res.sendFile(pathJsonFile + req.params.lang + '.json')
})

app.post(pathApi + '/:lang/group/:action', function (req, res) {
  const action = req.params.action
  let file = pathJsonFile + req.params.lang + '.json'
  const levelsIsDefined = isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let groupName = req.body.groupName
  let originalGroupName = req.body.originalGroupName
  let i = 0

  jsonfile.readFile(file, function (err, obj) {
    if (err) { console.log('Error on read json file', err) }
    switch (action) {
      case ADD:
        if (levelsIsDefined) {
          targetLevelForAction(obj, levels, i, action, groupName)
        } else {
          obj[groupName] = {}
        }
        break
      case UPD:
        if (levelsIsDefined) {
          targetLevelForAction(obj, levels, i, action, originalGroupName, groupName)
        } else {
          let contentOfGroup = obj[originalGroupName]
          delete obj[originalGroupName]
          obj[groupName] = contentOfGroup
        }
        break
      case DEL:
        if (levelsIsDefined) {
          targetLevelForAction(obj, levels, i, action, groupName)
        } else {
          delete obj[groupName]
        }
        break
    }

    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on ' + action + ' group name on json file', err) }
      res.sendStatus(200)
    })
  })
})

app.post(pathApi + '/:lang/translation/:action', function (req, res) {
  const action = req.params.action
  let file = pathJsonFile + req.params.lang + '.json'
  const levelsIsDefined = isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let translation = req.body.translation
  let i = 0

  jsonfile.readFile(file, function (err, obj) {
    if (err) { console.log('Error on read json file', err) }
    switch (action) {
      case ADD:
        if (levelsIsDefined) {
          targetLevelForAction(obj, levels, i, action, translation)
        } else {
          obj[translation.key] = translation.value
        }
        break
      case UPD:
        if (levelsIsDefined) {
          targetLevelForAction(obj, levels, i, action, translation)
        } else {
          if (translation.originalKey === translation.key) {
            obj[translation.key] = translation.value
          } else {
            delete obj[translation.originalKey]
            obj[translation.key] = translation.value
          }
        }
        break
      case DEL:
        if (levelsIsDefined) {
          targetLevelForAction(obj, levels, i, action, translation)
        } else {
          delete obj[translation.key]
        }
        break
    }

    jsonfile.writeFile(file, obj, function (err) {
      if (err) { return console.log('Error on ' + action + ' trad on json file', err) }
      res.sendStatus(200)
    })
  })
})

const server = app.listen(7777, 'localhost', function () {
  console.log('API listen on ' + server.address().address + ':' + server.address().port + ' !')
  createFolderIsNotExist('/json/')
})
