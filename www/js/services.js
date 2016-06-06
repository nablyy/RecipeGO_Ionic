angular.module('recipeGo.services', ['ngResource'])

    .factory('Ingredients', function ($resource) {
        return $resource('https://gentle-shelf-38663.herokuapp.com/ingredients');
    })
    .factory('Recipes', function($resource) {
    	return $resource('https://gentle-shelf-38663.herokuapp.com/recipes/:name');
    })
    .factory('$cordovaImagePicker', ['$q', '$window', function ($q, $window) {

		  return {
		    getPictures: function (options) {
		      var q = $q.defer();

		      $window.imagePicker.getPictures(function (results) {
		        q.resolve(results);
		      }, function (error) {
		        q.reject(error);
		      }, options);

		      return q.promise;
		    }
		  };
		}]);