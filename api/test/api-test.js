'use strict'

const chai = require('chai')
const expect = chai.expect
const api = require('../api.js')

describe('check entities', () => {
  it('check levels is defined', () => {
    expect(api.isDefined('/language/fr/actions')).to.equal(true)
    expect(api.isDefined('/language/fr/')).to.equal(true)
    expect(api.isDefined(['en', 'fr'])).to.equal(true)
    expect(api.isDefined({ code: 'fr', nbEntities: 75 })).to.equal(true)

    expect(api.isDefined(0)).to.equal(true)
    expect(api.isDefined('')).to.equal(true)

    expect(api.isDefined(null)).to.equal(false)
    expect(api.isDefined(undefined)).to.equal(false)
  })

  it('check entities is a object', () => {
    expect(api.isObject({ key: 'hello', value: 'hello' })).to.equal(true)
    expect(api.isObject(['en'])).to.equal(true)
    expect(api.isObject(null)).to.equal(true)

    expect(api.isObject('hello')).to.equal(false)
    expect(api.isObject(undefined)).to.equal(false)
  })

  it('check is array', () => {
    expect(api.isArray(['en', 'fr'])).to.equal(true)
    expect(api.isArray([{ a: 1 }, { b: 2 }])).to.equal(true)

    expect(api.isArray({ key: 'hello', value: 'hello' })).to.equal(false)
    expect(api.isArray(1)).to.equal(false)
    expect(api.isArray('en')).to.equal(false)
    expect(api.isArray('')).to.equal(false)
    expect(api.isArray(undefined)).to.equal(false)
    expect(api.isArray(null)).to.equal(false)
  })

  it('check is plain object', () => {
    expect(api.isPlainObject({ key: 'hello', value: 'hello' })).to.equal(true)
    expect(api.isPlainObject({})).to.equal(true)

    expect(api.isPlainObject(['en', 'fr'])).to.equal(false)
    expect(api.isPlainObject([{ a: 1 }, { b: 2 }])).to.equal(false)
    expect(api.isPlainObject(1)).to.equal(false)
    expect(api.isPlainObject('en')).to.equal(false)
    expect(api.isPlainObject('')).to.equal(false)
    expect(api.isPlainObject()).to.equal(false)
    expect(api.isPlainObject(undefined)).to.equal(false)
    expect(api.isPlainObject(null)).to.equal(false)
  })
})

describe('sort json', () => {
  it('asc sort', () => {
    expect(api.sortJSON({ "validate": "validate", "cancel": "cancel" })).to.deep.equal({ "cancel": "cancel", "validate": "validate" })
    expect(api.sortJSON({ "d": { "value": 1}, "a": "hello" })).to.deep.equal({ "a": "hello", "d": { "value": 1} })
    expect(api.sortJSON({ a: 2 })).to.deep.equal({ a: 2})
    expect(api.sortJSON([{ "welcome": "welcome" }])).to.deep.equal([{ "welcome": "welcome" }])
    expect(api.sortJSON({})).to.deep.equal({})
    expect(api.sortJSON([])).to.deep.equal([])

    expect(api.sortJSON(0)).to.deep.equal(0)
    expect(api.sortJSON('hello')).to.deep.equal('hello')
    expect(api.sortJSON('')).to.deep.equal('')
    expect(api.sortJSON(null)).to.deep.equal(null)
    expect(api.sortJSON(undefined)).to.deep.equal(undefined)
  })
})

describe('manipulate translations', () => {
  it('count only translations', () => {
    expect(api.countTranslations({ "a": 1, "b": 2, "c": 3 })).to.equal(3)
    expect(api.countTranslations({ "validate": "validate", "cancel": "cancel" })).to.equal(2)

    expect(api.countTranslations({ "actions": { "validate": "validate", "cancel": "cancel" }, "welcome": "welcome" })).to.equal(3)
    expect(api.countTranslations({ "actions": { "validate": "validate", "cancel": "cancel" }, "toast": {}, "welcome": "welcome" })).to.equal(3)

    expect(api.countTranslations({})).to.equal(0)
    expect(api.countTranslations([])).to.equal(0)
    expect(api.countTranslations(undefined)).to.equal(0)
    expect(api.countTranslations(null)).to.equal(0)
    expect(api.countTranslations('')).to.equal(0)
    expect(api.countTranslations()).to.equal(0)
  })
})
