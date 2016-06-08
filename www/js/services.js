angular.module('recipeGo.services', ['ngResource'])

    .factory('Ingredients', function ($resource) {
        return $resource('/ingredients');
    })
    .factory('Recipes', function($resource) {
    	return $resource('/recipes/:recipeId');
    })
    .factory('Like', function($resource) {
    	return $resource('/likes');
    })
    .factory('Main', function($resource) {
    	return $resource('/main');
    })
    .factory('Vision', function($resource) {
    	return $resource('/vision');
    });