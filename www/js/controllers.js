angular.module('recipeGo.controllers', [])
    .service('myService', function() {
        var selected_ingredients = [];
        return {
            set_selected_ingredients: function(selected) {
                selected_ingredients.push(selected);
            },
            get_selected_ingredients: function() {
                return selected_ingredients;
            }
        };
    })

    .controller('HomeCtrl', function ($scope, Ingredients, myService) {
        $scope.selected_ingredients = [];
        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.ingredients = Ingredients.query();
        }

        $scope.search = function () {
            $scope.ingredients = Ingredients.query({name: $scope.searchKey});
        }

        $scope.ingredients = Ingredients.query();

        $scope.addItem = function(ingredient) {
            myService.set_selected_ingredients(ingredient);
            $scope.selected_ingredients = myService.get_selected_ingredients();
            // $scope.selected_ingredients.push({
            //     name: ingredient.name
            // });
            console.log($scope.selected_ingredients)
        }

        $scope.onItemDelete = function(selected_ingredient, myService) { 
            $scope.selected_ingredients.splice($scope.selected_ingredients.indexOf(selected_ingredient), 1);
        }

    })

    .controller('SearchCtrl', function($scope, Ingredients, myService) {
        console.log(myService.get_selected_ingredients())
        Ingredients.query(myService.get_selected_ingredients())
    })

    .controller('RecipeDetailCtrl', function ($scope, $stateParams, Ingredients) {
        console.log('reports');
        $scope.ingredients = Ingredients.get({ingredientId: $stateParams.ingredientId, data: 'reports'});
    })
.controller('ListCtrl', function($scope) {
    console.log('list')
});
