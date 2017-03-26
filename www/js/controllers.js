angular.module('app.controllers', [])

.controller('newsCtrl', ['$rootScope', '$scope', '$stateParams', 'newsFactory', 'news',
function ($rootScope, $scope, $stateParams, newsFactory, news) {
    $rootScope.checkSession();
    $scope.news = news;
}])

.controller('bulletinCtrl', ['$rootScope', '$scope', '$stateParams', 'bulletinFactory', 'bulletin',
  function ($rootScope, $scope, $stateParams, bulletinFactory, bulletin) {
    $rootScope.checkSession();
    $scope.bulletin = bulletin;
}])

.controller('venueRouteCtrl', ['$rootScope', '$scope', '$stateParams', 'venueFactory', 'venue',
  function ($rootScope, $scope, $stateParams, venueFactory, venue) {
    $rootScope.checkSession();
    $scope.venue = venue;
}])

.controller('dresscodeCtrl', ['$rootScope', '$scope', '$stateParams', 'dresscodeFactory', 'dresscode',
function ($rootScope, $scope, $stateParams, dresscodeFactory, dresscode) {
    $rootScope.checkSession();
    $scope.dresscode = dresscode;
  }])

.controller('funCtrl', ['$rootScope', '$scope', '$stateParams',
function ($rootScope, $scope, $stateParams) {
  $rootScope.checkSession();
}])

.controller('contactCtrl', ['$rootScope', '$scope', '$stateParams', 'contactFactory', 'contacts',
  function ($rootScope, $scope, $stateParams, contactFactory, contacts) {
    $rootScope.checkSession();
    $scope.contacts = contacts;
  }])

.controller('menuCtrl', ['$scope', '$rootScope', '$stateParams',
  function ($scope, $rootScope) {
    $scope.signOut = function () {$rootScope.logout()}
  }])

.controller('loginCtrl', ['$scope', '$rootScope', '$window',
  function ($scope, $rootScope, $window) {
    $rootScope.auth.onAuthStateChanged(function(user, error) {
      if (error) {
        console.error("got an error in session check");
        $rootScope.userEmail = null;
      } else if (user) {
        // user authenticated with Firebase
        $rootScope.userEmail = user.email;
        $window.location.href = ("#/side-menu/news");
      }});

    $scope.user = {
      username: "",
      password: ""
    };
    $scope.doLogin = function () {
      $rootScope.show('Authenticeren..');
      var username = this.user.username;
      var password = this.user.password;
      this.user.username = "";
      this.user.password = "";
      if (!username || !password) {
        $rootScope.notifications("Vul de benodigde velden in");
        return false;
      }
      var email = username + "@trouwapp.nl";
      $rootScope.auth.signInWithEmailAndPassword(email,password)
        .then(function (user) {
          $rootScope.hide();
          $rootScope.userEmail = user.email;
          $window.location.href = ("#/side-menu/news");
        }).catch(function(error) {
          console.error("got error: " + error.code);
          $rootScope.hide();
          if (error.code == 'auth/user-disabled') {
            $rootScope.notifications('Ongeldige naam');
          }
          else if (error.code == 'auth/wrong-password') {
            $rootScope.notifications('Ongeldig wachtwoord');
          }
          else if (error.code == 'auth/user-not-found') {
            $rootScope.notifications('Ongeldige user');
          }
          else {
            $rootScope.notifications('Ohoh, er is iets misgegaan. Sorry!');
          }
        });
    }
  }
])

.controller('signupCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {}]);
