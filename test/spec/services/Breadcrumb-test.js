'use strict'

describe('Breadcrumb Service', function () {
  var mock, Breadcrumb
  var language = 'en'
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
    var breadcrumbResult = Breadcrumb.build(currentBreadcrumb, language, groups)

    expect(breadcrumbResult).toEqual([{ label: 'home', href: '/' }, { label: 'dialog', href: '/language/en/dialog' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }, { label: '', href: '/language/en' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }])
  })

  it('should build 3 level is correct', function () {
    var currentBreadcrumb = Breadcrumb.init('home', '/')
    var groups = 'commons/dialog/action'
    var breadcrumbResult = Breadcrumb.build(currentBreadcrumb, language, groups)

    expect(breadcrumbResult).toEqual([{ label: 'home', href: '/' }, { label: 'commons', href: '/language/en/commons' }, { label: 'dialog', href: '/language/en/commons/dialog' }, { label: 'action', href: '/language/en/commons/dialog/action' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }, { label: 'commons', href: '/language/en/commons' }])
    expect(breadcrumbResult).not.toEqual([{ label: 'home', href: '/' }])
  })
})
