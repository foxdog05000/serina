'use strict'

angular.module('serinaApp').directive('goToTop', function ($location, $anchorScroll) {
  return {
    restrict: 'E',
    templateUrl: 'views/commons/directives/go-to-top.html',
    link: function (scope) {

      var scrollObject = {}
      function getScrollPosition () {
        scrollObject = {
          x: window.pageXOffset,
          y: window.pageYOffset
        }
        if (scrollObject.y > 200) {
          if (document.getElementById('buttonBackToTop').style.visibility === 'hidden') {
            document.getElementById('buttonBackToTop').style.visibility = 'visible'
          }
        } else {
          document.getElementById('buttonBackToTop').style.visibility = 'hidden'
        }
      }

      scope.gotoTop = function () {
        $location.hash('backToTop')
        $anchorScroll()
      }

      getScrollPosition()
      window.addEventListener('scroll',function () {
        getScrollPosition()
      })

    }
  }
})
