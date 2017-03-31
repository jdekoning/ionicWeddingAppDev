angular.module('app.controllers', [])

.controller('newsCtrl', ['$rootScope', '$scope', '$stateParams', '$ionicModal', 'newsFactory', 'news',
function ($rootScope, $scope, $stateParams, $ionicModal, newsFactory, news) {
  $rootScope.checkSession('news');
  $scope.news = news;
  console.log($scope.news);
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
    $scope.mynews.owner = $rootScope.userInfo.name1;
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
    $rootScope.checkSession('bulletin');
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
      combinedowner = function() { if($rootScope.userInfo.name2) {return $rootScope.userInfo.name1 + " en " + $rootScope.userInfo.name2} else {return $rootScope.userInfo.name1} }
      $scope.mybulletin.owner = combinedowner();
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
    $rootScope.checkSession('venue');
    $scope.venue = venue;
}])

.controller('dresscodeCtrl', ['$rootScope', '$scope', '$stateParams', 'storage', 'dresscode',
function ($rootScope, $scope, $stateParams, storage, dresscode) {
  console.log("starting drescode controller");
    $rootScope.checkSession('dresscode');
    $scope.dresscode = dresscode;
    // storage.$getDownloadURL().then(function(url) {
    //   $scope.url = url;
    // });
  }])

.controller('funCtrl', ['$rootScope', '$scope', '$stateParams',
function ($rootScope, $scope, $stateParams) {
  $rootScope.checkSession('funCtrl');
}])

.controller('contactCtrl', ['$rootScope', '$scope', '$stateParams', 'contactFactory', 'contacts',
  function ($rootScope, $scope, $stateParams, contactFactory, contacts) {
    $rootScope.checkSession('contact');
    $scope.contacts = contacts;
  }])

.controller('menuCtrl', ['$scope', '$rootScope', '$window', '$stateParams',
  function ($scope, $rootScope, $window, $stateParams) {
    $scope.signOut = function () {
      $rootScope.logout();
    }
  }])

.controller('loginCtrl', ['$scope', '$rootScope', '$window',
  function ($scope, $rootScope, $window) {
    $rootScope.checkSession('login');
    var timestampDiff = 1503666000 - new Date().getTime()/1000;
    $scope.days = Math.floor(timestampDiff/3600/24);
    $scope.hours = Math.floor((timestampDiff - $scope.days*3600*24)/3600);
    $scope.minutes = Math.floor((timestampDiff - $scope.days*3600*24 - $scope.hours*3600)/60);
    $scope.seconds = Math.floor((timestampDiff - $scope.days*3600*24 - $scope.hours*3600 - $scope.minutes*60));

    $scope.user = {
      username: "",
      password: ""
    };
    $scope.doLogin = function () {
      $rootScope.show('Authenticeren..');
      var username = this.user.username;
      var password = this.user.password;
      $scope.user.username = "";
      $scope.user.password = "";
      if (!username || !password) {
        $rootScope.notifications("Vul de benodigde velden in");
        return false;
      }
      var email = username + $rootScope.emailPostFix;
      $rootScope.auth.signInWithEmailAndPassword(email,password)
        .then(function (user) {
          $rootScope.hide();
          $rootScope.userEmail = user.email;
          console.debug("Succesvol ingelogd");
          $window.location.href = ("#/side-menu/news");
        }).catch(function(error) {
          console.error("got error: " + error.code);
          $rootScope.hide();
          if (error.code == 'auth/user-disabled') {
            console.debug("Ongeldige naam");
            $rootScope.notifications('Ongeldige naam');
          }
          else if (error.code == 'auth/wrong-password') {
            console.debug("Ongeldig wachtwoord");
            $rootScope.notifications('Ongeldig wachtwoord');
          }
          else if (error.code == 'auth/user-not-found') {
            console.debug("Ongeldige user");
            $rootScope.notifications('Ongeldige user');
          }
          else {
            console.debug("Ohoh, er is iets misgegaan. Sorry!");
            $rootScope.notifications('Ohoh, er is iets misgegaan. Sorry!');
          }
        });
    }
  }
])

.controller('signupCtrl', ['$rootScope','$scope','$window', '$stateParams', 'userFactory',
  function ($rootScope, $scope, $window, $stateParams, userFactory) {
    $rootScope.checkSession('signup');
    $scope.signup = $rootScope.userInfo;
    $scope.correctuser = "";

    $rootScope.$watch(
      function() { return $rootScope.userName; },
      function() { $scope.correctuser = $rootScope.userName; }
    );
    $rootScope.$watch(
      function() { return $rootScope.userInfo; },
      function() { $scope.signup = $rootScope.userInfo; }
    );

    $scope.doSignup = function() {
      $scope.signup.username1 = $rootScope.userName;
      console.info($scope.signup);
      // console.info($rootScope.auth.currentUser.uid);
      userFactory.post($rootScope.auth.currentUser.uid, $scope.signup);
      $window.location.href = ("#/side-menu/news");
    }
}]);

