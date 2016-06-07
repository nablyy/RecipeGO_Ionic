var Ingredient = require('../models/Ingredient');

exports.findIngredient_main = function (req, res, next) {
  // 재료 검색창 키워드
  var search_name = req.query.name;
  var visionResult = req.query.visionResult;

  Ingredient.find(function(error, ingredients) {
    if(search_name) {
      res.send(ingredients.filter(function(ingredients) {
        return (ingredients.name).indexOf(search_name) > -1;
      }));
    } else {
      res.send(ingredients);
    }
  });
}
