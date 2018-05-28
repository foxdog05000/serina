'use strict'

let express = require ('express')
let moduleLanguages = express.Router()
let jsonfile = require('jsonfile')
let fs = require('fs')

let constants = require('./constants')
let utilities = require('./utilities')

jsonfile.spaces = constants.JSON_SPACES;

let createLanguage = (res, languageCode) => {
  jsonfile.writeFile(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', {}, (err) => {
    if (err) { return console.log('Error on create ' + languageCode + '.json file', err) }
    res.sendStatus(200)
  })
}

let deleteLanguage = (res, languageCode) => {
  fs.stat(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', (err) => {
    if (err) { return console.error(err) }

    fs.unlink(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', (err) => {
      if (err) { return console.log(err) }
      console.log('file "' + languageCode + '.json" deleted successfully')
      res.sendStatus(200)
    })
  })
}

moduleLanguages.isValidLanguageCode = (languageCode) => {
  return typeof languageCode === 'string' && languageCode.length === 2
}

moduleLanguages.countTranslations = (obj) => {
  let item, nbTranslations = 0
  if (utilities.isDefined(obj) && obj !== '') {
    if (obj instanceof Object) {
      for (item in obj) {
        if (obj.hasOwnProperty(item)) {
          nbTranslations += moduleLanguages.countTranslations(obj[item])
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

moduleLanguages.get(constants.PATH_API + '/languages', (req, res) => {
  let languages = []
  let files = fs.readdirSync(constants.PATH_JSON_FOLDER)

  files.forEach((fileName) => {
    let content = jsonfile.readFileSync(constants.PATH_JSON_FOLDER + '/' + fileName)
    languages.push({ code: fileName.substring(0, 2), nbTranslations: moduleLanguages.countTranslations(content) })
  })
  res.send(languages)
})

moduleLanguages.get(constants.PATH_API + '/language/:code/:action', (req, res) => {
  let languageCode = req.params.code
  let action = req.params.action

  if (moduleLanguages.isValidLanguageCode(languageCode)) {
    switch (action) {
      case 'create':
        createLanguage(res, languageCode);
        break;
      case 'delete':
        deleteLanguage(res, languageCode);
        break;
      case 'download':
        res.setHeader('Content-Type', 'apilication/json')
        res.download(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json')
        break;
      case 'open':
        res.sendFile(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json')
        break;
    }
  } else {
    console.error('Language code is not valid', languageCode)
    res.sendStatus(400)
  }
});

module.exports = moduleLanguages;
