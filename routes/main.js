var Recipe = require('../models/Recipe');

exports.sortingLikes = function (req, res, next) {
  Recipe.find(function(error, lists){
    var result = lists.slice(0, 20);
    for (var i = 0; i < result.length-1; i++) {
      var max = i;
      for (var j = i+1; j < result.length; j++) {
        if(result[j].like > result[max].like) {
          max = j;
        }
      }
      if(max != i) {
        var tmp = result[i];
        result[i] = result[max];
        result[max] = tmp;
      }
    }
    res.send(result);
  });
}
