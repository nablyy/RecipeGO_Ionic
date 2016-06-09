var Recipe_ingredient = require('../models/Recipe_ingredient');
var Recipe = require('../models/Recipe');
var	_ = require('lodash');

exports.searchRecipe = function searchRecipe(req, res, next) {
  var ingredients = [];
  var ingredients_name = [];
  var recipes_id = [];
  var recipes = [];

  var select = [];
  var sortFilter = [];
  var temp = [];

  select = req.query.ingredients;
  sortFilter = req.query.sortFilter;

  console.log(sortFilter);

  // 선택한 재료 리스트 파싱
  if(select[0]=='{') {
    temp[0] = JSON.parse(select);
  } else {
    for(var i in select) {
      temp[i] = JSON.parse(select[i]);
    }
  }

  // 재료 이름이 중복 되었을 경우 중복제거
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
  // 재료 이름 배열 추가
  for(var i in ingredients) {
    ingredients_name[i] = ingredients[i].name;
  }
  console.log('name: '+ingredients_name);

  Recipe_ingredient.find(function(error, lists) {
    var temp = [];
    for(var j in lists) {
      for(var i in ingredients) {
        if(lists[j].ingredient_id==ingredients[i].id) {
          temp[temp.length] = lists[j].recipe_id;
        }
      }
    }

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

      var checkSum = [];
      for(var i in recipes) {
        for(var j in ingredients_name) {
          var check = _.includes(recipes[i].main_ingredient, ingredients_name[j]);
          if(check===true) {
            checkSum[checkSum.length] = true;
          }
          console.log(ingredients_name);
        }
        if(checkSum.length===ingredients_name.length) {
          console.log(checkSum.length+':'+ingredients_name.length);
        } else {
          console.log(checkSum.length+':'+ingredients_name.length);
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
      console.log(recipes.length);
      res.send(recipes);

    });
  });

}
