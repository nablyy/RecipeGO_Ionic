angular.module('recipeGo.controllers', [])
  .service('myService', function() {
      var selected_ingredients = [];
      var result_recipes = [];
      var recipe_index;
      var visionResult = [];
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
          set_index: function(index) {
              recipe_index = index;
          },
          get_index: function() {
              return recipe_index;
          },
          set_visionResult: function(result) {
            visionResult = result;
          },
          get_visionResult: function() {
            return visionResult;
          }
      };
  })

  .controller('ThisCtrl', function($scope, Vision, myService) {

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
          myService.set_visionResult(contents);
          console.log(contents)
          ///////////////////////////////////////////////////////서버에 결과 전달
          $scope.visionResult = Vision.query({visionResult: contents});
          $("#results").text(contents);
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

  .controller('SearchCtrl', function($scope, Recipes, myService) {
      $scope.sortFilter = {};
      $scope.categoryFilter = {};

      // 필터, 재료 보내는 함수
      $scope.setFilter = function () {
          $scope.recipes = Recipes.query({sortFilter: $scope.sortFilter.searchText,
                      categoryFilter: $scope.categoryFilter.searchText,
                      ingredients: myService.get_selected_ingredients()
                      });
          myService.set_recipes($scope.recipes);
          console.log($scope.recipes)
      }
      $scope.sendIndex = function(index) {
          myService.set_index(index);
      }
      
  })

  .controller('ListCtrl', function($scope, Recipes, myService) {
      $scope.index = myService.get_index();
      $scope.recipes = myService.get_recipes();

  })

  .controller('RecipeDetailCtrl', function ($scope, $stateParams, Ingredients) {
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
      var type = $("#fileform [name=type]").val();

      // Strip out the file prefix when you convert to json.
      var request = {
        requests: [{
          image: {
            content: content
          },
          features: [{
            type: type,
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
        $("#results").text(contents);
      }
  });
