'use strict'

describe('DataManager Service', function () {
  var mock, DataManager
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

  describe('find()', function () {

    describe('group', function () {
      it('"test" in list to contain group find', function () {
        var list = ['alpha', 'beta', 'test', 'omega']
        var result = DataManager.find(list, 'test', 'group')

        expect(result).toEqual(true)
        expect(result).not.toEqual(false)
      });

      it('"test" in list to not contain group find', function () {
        var list = ['alpha', 'beta', 'gamma', 'omega']
        var result = DataManager.find(list, 'test', 'group')

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      });

      it('"test" in list to contain group find and type is not set', function () {
        var list = ['alpha', 'beta', 'test', 'gamma', 'omega']
        var result = DataManager.find(list, 'test')

        expect(result).toEqual(true)
        expect(result).not.toEqual(false)
      });
    });

    describe('translation', function () {
      it('"welcomme" in list to contain translation find and save', function () {
        var list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'welcome', value: 'Welcome', save: true }]
        var result = DataManager.find(list, 'welcome', 'trad')

        expect(result).toEqual(true)
        expect(result).not.toEqual(false)
      });

      it('"welcomme" in list to contain translation find and not save', function () {
        var list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'welcome', value: 'Welcome', save: false }]
        var result = DataManager.find(list, 'welcome', 'trad')

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      });

      it('"welcome" in list to not contain translation find', function () {
        var list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'hello', value: 'Hello', save: true }]
        var result = DataManager.find(list, 'welcome', 'trad')

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      });

      it('"welcome" in list to contain translation find and type is not set', function () {
        var list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'hello', value: 'Hello', save: true }]
        var result = DataManager.find(list, 'welcome')

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      });
    });

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
