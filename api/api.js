'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let jsonfile = require('jsonfile')
let path = require('path')
let fs = require('fs')
let api = express()

const pathJsonFile = path.join(__dirname, '/json/')
const pathApi = '/api'
jsonfile.spaces = 2

const FOLDER_EXIST = 'EEXIST'
const ADD = 'add'
const UPD = 'upd'
const DEL = 'del'

api.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
api.use(bodyParser.json())

api.isDefined = function (value) { return value !== undefined && value !== null }
api.isObject = function (value) { return typeof value === 'object' }

function createFolderIsNotExist (pathFolder) {
  if (!fs.existsSync(path.join(__dirname, pathFolder))) {
    fs.mkdir(path.join(__dirname, pathFolder), function (err) {
      if (!err || (err && err.code === FOLDER_EXIST)) {
        console.log('Successful creation for the', pathFolder, 'folder on path', __dirname)
      } else {
        console.error('Error on create folder', pathFolder, 'on path', __dirname, err)
      }
    })
  }
}

function targetLevelForAction (obj, levels, i, indexLanguage, action, value, newValue) {
  for (let key in obj) {
    if (key === levels[i]) {
      if (key === levels[i] && i === levels.length - 1) {
        if (action === ADD || action === UPD) {
          if (api.isObject(value)) {
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
          if (api.isObject(value)) {
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

api.isArray = function (val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}

api.isPlainObject = function (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

api.sortJSON = function (json) {
  try {
    let r = sortAsc(json)
    return JSON.parse(JSON.stringify(r, null, 4))
  } catch (ex) {
    console.log('Incorrect JSON object')
    return json
  }
}

function sortAsc (un) {
  let or = {}
  if (api.isArray(un)) {
    or = un.sortAsc()
    or.forEach(function (v, i) {
      or[i] = sortAsc(v)
    })
  } else if (api.isPlainObject(un)) {
    or = {}
    Object.keys(un).sort(function (a, b) {
      if (a.toLowerCase() < b.toLowerCase()) { return -1 }
      if (a.toLowerCase() > b.toLowerCase()) { return 1 }
      return 0
    }).forEach(function (key) {
      or[key] = api.sortJSON(un[key])
    })
  } else {
    or = un
  }
  return or
}

api.countTranslations = function (obj) {
  let item, nbTranslations = 0
  if (api.isDefined(obj) && obj !== '') {
    if (obj instanceof Object) {
      for (item in obj) {
        if (obj.hasOwnProperty(item)) {
          nbTranslations += api.countTranslations(obj[item])
        } else {
          break
        }
      }
    } else {
      nbTranslations++
    }
  }
  return nbTranslations
}

api.get(pathApi + '/', function (req, res) {
  let address = req.protocol + '://' + req.headers.host + pathApi
  let map = {
    "GET": [
      address + "/list-languages",
      address + "/count-entities-list-languages",
      address + "/create/:language",
      address + "/delete/:language",
      address + "/open/:language",
      address + "/download/:language",
    ],
    "POST": [
      address + "/group/:action",
      address + "/translation/:action"
    ]
  }
  res.send(map)
})

api.get(pathApi + '/list-languages', function (req, res) {
  fs.readdir(pathJsonFile, function (err, files) {
    if (err) { throw err }
    let languages = { listLanguages: [] }
    files.forEach(function (file) {
      languages.listLanguages.push({ code: file.substring(0, 2), nbTranslations: 0 })
    })
    res.send(languages)
  })
})

api.get(pathApi + '/count-entities-list-languages', function (req, res) {
  let languages = { listLanguages: [] }
  let files = fs.readdirSync(pathJsonFile)

  files.forEach((fileName) => {
    let content = jsonfile.readFileSync(pathJsonFile + fileName)
    languages.listLanguages.push({ code: fileName.substring(0, 2), nbTranslations: api.countTranslations(content) })
  })
  res.send(languages)
})

api.get(pathApi + '/create/:language', function (req, res) {
  let file = pathJsonFile + req.params.language + '.json'
  let obj = {}

  jsonfile.writeFile(file, obj, function (err) {
    if (err) { return console.log('Error on create json file', err) }
    res.sendStatus(200)
  })
})

api.get(pathApi + '/delete/:language', function (req, res) {
  fs.stat(pathJsonFile + req.params.language + '.json', function (err) {
    if (err) { return console.error(err) }

    fs.unlink(pathJsonFile + req.params.language + '.json', function (err) {
      if (err) { return console.log(err) }
      console.log('file "' + req.params.language + '.json" deleted successfully')
      res.sendStatus(200)
    })
  })
})

api.get(pathApi + '/open/:language', function (req, res) {
  res.sendFile(pathJsonFile + req.params.language + '.json')
})

api.get(pathApi + '/download/:language', function (req, res) {
  res.setHeader('Content-Type', 'apilication/json')
  res.download(pathJsonFile + req.params.language + '.json')
})

api.post(pathApi + '/group/:action', function (req, res) {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = pathJsonFile + languages[index] + '.json'
  })

  const levelsIsDefined = api.isDefined(req.body.levels)
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

      obj = api.sortJSON(obj)

      jsonfile.writeFile(file, obj, function (err) {
        if (err) { return console.log('Error on ' + action + ' group name on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

api.post(pathApi + '/translation/:action', function (req, res) {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = pathJsonFile + languages[index] + '.json'
  })

  const levelsIsDefined = api.isDefined(req.body.levels)
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

      obj = api.sortJSON(obj)

      jsonfile.writeFile(file, obj, function (err) {
        if (err) { return console.log('Error on ' + action + ' trad on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

const server = api.listen(7777, 'localhost', function () {
  console.log('API listen on ' + server.address().address + ':' + server.address().port + ' !')
  createFolderIsNotExist('/json/')
})

module.exports = api
