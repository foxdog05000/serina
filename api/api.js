'use strict'

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

function targetLevelForAction (obj, levels, i, indexLanguage, action, value, newValue) {
  for (let key in obj) {
    if (key === levels[i]) {
      if (key === levels[i] && i === levels.length - 1) {
        if (action === ADD || action === UPD) {
          if (isObject(value)) {
            if (action === ADD) {
              obj[key][value.key] = value.value[indexLanguage]
            } else {
              if (value.originalKey === value.key) {
                obj[key][value.key] = value.value[indexLanguage]
              } else {
                delete obj[key][value.originalKey]
                obj[key][value.key] = value.value[indexLanguage]
              }
            }
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
      targetLevelForAction(obj[key], levels, i, indexLanguage, action, value, newValue)
    }
  }
}

function isArray (val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}

function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

function sortAsc (un) {
  let or = {}
  if (isArray(un)) {
    // Sort or don't sort arrays
    if (document.getElementById('noarray').checked) {
      or = un
    } else {
      or = un.sortAsc()
    }
    or.forEach(function (v, i) {
      or[i] = sortAsc(v)
    })
  } else if (isPlainObject(un)) {
    or = {}
    Object.keys(un).sortAsc(function (a, b) {
      if (a.toLowerCase() < b.toLowerCase()) { return -1 }
      if (a.toLowerCase() > b.toLowerCase()) { return 1 }
      return 0
    }).forEach(function (key) {
      or[key] = sortJSON(un[key])
    })
  } else {
    or = un
  }
  return or
}

// Sort the JSON
function sortJSON (json) {
  try {
    let r = sortAsc(json)
    return JSON.parse(JSON.stringify(r, null, 4))
  } catch (ex) {
    console.log('Incorrect JSON object')
    return json
  }
}

function countProperties(obj) {
  let count = 0
  for( var x in obj ) if(obj.hasOwnProperty(x)) count++
  return count
}

app.get(pathApi + '/list-languages', function (req, res) {
  fs.readdir(pathJsonFile, function (err, files) {
    if (err) { throw err }
    let languages = { listLanguages: [] }
    files.forEach(function (file, index) {
      let nbEntities = 0
      jsonfile.readFile(pathJsonFile + file, function (err, obj) {
        if (err) { console.log('Error on read json file : ' + file, 'err', err) }
        nbEntities = countProperties(obj)
        console.log(countProperties(obj))

        languages.listLanguages.push({ code: file.substring(0, 2), nbKeys: nbEntities })

        if (index === files.length - 1) {
          res.send(languages)
        }
      })
    })
  })
})

app.get(pathApi + '/create/:language', function (req, res) {
  let file = pathJsonFile + req.params.language + '.json'
  let obj = {}

  jsonfile.writeFile(file, obj, function (err) {
    if (err) { return console.log('Error on create json file', err) }
    res.sendStatus(200)
  })
})

app.get(pathApi + '/delete/:language', function (req, res) {
  fs.stat(pathJsonFile + req.params.language + '.json', function (err) {
    if (err) { return console.error(err) }

    fs.unlink(pathJsonFile + req.params.language + '.json', function (err) {
      if (err) { return console.log(err) }
      console.log('file "' + req.params.language + '.json" deleted successfully')
      res.sendStatus(200)
    })
  })
})

app.get(pathApi + '/open/:language', function (req, res) {
  res.sendFile(pathJsonFile + req.params.language + '.json')
})

app.get(pathApi + '/download/:language', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.download(pathJsonFile + req.params.language + '.json')
})

app.post(pathApi + '/group/:action', function (req, res) {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = pathJsonFile + languages[index] + '.json'
  })

  const levelsIsDefined = isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let groupName = req.body.groupName
  let originalGroupName = req.body.originalGroupName
  let i = 0

  files.map((file, index) => {
    jsonfile.readFile(file, function (err, obj) {
      if (err) { console.log('Error on read json file : ' + file, 'err', err) }
      switch (action) {
        case ADD:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, groupName)
          } else {
            obj[groupName] = {}
          }
          break
        case UPD:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, originalGroupName, groupName)
          } else {
            let contentOfGroup = obj[originalGroupName]
            delete obj[originalGroupName]
            obj[groupName] = contentOfGroup
          }
          break
        case DEL:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, groupName)
          } else {
            delete obj[groupName]
          }
          break
      }

      obj = sortJSON(obj)

      jsonfile.writeFile(file, obj, function (err) {
        if (err) { return console.log('Error on ' + action + ' group name on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

app.post(pathApi + '/translation/:action', function (req, res) {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = pathJsonFile + languages[index] + '.json'
  })

  const levelsIsDefined = isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let translation = req.body.translation
  let i = 0

  files.map((file, index) => {
    jsonfile.readFile(file, function (err, obj) {
      if (err) { console.log('Error on read json file : ' + file, 'err', err) }
      switch (action) {
        case ADD:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            obj[translation.key] = translation.value[index]
          }
          break
        case UPD:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            if (translation.originalKey === translation.key) {
              obj[translation.key] = translation.value[index]
            } else {
              delete obj[translation.originalKey]
              obj[translation.key] = translation.value[index]
            }
          }
          break
        case DEL:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            delete obj[translation.key]
          }
          break
      }

      obj = sortJSON(obj)

      jsonfile.writeFile(file, obj, function (err) {
        if (err) { return console.log('Error on ' + action + ' trad on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

const server = app.listen(7777, 'localhost', function () {
  console.log('API listen on ' + server.address().address + ':' + server.address().port + ' !')
  createFolderIsNotExist('/json/')
})
