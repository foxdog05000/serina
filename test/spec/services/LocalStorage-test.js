'use strict'

describe('Breadcrumb Service', function () {
  var mock, store, LocalStorage
  beforeEach(module('serinaApp'))

  beforeEach(function () {
    mock = {
      alert: jasmine.createSpy()
    }

    module(function ($provide) {
      $provide.value('$window', mock)
    })

    inject(function ($injector) {
      LocalStorage = $injector.get('LocalStorage')
    })

    store = {}

    spyOn(localStorage, 'getItem').andCallFake(function (key) {
      return store[key]
    })

    spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
      store[key] = value + ''
      return store[key]
    })
  })

  describe('itemExist', function () {
    
  })

  describe('getItem', function () {

  })

  describe('setItem', function () {

  })
})
