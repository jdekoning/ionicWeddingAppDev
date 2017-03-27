angular.module('app.controllers', [])

.controller('newsCtrl', ['$rootScope', '$scope', '$stateParams', '$ionicModal', 'newsFactory', 'news',
function ($rootScope, $scope, $stateParams, $ionicModal, newsFactory, news) {
  $rootScope.checkSession();
  $scope.news = news;

  $ionicModal.fromTemplateUrl('templates/news-add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.bulletinForm = modal;
  });

  $scope.addNews = function() {
    $scope.bulletinForm.show();
  };

  $scope.closeAddNews = function() {
    $scope.bulletinForm.hide();
  };

  $scope.mynews = {title:"", owner:"", description:"", date:""};

  $scope.submitNews = function() {

    $scope.mynews.date = new Date().toISOString();
    $scope.mynews.owner = $rootScope.userEmail.replace($rootScope.emailPostFix,"");
    // $scope.dish.comments.push($scope.mynews);
    // newsFactory.update({id:$scope.dish.id},$scope.dish);
    newsFactory.post($scope.mynews);


    $scope.mynews = {title:"", owner:"", description:"", date:""};
    $scope.bulletinForm.$pristine = true;

    $scope.closeAddNews();
    // $scope.popover.hide();
  };
}])

.controller('bulletinCtrl', ['$rootScope', '$scope', '$stateParams', '$ionicModal', 'bulletinFactory', 'bulletin',
  function ($rootScope, $scope, $stateParams, $ionicModal, bulletinFactory, bulletin) {
    $rootScope.checkSession();
    $scope.bulletin = bulletin;

    $ionicModal.fromTemplateUrl('templates/bulletin-add.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.bulletinForm = modal;
    });

    $scope.addBulletin = function() {
      $scope.bulletinForm.show();
    };

    $scope.closeAddBulletin = function() {
      $scope.bulletinForm.hide();
    };

    $scope.mybulletin = {title:"", owner:"", description:"", date:""};

    $scope.submitBulletin = function() {
      $scope.mybulletin.date = new Date().toISOString();
      $scope.mybulletin.owner = $rootScope.userEmail.replace($rootScope.emailPostFix,"");
      console.info($scope.mybulletin);
      bulletinFactory.post($scope.mybulletin);

      $scope.mybulletin = {title:"", owner:"", description:"", date:""};
      $scope.bulletinForm.$pristine = true;

      $scope.closeAddBulletin();
      // $scope.popover.hide();
    };
  }])

.controller('venueRouteCtrl', ['$rootScope', '$scope', '$stateParams', 'venueFactory', 'venue',
  function ($rootScope, $scope, $stateParams, venueFactory, venue) {
    $rootScope.checkSession();
    $scope.venue = venue;
}])

.controller('dresscodeCtrl', ['$rootScope', '$scope', '$stateParams', 'storage', 'dresscode',
function ($rootScope, $scope, $stateParams, storage, dresscode) {
    $rootScope.checkSession();
    $scope.dresscode = dresscode;
    // storage.$getDownloadURL().then(function(url) {
    //   $scope.url = url;
    // });
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
      var email = username + $rootScope.emailPostFix;
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
