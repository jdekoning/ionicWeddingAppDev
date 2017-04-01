angular.module('app.routes', ['firebase'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu.news', {
    url: '/news',
    views: {
      'side-menu': {
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl',
        resolve: {
          news: ['newsFactory', function(newsFactory){
            return newsFactory.query();
          }]
        }
      }
    }
  })

  .state('menu.venueRoute', {
    url: '/venue',
    views: {
      'side-menu': {
        templateUrl: 'templates/venueRoute.html',
        controller: 'venueRouteCtrl',
        resolve: {
          venue: ['venueFactory', function(venueFactory){
            return venueFactory.query();
          }]
        }
      }
    }
  })

  .state('menu.dresscode', {
    url: '/dresscode',
    views: {
      'side-menu': {
        templateUrl: 'templates/dresscode.html',
        controller: 'dresscodeCtrl',
        resolve: {
          dresscode: ['dresscodeFactory', function(dresscodeFactory){
            return dresscodeFactory.query();
          }]
          ,
          storage: ['dresscodeFactory', function(dresscodeFactory) {
            return "";
            // return dresscodeFactory.download();
          }]
        }
      }
    }
  })


  .state('menu.fun', {
    url: '/fun',
    views: {
      'side-menu': {
        templateUrl: 'templates/fun.html',
        controller: 'funCtrl'
      }
    }
  })

  .state('menu.bulletin', {
    url: '/bulletin',
    views: {
      'side-menu': {
        templateUrl: 'templates/bulletin.html',
        controller: 'bulletinCtrl',
        resolve: {
          bulletin: ['bulletinFactory', function(bulletinFactory){
            return bulletinFactory.query();
          }]
        }
      }
    }
  })

  .state('menu.contact', {
    url: '/contact',
    views: {
      'side-menu': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl',
        resolve: {
          contacts: ['contactFactory', function(contactFactory){
            return contactFactory.query();
          }]
        }
      }
    }
  })

  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  });

$urlRouterProvider.otherwise('/login')

});
