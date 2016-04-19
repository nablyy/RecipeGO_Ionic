// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var recipeGo = angular.module('starter', ['ionic'])
angular.module('list', ['ionic'])

recipeGo.run(function($ionicPlatform) {
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

recipeGo.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'index.html',
      controller: 'IndexCtrl'
    })
    .state('list', {
      url: '/list',
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    });
  
  $urlRouterProvider.otherwise("/");
  
});

recipeGo.controller('IndexCtrl', function($scope, $state) {
  $scope.changePage = function(){
    $state.go('list');
  }    
});
  
recipeGo.controller('ListCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }    
});

// .controller('MyCtrl', function($scope) {
  
//   $scope.data = {
//     showDelete: false
//   };
//   $scope.moveItem = function(item, fromIndex, toIndex) {
//     $scope.items.splice(fromIndex, 1);
//     $scope.items.splice(toIndex, 0, item);
//   };
  
//   $scope.onItemDelete = function(item) {
//     $scope.items.splice($scope.items.indexOf(item), 1);
//   };
  
//   $scope.items = [
//     { id: 0 },
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 },
//     { id: 7 },
//     { id: 8 },
//     { id: 9 },
//     { id: 10 },
//     { id: 11 },
//     { id: 12 },
//     { id: 13 },
//     { id: 14 },
//     { id: 15 },
//     { id: 16 },
//     { id: 17 },
//     { id: 18 },
//     { id: 19 },
//     { id: 20 }
//   ];
  
// });