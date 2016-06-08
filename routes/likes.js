var Recipe = require('../models/Recipe');

exports.addLikes = function (req, res, next) {
  Recipe.findById(req.query.likeRecipe, function(error, recipe){
    recipe.like = recipe.like+1;
    recipe.save(function(error) {
      if(error) {
        console.log(error);
      }
    });
  });
}

exports.sortingLikes = function (req, res, next) {
  Recipe.find(function(error, lists){
    for (var i = 0; i < lists.length-1; i++) {
      var max = i;
      for (var j = i+1; j < length; j++) {
        if(lists[j].like > lists[max].like) {
          max = j;
        }
      }
      if(min != i) {
        var tmp = lists[i];
        lists[i] = lists[max];
        lists[max] = tmp;
      }
    }
    console.log(lists);
    res.send(lists);
  });
}
