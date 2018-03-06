'use strict'

describe('Breadcrumb Service', function () {
  var mock, SecondLanguage
  beforeEach(module('serinaApp'))

  beforeEach(function () {
    mock = {
      alert: jasmine.createSpy()
    }

    module(function ($provide) {
      $provide.value('$window', mock)
    })

    inject(function ($injector) {
      SecondLanguage = $injector.get('SecondLanguage')
    })
  })

  describe('definedSecondLanguage', function () {
    it('should defined correctly second language set', function () {
      expect(SecondLanguage.definedSecondLanguage('en')).toEqual('en')
    })

    it("don't defined second language because no second language set")
    expect(SecondLanguage.definedSecondLanguage('')).toEqual('')
    expect(SecondLanguage.definedSecondLanguage(undefined)).toEqual('')
    expect(SecondLanguage.definedSecondLanguage(null)).toEqual('')
    expect(SecondLanguage.definedSecondLanguage({ label: 'EN' })).toEqual('')
    expect(SecondLanguage.definedSecondLanguage(['EN', 'FR'])).toEqual('')
  })
})
