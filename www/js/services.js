angular.module('app.services', ['firebase'])


  .factory('newsFactory', ['$firebaseObject', function($firebaseObject){
    //TODO object should be array
    var storageRef = firebase.database().ref('news');
    return {
      query: function() {
        return $firebaseObject(storageRef)
      },
      post: function(storageObject) {storageRef.push().set(storageObject)}
    };
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
    //TODO object should be array
    var storageRef = firebase.database().ref('bulletin');
    return {
      query: function() {
        return $firebaseObject(storageRef)
      },
      post: function(storageObject) {storageRef.push().set(storageObject)}
    };
  }])

  .factory('contactFactory', ['$firebaseObject', function($firebaseObject){
    return {
      query: function() {
        return $firebaseObject(firebase.database().ref('contact'))
      }};
  }]);
