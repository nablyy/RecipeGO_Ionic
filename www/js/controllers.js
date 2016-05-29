angular.module('recipeGo.controllers', [])
    .service('myService', function() {
        var selected_ingredients = [];
        return {
            set_selected_ingredients: function(selected) {
                selected_ingredients.push(selected);
            },
            get_selected_ingredients: function() {
                return selected_ingredients;
            },
            reset_selected_ingredients: function() {
                selected_ingredients = [];
            }
        };
    })

    .controller('ThisCtrl', function($scope, $cordovaImagePicker) {
        var me = this;
        me.current_image = "";
        me.detection_type = 'LABEL_DETECTION';

         me.detection_types = {
          LABEL_DETECTION: 'label',
          TEXT_DETECTION: 'text',
          LOGO_DETECTION: 'logo',
          LANDMARK_DETECTION: 'landmark'
        };

        $scope.collection = {
            selectedImage : ''
        };
        $scope.getImageSaveContact = function() {  
          var options = {
           maximumImagesCount: 10,
           width: 800,
           height: 800,
           quality: 80
          };

          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                $scope.collection.selectedImage = results[i];

                window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                    $scope.collection.selectedImage = base64;
                    $scope.addContact();    // Save contact
                });
              }
            }, function(error) {
              // error getting photos
            });
        }
    })

    .controller('HomeCtrl', function ($scope, Ingredients, myService) {
        $scope.selected_ingredients = [];
        $scope.searchKey = "";
        myService.reset_selected_ingredients();

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.ingredients = Ingredients.query();
        }

        $scope.search = function () {
            console.log($scope.searchKey)
            $scope.ingredients = Ingredients.query({name: $scope.searchKey});
        }

        $scope.ingredients = Ingredients.query();

        $scope.addItem = function(ingredient) {
            myService.set_selected_ingredients(ingredient);
            $scope.selected_ingredients = myService.get_selected_ingredients();
        }

        $scope.onItemDelete = function(selected_ingredient, myService) { 
            $scope.selected_ingredients.splice($scope.selected_ingredients.indexOf(selected_ingredient), 1);
        }

    })

    .controller('SearchCtrl', function($q, $scope, Recipes, myService) {
        $scope.sortFilter = {};
        $scope.categoryFilter = {};

        // 필터, 재료 보내는 함수
        $scope.setFilter = function () {
            $scope.recipes = Recipes.query({sortFilter: $scope.sortFilter.searchText,
                        categoryFilter: $scope.categoryFilter.searchText,
                        ingredients: myService.get_selected_ingredients()
                        });
        }
        
    })

    .controller('RecipeDetailCtrl', function ($scope, $stateParams, Ingredients) {
        console.log($stateParams)
        $scope.recipe = Recipes.get({name: $stateParams.name})
        // $scope.ingredients = Ingredients.get({ingredientId: $stateParams.ingredientId, data: 'reports'});
        // $scope.recipes = Recipes.get({name: $stateParams.name});
        console.log('RecipeDetailCtrl')
    });
