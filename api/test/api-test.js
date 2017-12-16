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
    expect(api.isDefined(null)).to.equal(true)
    expect(api.isDefined(0)).to.equal(true)
    expect(api.isDefined('')).to.equal(true)
    expect(api.isDefined(undefined)).to.equal(false)
  })

  it('check entities is a object', () => {
    expect(api.isObject({ key: 'hello', value: 'hello' })).to.equal(true)
    expect(api.isObject(null)).to.equal(true)
    expect(api.isObject(['en'])).to.equal(true)
    expect(api.isObject('hello')).to.equal(false)
    expect(api.isObject(undefined)).to.equal(false)
  })
})
