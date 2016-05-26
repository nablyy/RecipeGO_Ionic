angular.module('recipeGo.services', ['ngResource'])

    .factory('Ingredients', function ($resource) {
        return $resource('/ingredients');
    });
    .factory('Recipes', function($resource) {
    	return $resource('/recipes');
    });