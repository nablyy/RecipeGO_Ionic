var Recipe = require('../models/Recipe');

exports.sortingLikes = function (req, res, next) {
  Recipe.find(function(error, lists){
    for (var i = 0; i < lists.length-1; i++) {
      var max = i;
      for (var j = i+1; j < lists.length; j++) {
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
