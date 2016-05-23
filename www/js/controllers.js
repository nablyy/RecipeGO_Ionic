angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {

  $scope.data = {
    showDelete: true
  };

  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ];

  $scope.sitems = [];
  
  $scope.onItemDelete = function(sitem) {
    $scope.sitems.splice($scope.sitems.indexOf(sitem), 1);
  };

  $scope.addItem = function (item) {
    $scope.sitems.push({
      id: item.id
    });
  
  };

  
  //$scope.items = Recipe_name.query({id: $scope.itemId});

})

.controller('ListCtrl', function($scope) {
    console.log('list')
});
