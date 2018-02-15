'use strict'

angular.module('serinaApp').component('toolbar', {
  controller: function ToolbarCtrl ($timeout, $rootScope) {

    var self = this

    self.searchOpen = false
    self.search = null

    var clearMatchingElements = function () {
      self.matchingElements = []
    }

    self.initiateSearch = function () {
      self.search = ''
      clearMatchingElements()
      self.searchOpen = true
      $timeout(function () {
        document.getElementById('search-input').focus()
      }, 50)
    }

    self.showPreSearchBar = function () {
      return self.search === null
    }

    $rootScope.endSearch = function () {
      self.search = null
      clearMatchingElements()
      document.getElementById('search-input').blur()
      self.currentMatchingElement = 0
      self.searchOpen = false
    }

    self.searchKey = function () {
      if (self.search !== '') {
        var inputKeys = document.querySelectorAll('translation md-card .key')
        self.matchingElements = []
        self.currentMatchingElement = 0
        for (var iterator = 0; iterator < inputKeys.length; iterator++) {
          if (inputKeys[iterator].value.toLowerCase().indexOf(self.search.toLowerCase()) !== -1) {
            self.matchingElements.push(inputKeys[iterator])
          }
        }

        if (self.matchingElements.length === 0) {
          $rootScope.endSearch()
        } else {
          self.matchingElements[0].focus()
        }
      }
    }

    self.navigateBetweenMatchingElements = function (sign) {
      if (sign === '-' || sign === '+') {
        if (sign === '-') {
          self.currentMatchingElement--
          if (self.currentMatchingElement < 0) {
            self.currentMatchingElement = self.matchingElements.length - 1
          }
        } else if (sign === '+') {
          self.currentMatchingElement++
          if (self.currentMatchingElement > self.matchingElements.length - 1) {
            self.currentMatchingElement = 0
          }
        }
        self.matchingElements[self.currentMatchingElement].focus()
      }
    }

    Mousetrap.bindGlobal('ctrl+f', function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      }
      if ($rootScope.breadcrumb[0].href !== '/hub' && $rootScope.breadcrumb[0].href !== '/preview' && $rootScope.breadcrumb[0].href !== '/settings') {
        if (self.searchOpen) {
          $rootScope.endSearch()
        } else {
          self.initiateSearch()
        }
      }
    })

    Mousetrap.bindGlobal('ctrl+up', function () {
      if (self.matchingElements) {
        self.navigateBetweenMatchingElements('-')
      }
    })

    Mousetrap.bindGlobal('ctrl+down', function () {
      if (self.matchingElements) {
        self.navigateBetweenMatchingElements('+')
      }
    })

  },
  templateUrl: 'views/commons/directives/toolbar.html'
})
