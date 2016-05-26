var Ingredient = require('../models/Ingredient');
var Recipe_ingredient = require('../models/Recipe_ingredient');

var temp = [];
var ingredient_id = [];
var ingredients = [];

exports.findIngredient_main = function (req, res, next) {
  // 재료 검색창 키워드
  var search_name = req.query.name;
  // 선택한 재료
  console.log(req.query)
  Recipe_ingredient.find(function(err, lists) {
    for(var i in lists) {
      if(lists[i].ingredient_type === 'main') {
        temp[temp.length] = lists[i].ingredient_id;
      }
    }
    for(var i in temp) {
      var check = true;
      if(i===0) {
        ingredient_id[i]=temp[i];
      }
      for(var j in ingredient_id) {
        if(temp[i]===ingredient_id[j]) {
          check = false;
        }
      }
      if(check!==false){
        ingredient_id[ingredient_id.length] = temp[i];
      }
    }
    for(var i in ingredient_id) {
      (function(i) {
        Ingredient.findById(ingredient_id[i], function(err, temp){
          var i_name = {"name":""};
          i_name.name = temp.name;
          ingredients[i] = i_name;
          if(i==ingredient_id.length-1) {
            if(search_name) {
              res.send(ingredients.filter(function(ingredients) {
                return (ingredients.name).indexOf(search_name) > -1;
              }));
            } else {
              res.send(ingredients);
            }
          }
        });
      })(i);
    }
  });
}
