'use strict'

angular.module('serinaApp').component('goToTop', {
  templateUrl: 'views/commons/components/go-to-top.html',
  controller: function goToTopCtrl ($location, $anchorScroll) {

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

    this.gotoTop = function () {
      $location.hash('backToTop')
      $anchorScroll()
    }

    getScrollPosition()
    window.addEventListener('scroll',function () {
      getScrollPosition()
    })

  }
})
