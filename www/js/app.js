// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'ngLodash', 'ngCordova', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  $ionicConfigProvider.views.maxCache(5);
})

.run(function($ionicPlatform, $cordovaMedia, $rootScope, $window, $ionicLoading, $timeout, userFactory) {
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
    });
    console.info(ionic.Platform.platform());
    if(ionic.Platform.platform()=='win32'){
      console.log("windows platform, playing Audio manually");
      var audio = new Audio('../audio/The_Love_Boat_old_school.mp3');
      audio.play();
    }
    else {
      var mediaStatusCallback = function(status) {
        if(status == 1) {
          console.debug("music starting");
        } else if (status == 2){
          console.debug("music playing");
        } else if (status == 4){
          srcMedia.play();
        }
        else {
          console.debug("no music status")
        }
      };
      var crowdSrc = ionic.Platform.isAndroid() ? "/android_asset/www/audio/The_Love_Boat_old_school.mp3" : "audio/The_Love_Boat_old_school.mp3.mp3";
      var srcMedia = new Media(crowdSrc, function() {console.debug("succesfully loaded audio")}, null, mediaStatusCallback);
      srcMedia.play();
    }
  });

  $rootScope.device = ionic.Platform.device();
  $rootScope.userEmail = "";
  $rootScope.userName = "";
  $rootScope.userInfo = {
    name1:"",
    username1:"",
    name2:"",
    username2:"",
    presence:true,
    presencetext:"",
    allergies:false,
    allergiestext:"",
    vegetarian:false,
    vegetariantext:"",
    email:"",
    otherinfo:""};
  $rootScope.auth = firebase.auth();
  $rootScope.emailPostFix = "@trouwapp.nl";

  $rootScope.notifications = function(text) {
    $rootScope.show(text);
    $window.setTimeout(function() {
      $rootScope.hide();
    }, 1999);
  };

  $rootScope.logout = function() {
    $window.location.href = ("#/login");
    $rootScope.auth.signOut().then(function() {
      // firebase.goOffline();
      $rootScope.resetSignupData();
    }, function(error) {
      console.error(error);
    });

  };

  $rootScope.resetSignupData = function() {
    $rootScope.userInfo = {
      name1:"",
      username1:$rootScope.userName,
      name2:"",
      username2:"",
      presence:true,
      presencetext:"",
      allergies:false,
      allergiestext:"",
      vegetarian:false,
      vegetariantext:"",
      email:"",
      otherinfo:""};
  };

  $rootScope.checkSession = function(origin) {
    // console.debug("checking session");
    $rootScope.auth.onAuthStateChanged(function(user, error) {
      if (user) {
        console.debug("User found");
        $rootScope.userName = user.email.replace($rootScope.emailPostFix,"");
        $rootScope.userEmail = user.email;
        var userObject = userFactory.query(user.uid);
        userObject.$loaded()
          .then(function() {
            if(userObject.name1) {
              $rootScope.userInfo = {
                name1: userObject.name1,
                username1: $rootScope.userName,
                name2: userObject.name2,
                username2: userObject.username2,
                presence: userObject.presence,
                presencetext: userObject.presencetext,
                allergies: userObject.allergies,
                allergiestext: userObject.allergiestext,
                vegetarian: userObject.vegetarian,
                vegetariantext: userObject.vegetariantext,
                email: userObject.email,
                otherinfo: userObject.otherinfo
              };
              if(origin == 'login'){
                console.log("found all data at login page, redirect news");
                $window.location.href = ("#/side-menu/news");
              }
              if(origin == 'signup'){
                console.log("found all data at signup page, redirect news");
                $window.location.href = ("#/side-menu/news");
              }
            }
            else {
              if(origin != 'signup') {
                console.log("query succeeded at page other that signup, redirect to signup");
                $window.location.href = ("#/signup");
              }
            }
          })
          .catch(function(error) {
            console.error("Error:", error);
          });
      } else {
        if(origin != 'login') {
          console.log("did not found user outside, login page, redirect to login");
          $rootScope.userEmail = "";
          $rootScope.resetSignupData();
          $window.location.href = ("#/login");
        }
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
})

.directive('multi', ['$parse', '$rootScope', function ($parse, $rootScope) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModelCtrl) {
      var validate = $parse(attrs.multi)(scope);

      ngModelCtrl.$viewChangeListeners.push(function () {
        // ngModelCtrl.$setValidity('multi', validate());
        $rootScope.$broadcast('multi:valueChanged');
      });

      var deregisterListener = scope.$on('multi:valueChanged', function (event) {
        console.log("attributes: "+ attrs.multi);
        console.log("scope: "+ scope);
        console.log("validity: "+ validate());
        ngModelCtrl.$setValidity('multi', validate());
      });
      scope.$on('$destroy', deregisterListener); // optional, only required for $rootScope.$on
    }
  };
}])

.filter('toArray', function() { return function(obj) {
  //real mess, somehow got the toArray to work :S
  if (!(obj instanceof Object)) return obj;
  var newobj = _.clone(obj);
  delete newobj.$$conf;
  delete newobj.$id;
  delete newobj.$priority;
  delete newobj.$resolved;
  delete newobj.__proto__;
  return _.map(newobj, function(val, key) {
    return Object.defineProperty(val, '$key', {value: key});
  });
}});
