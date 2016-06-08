angular.module('recipeGo.controllers', [])
  .service('myService', function() {
      var selected_ingredients = [];
      var result_recipes = [];
      var recipe_index;
      var visionResult = [];
      var list_recipe = [];
      var sorted_recipes = [];
      return {
          set_selected_ingredients: function(selected) {
              selected_ingredients.push(selected);
          },
          get_selected_ingredients: function() {
              return selected_ingredients;
          },
          reset_selected_ingredients: function() {
              selected_ingredients = [];
          },
          set_recipes: function(recipes) {
              result_recipes = recipes;
          },
          get_recipes: function() {
              return result_recipes;
          },
          set_visionResult: function(result) {
            visionResult = result;
          },
          get_visionResult: function() {
            return visionResult;
          },
          set_recipe: function(recipe) {
            list_recipe = [];
            list_recipe = recipe;
          },
          get_recipe: function() {
            return list_recipe;
          },
          set_sortedRecipes: function(s_recipes) {
            sorted_recipes = s_recipes;
          },
          get_sortedRecipes: function() {
            return sorted_recipes;
          }
      };
  })

  .controller('ThisCtrl', function($scope, Vision, myService, $ionicModal) {

      var CV_URL = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;

      $(document).ready(function() {
        $('#fileform').on('submit', uploadFiles);
      });

      /**
       * 'submit' event handler - reads the image bytes and sends it to the Cloud
       * Vision API.
       */
      function uploadFiles(event) {
        event.preventDefault(); // Prevent the default form post

        // Grab the file and asynchronously convert to base64.
        var file = $('#fileform [name=fileField]')[0].files[0];
        var reader = new FileReader();
        reader.onloadend = processFile;
        reader.readAsDataURL(file);
      }

      /**
       * Event handler for a file's data url - extract the image data and pass it off.
       */
      function processFile(event) {
        var content = event.target.result;
        sendFileToCloudVision(
            content.replace("data:image/jpeg;base64,", ""));
      }

      /**
       * Sends the given file contents to the Cloud Vision API and outputs the
       * results.
       */
      function sendFileToCloudVision(content) {
        // var type = $("#fileform [name=type]").val();

        // Strip out the file prefix when you convert to json.
        var request = {
          requests: [{
            image: {
              content: content
            },
            features: [{
              type: 'LABEL_DETECTION',
              maxResults: 200
            }]
          }]
        };

        $('#results').text('Loading...');
        $.post({
          url: CV_URL,
          data: JSON.stringify(request),
          contentType: 'application/json'
          }).fail(function(jqXHR, textStatus, errorThrown) {
            $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
          }).done(displayJSON);
        }

        /**
         * Displays the results.
         */
        function displayJSON(data) {
          var contents = JSON.stringify(data, null, 4);
          console.log(contents)
          ///////////////////////////////////////////////////////서버에 결과 전달
          $scope.visionResults = Vision.query({visionResult: contents});
          myService.set_visionResult($scope.visionResults);
          console.log($scope.visionResults)
          $("#results").text(contents);
        }

        $ionicModal.fromTemplateUrl('my-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
        $scope.openModal = function() {
          $scope.visionResults = myService.get_visionResult();
          $scope.modal.show();
        };
        $scope.closeModal = function() {
          $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
        });
  })
  .controller('HomeCtrl', function ($scope, myService, Main) {
    $scope.sortedRecipes = Main.query();
    console.log($scope.sortedRecipes)
  })

  .controller('SelectCtrl', function ($scope, Ingredients, myService, $ionicModal) {
    $scope.visionResults = myService.get_visionResult();
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
      if (ingredient.id != null) {
        myService.set_selected_ingredients(ingredient);
        $scope.selected_ingredients = myService.get_selected_ingredients();
      }
    }

    $scope.onItemDelete = function(selected_ingredient, myService) { 
        $scope.selected_ingredients.splice($scope.selected_ingredients.indexOf(selected_ingredient), 1);
    }
  })

  .controller('SearchCtrl', function($scope, Recipes, myService) {
      $scope.sortFilter = {};
      $scope.categoryFilter = {};

      // 필터, 재료 보내는 함수
      $scope.setFilter = function () {
          $scope.recipes = Recipes.query({sortFilter: $scope.sortFilter.searchText,
                      categoryFilter: $scope.categoryFilter.searchText,
                      ingredients: myService.get_selected_ingredients()
                      });
          // $scope.recipesObj = JSON.parse($scope.recipes);
          myService.set_recipes($scope.recipes);
          console.log($scope.recipes)
      }
      $scope.sendRecipe = function(recipe) {
          myService.set_recipe(recipe);
      }
  })

  .controller('ListCtrl', function($scope, Recipes, myService, Like) {
      $scope.recipe = myService.get_recipe();
      $scope.sendLike = function(recipe_id) {
        console.log(recipe_id)
        $scope.likeRecipe = Like.query({likeRecipe: recipe_id});
      }

  })

  .controller('RecipeDetailCtrl', function ($scope, $stateParams, Recipes) {

    $scope.recipe = Recipes.get({recipeId: $stateParams.recipeId});
  });
