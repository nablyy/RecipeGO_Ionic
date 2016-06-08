var Recipe = require('../models/Recipe');

exports.sortingLikes = function (req, res, next) {
  Recipe.findById(req.query.likeRecipe, function(error, recipe){
    recipe.like = recipe.like+1;
    recipe.save(function(error) {
      if(error) {
        console.log(error);
      }
    });
  });
}
