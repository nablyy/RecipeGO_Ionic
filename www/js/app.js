// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('recipeGo', ['ionic', 'recipeGo.controllers', 'recipeGo.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('API', function($http) {
  var api = {};
  var baseURL = 'https://vision.googleapis.com/v1/images:annotate?key=\(AIzaSyAvnQy9Y2zl86brwaiu6sl08YgujOA0RoI)';
 
  api.sendimage = function(images) {
    return $http.post(baseURL + '/images', {
      // "to": to,
      // "text": text
    });
  };
 
  return api;
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('list', {
      url: '/list',
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    })
    .state('search', {
        url: '/search',
        templateUrl: 'templates/recipe_list.html',
        controller: 'SearchCtrl'
    })

    .state('recipe', {
        url: '/search/:recipeId',
        templateUrl: 'templates/recipe_detail.html',
        controller: 'RecipeDetailCtrl'
    });
  
  $urlRouterProvider.otherwise("/home");
  
});