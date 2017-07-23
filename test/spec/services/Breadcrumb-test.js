'use strict'

describe('Breadcrumb Service', function () {
  var mock, Breadcrumb
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
      Breadcrumb = $injector.get('Breadcrumb')
    })
  })

  describe('should init breacrumb is correct', function () {
    it('init with correct data', function () {
      var breadcrumbResult = Breadcrumb.init('home', '/')

      expect(breadcrumbResult).toEqual([{ label: 'home', href: '/' }])
      expect(breadcrumbResult).not.toEqual([{ label: '', href: '' }])
      expect(breadcrumbResult).not.toEqual([{}])
    })
  })

  it('should append level is correct', function () {
    var currentBreadcrumb = [{ label: 'home', href: '/' }]
    var groups = 'dialog'
    var breadcrumbResult = Breadcrumb.build(currentBreadcrumb, lang, groups)

    expect(breadcrumbResult).toEqual([{ label: 'home', href: '/' }, { label: 'dialog', href: '/lang/en/dialog' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }, { label: '', href: '/lang/en' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }])
  })

  it('should build 3 level is correct', function () {
    var currentBreadcrumb = Breadcrumb.init('home', '/')
    var groups = 'commons/dialog/action'
    var breadcrumbResult = Breadcrumb.build(currentBreadcrumb, lang, groups)

    expect(breadcrumbResult).toEqual([{ label: 'home', href: '/' }, { label: 'commons', href: '/lang/en/commons' }, { label: 'dialog', href: '/lang/en/commons/dialog' }, { label: 'action', href: '/lang/en/commons/dialog/action' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }, { label: 'commons', href: '/lang/en/commons' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }])
  })
})
