'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let jsonfile = require('jsonfile')
let path = require('path')
let fs = require('fs')
let api = express()

let utilities = require('./modules/utilities')
let constants = require('./modules/constants')
let languages = require('./modules/languages')

jsonfile.spaces = constants.JSON_SPACES

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
api.use(bodyParser.json())
api.use('/', languages);

let createFolderIsNotExist = (pathFolder) => {
  if (!fs.existsSync(path.join(__dirname, pathFolder))) {
    fs.mkdir(path.join(__dirname, pathFolder), (err) => {
      if (!err || (err && err.code === 'EEXIST')) {
        console.log('Successful creation for the', pathFolder, 'folder on path', __dirname)
      } else {
        console.error('Error on create folder', pathFolder, 'on path', __dirname, err)
      }
    })
  }
}

let targetLevelForAction = (obj, levels, i, indexLanguage, action, value, newValue) => {
  for (let key in obj) {
    if (key === levels[i]) {
      if (key === levels[i] && i === levels.length - 1) {
        if (action === 'add' || action === 'update') {
          if (utilities.isObject(value)) {
            if (action === 'add') {
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
            if (action === 'add') {
              obj[key][value] = {}
            } else {
              let copyContent = obj[key][value]
              delete obj[key][value]
              obj[key][newValue] = copyContent
            }
          }
          return obj
        } else if (action === 'delete') {
          if (utilities.isObject(value)) {
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

api.get(constants.PATH_API + '/', (req, res) => {
  let address = req.protocol + '://' + req.headers.host + constants.PATH_API
  res.send({
    'GET': [
      address + '/language/:code/create',
      address + '/language/:code/delete',
      address + '/language/:code/download',
      address + '/language/:code/open',
      address + '/languages'
    ],
    'POST': [
      address + '/group/add',
      address + '/group/update',
      address + '/group/delete',
      address + '/translation/add',
      address + '/translation/update',
      address + '/translation/delete'
    ]
  })
})

api.post(constants.PATH_API + '/group/:action', (req, res) => {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = constants.PATH_JSON_FOLDER + '/' + languages[index] + '.json'
  })

  const levelsIsDefined = utilities.isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let groupName = req.body.groupName
  let originalGroupName = req.body.originalGroupName
  let i = 0

  files.map((file, index) => {
    jsonfile.readFile(file, (err, obj) => {
      if (err) { console.log('Error on read json file : ' + file, 'err', err) }
      switch (action) {
        case 'add':
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, groupName)
          } else {
            obj[groupName] = {}
          }
          break
        case 'update':
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, originalGroupName, groupName)
          } else {
            let contentOfGroup = obj[originalGroupName]
            delete obj[originalGroupName]
            obj[groupName] = contentOfGroup
          }
          break
        case 'delete':
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, groupName)
          } else {
            delete obj[groupName]
          }
          break
      }

      obj = utilities.sortJSON(obj)

      jsonfile.writeFile(file, obj, (err) => {
        if (err) { return console.log('Error on ' + action + ' group name on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

api.post(constants.PATH_API + '/translation/:action', (req, res) => {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = constants.PATH_JSON_FOLDER + '/' + languages[index] + '.json'
  })

  const levelsIsDefined = utilities.isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let translation = req.body.translation
  let i = 0

  files.map((file, index) => {
    jsonfile.readFile(file, (err, obj) => {
      if (err) { console.log('Error on read json file : ' + file, 'err', err) }
      switch (action) {
        case 'add':
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            obj[translation.key] = translation.value[index]
          }
          break
        case 'update':
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
        case 'delete':
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            delete obj[translation.key]
          }
          break
      }

      obj = utilities.sortJSON(obj)

      jsonfile.writeFile(file, obj, (err) => {
        if (err) { return console.log('Error on ' + action + ' trad on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

const server = api.listen(7777, 'localhost', () => {
  console.log('API listen on ' + server.address().address + ':' + server.address().port + ' !')
  createFolderIsNotExist('/json/')
})

module.exports = api
