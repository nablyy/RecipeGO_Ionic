var Ingredient = require('../models/Ingredient');
var Recipe_ingredient = require('../models/Recipe_ingredient');
var Recipe = require('../models/Recipe');

exports.searchRecipe = function searchRecipe(req, res, next) {
  var ingredients = [];
  var ingredients_id = [];
  var ingredients_name = [];
  var recipes_id = [];
  var recipes = [];

  var select = [];
  var sortFilter = [];
  var temp = [];

  select = req.query.ingredients;
  sortFilter = req.query.sortFilter;

  console.log(sortFilter);

  // parse select
  if(select[0]=='{') {
    temp[0] = JSON.parse(select);
  } else {
    for(var i in select) {
      temp[i] = JSON.parse(select[i]);
    }
  }

  // if ingredient name is duplicate, remove it
  for(var i in temp) {
    var check = true;
    if(i===0) {
      ingredients[i]=temp[i];
    }
    for(var j in ingredients) {
      if(temp[i].name===ingredients[j].name) {
        check = false;
      }
    }
    if(check!==false){
      ingredients[ingredients.length] = temp[i];
    }
  }

  Ingredient.find(function(error, lists) {
    for(var j in lists) {
      for(var i in ingredients) {
        if(lists[j].name==ingredients[i].name) {
          ingredients_name[ingredients_name.length] = lists[j].name;
          ingredients_id[ingredients_id.length] = lists[j].id;
        }
      }
    }
    console.log(ingredients_id);
    console.log(ingredients_name);
    console.log('--------------');
    Recipe_ingredient.find(function(error, lists) {
      var temp = [];
      for(var j in lists) {
        for(var i in ingredients_id) {
          if(lists[j].ingredient_id==ingredients_id[i]) {
            temp[temp.length] = lists[j].recipe_id;
          }
        }
      }
      console.log(temp);
      console.log('------------');

      // 중복제거
      for(var i in temp) {
        var check = true;
        if(i===0) {
          recipes_id[i]=temp[i];
        }
        for(var j in recipes_id) {
          if(temp[i]===recipes_id[j]) {
            check = false;
          }
        }
        if(check!==false){
          recipes_id[recipes_id.length] = temp[i];
        }
      }

      // 레시피 아이디를 이용하여 레시피 찾기
      Recipe.find(function(error, lists) {
        for(var j in lists) {
          for(var i in recipes_id) {
            if(lists[j].id==recipes_id[i]) {
              recipes[recipes.length] = lists[j];
            }
          }
        }

        // 순서 필터 적용
        var length = recipes.length;
        if(sortFilter=='간단한순으로') {
          for (var i = 0; i < length-1; i++) {
            var min = i;
            for (var j = i+1; j < length; j++) {
              if(recipes[j].order_count < recipes[min].order_count) {
                min = j;
              }
            }
            if(min != i) {
              var tmp = recipes[i];
              recipes[i] = recipes[min];
              recipes[min] = tmp;
            }
          }
        } else if(sortFilter=='복잡한순으로') {
          for (var i = 0; i < length-1; i++) {
            var max = i;
            for (var j = i+1; j < length; j++) {
              if(recipes[j].order_count > recipes[max].order_count) {
                max = j;
              }
            }
            if(min != i) {
              var tmp = recipes[i];
              recipes[i] = recipes[max];
              recipes[max] = tmp;
            }
          }
        }
        console.log(recipes);
        res.send(recipes);

      });
    });
  });

}
