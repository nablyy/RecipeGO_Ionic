var Ingredient = require('../models/Ingredient');
var Recipe_ingredient = require('../models/Recipe_ingredient');
var Recipe_name = require('../models/Recipe_name');

var fs = require('fs');

// read all recipes
function readFile(callback) {
  fs.readFile('./models/items.json', 'utf8', function(error, data) {
    if(error) {
      console.log(error);
    } else {
      var temp = [];
      var obj = [];
      // parse JSON data list
      var array = data.split("\n");
      for(var i=0; i < array.length-1; i++) {
        temp[i] = JSON.parse(array[i]);
      }
      // if recipe name is duplicate, remove its list
      for(var i in temp) {
        var check = true;
        if(i===0) {
          obj[i]=temp[i];
        }
        for(var j in obj) {
          if(temp[i].name===obj[j].name) {
            check = false;
          }
        }
        if(check!==false){
          obj[obj.length] = temp[i];
        }
      }
      callback(obj);
    }
  });
}

exports.searchRecipe = function searchRecipe(req, res, next) {
  var ingredients = [];
  var ingredients_id = [];
  var ingredients_name = [];
  var recipes_id = [];
  var recipes_name = [];
  var obj = [];
  var last = [];

  var select = [];
  var sortFilter = [];
  var categoryFilter = [];
  var temp = [];

  select = req.query.ingredients;
  sortFilter = req.query.sortFilter;
  categoryFilter = req.query.categoryFilter;

  console.log(sortFilter);
  console.log(categoryFilter);

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

  Ingredient.find(function(err, lists) {
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
    Recipe_ingredient.find(function(err, lists) {
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

      // 카테고리 필터 적용한 레시피 아이디 탐색
      Recipe_name.find(function(err, lists) {
        for(var j in lists) {
          for(var i in recipes_id) {
            if(lists[j].id==recipes_id[i]) {
              if(lists[j].field==categoryFilter) {
                recipes_name[recipes_name.length] = lists[j];
              }
            }
          }
        }

        // 순서 필터 적용
        var length = recipes_name.length;
        if(sortFilter=='간단한순으로') {
          for (var i = 0; i < length-1; i++) {
            var min = i;
            for (var j = i+1; j < length; j++) {
              if(recipes_name[j].order_count < recipes_name[min].order_count) {
                min = j;
              }
            }
            if(min != i) {
              var tmp = recipes_name[i];
              recipes_name[i] = recipes_name[min];
              recipes_name[min] = tmp;
            }
          }
        } else if(sortFilter=='복잡한순으로') {
          for (var i = 0; i < length-1; i++) {
            var max = i;
            for (var j = i+1; j < length; j++) {
              if(recipes_name[j].order_count > recipes_name[max].order_count) {
                max = j;
              }
            }
            if(min != i) {
              var tmp = recipes_name[i];
              recipes_name[i] = recipes_name[max];
              recipes_name[max] = tmp;
            }
          }
        }

        readFile(function(obj) {
          for(var j=0; j<obj.length; j++) {
            for(var i=0; i<recipes_name.length; i++) {
              if(obj[j].name==recipes_name[i].name) {
                last[i] = obj[j];
              }
            }
          }
          console.log(last);
          res.send(last);
        });
      });
    });
  });

}
