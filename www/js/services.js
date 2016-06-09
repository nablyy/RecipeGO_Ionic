angular.module('recipeGo.services', ['ngResource'])

    .factory('Ingredients', function ($resource) {
        return $resource('https://ancient-escarpment-45607.herokuapp.com/ingredients');
    })
    .factory('Recipes', function($resource) {
    	return $resource('https://ancient-escarpment-45607.herokuapp.com/recipes/:recipeId');
    })
    .factory('Like', function($resource) {
    	return $resource('https://ancient-escarpment-45607.herokuapp.com/likes');
    })
    .factory('Main', function($resource) {
    	return $resource('https://ancient-escarpment-45607.herokuapp.com/main');
    })
    .factory('Vision', function($resource) {
    	return $resource('https://ancient-escarpment-45607.herokuapp.com/vision');
    });
