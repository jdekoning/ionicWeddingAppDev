angular.module('app.services', ['firebase'])


  .factory('newsFactory', ['$firebaseObject', function($firebaseObject){
    return {
      query: function() {
        return $firebaseObject(firebase.database().ref('news'))
      }};
  }])

  .factory('venueFactory', ['$firebaseObject', function($firebaseObject){
    return {
      query: function() {
        return $firebaseObject(firebase.database().ref('venue'))
      }};
  }])

  .factory('dresscodeFactory', ['$firebaseObject', function($firebaseObject){
    var storageRef = firebase.storage().ref();
    return {
      query: function() {
        return $firebaseObject(firebase.database().ref('dresscode'))
      },
      download: function() {
        return ""
      }
    };
  }])

  .factory('bulletinFactory', ['$firebaseObject', function($firebaseObject){
    return {
      query: function() {
        return $firebaseObject(firebase.database().ref('bulletin'))
      }};
  }])

  .factory('contactFactory', ['$firebaseObject', function($firebaseObject){
    return {
      query: function() {
        return $firebaseObject(firebase.database().ref('contact'))
      }};
  }]);
