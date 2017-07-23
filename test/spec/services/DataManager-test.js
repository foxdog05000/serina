'use strict'

describe('DataManager Service', function () {
  var mock, DataManager
  var lang = 'en'
  beforeEach(module('serinaApp'))

  beforeEach(function () {
    mock = {
      alert: jasmine.createSpy()
    }

    module(function ($provide) {
      $provide.value('$window', mock)
    })

    inject(function ($injector) {
      DataManager = $injector.get('DataManager')
    })
  })

  describe('remove()', function () {
    var list = ['fr', 'en', 'es', 'it', 'ca']

    it('should remove item = "it"', function () {
      var listResult = DataManager.remove(list, 'it')

      expect(listResult).toEqual(['fr', 'en', 'es', 'ca'])
      expect(listResult).not.toEqual(list)
    })

    it('should remove item = null', function () {
      var listResult = DataManager.remove(list, null)

      expect(listResult).toEqual(list)
      expect(listResult).not.toEqual(['fr', 'en', 'es'])
    })
  })

})
