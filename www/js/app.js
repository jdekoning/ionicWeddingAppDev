// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  $ionicConfigProvider.views.maxCache(5);
})

.run(function($ionicPlatform, $rootScope, $window, $ionicLoading, $timeout) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // $timeout(function() {
    //   $cordovaSplashscreen.hide();
    // },1000);

    $rootScope.show = function(text) {
      var showText = text ? text : "Loading...";
      $rootScope.loading = $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> <br/>' + showText,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.show()
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $timeout(function() {
        $rootScope.hide()
      },200);
  })
});

  $rootScope.userEmail = null;
  $rootScope.auth = firebase.auth();
  $rootScope.emailPostFix = "@trouwapp.nl";

  $rootScope.notifications = function(text) {
    $rootScope.show(text);
    $window.setTimeout(function() {
      $rootScope.hide();
    }, 1999);
  };

  $rootScope.logout = function() {
    $rootScope.auth.signOut();
    $rootScope.checkSession();
  };

  $rootScope.checkSession = function() {
    // console.debug("checking session");
    $rootScope.auth.onAuthStateChanged(function(user, error) {
      if (error) {
        console.error("got an error in session check");
        $rootScope.userEmail = null;
        $window.location.href = ("#/login");
      } else if (user) {
        $rootScope.userEmail = user.email;
      } else {
        $rootScope.userEmail = null;
        $window.location.href = ("#/login");
      }
    });
  };
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });

      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});
