angular.module('recipeGo.controllers', [])

    .controller('HomeCtrl', function ($scope, Ingredients) {
        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.ingredients = Ingredients.query();
        }

        $scope.search = function () {
            $scope.ingredients = Ingredients.query({name: $scope.searchKey});
        }

        $scope.ingredients = Ingredients.query();

        $scope.selected_ingredients = [];

        $scope.addItem = function(ingredient) {
            
            $scope.selected_ingredients.push({
                name: ingredient.name
            });
        }

        $scope.onItemDelete = function(selected_ingredient) { 
            $scope.selected_ingredients.splice($scope.selected_ingredients.indexOf(selected_ingredient), 1);
        }
    })

    .controller('SearchCtrl', function($scope, Ingredients) {
        console.log($scope.selected_ingredients);
    })

    .controller('RecipeDetailCtrl', function ($scope, $stateParams, Ingredients) {
        console.log('reports');
        $scope.ingredients = Ingredients.get({ingredientId: $stateParams.ingredientId, data: 'reports'});
    })
.controller('ListCtrl', function($scope) {
    console.log('list')
});
