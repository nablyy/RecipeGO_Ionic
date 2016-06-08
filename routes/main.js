var Recipe = require('../models/Recipe');

function wrap(callback) {
  callback();
}

exports.sortingLikes = function (req, res, next) {
  Recipe.find(function(error, lists){
    var result = [];
    for (var i = 0; i < lists.length-1; i++) {
      var max = i;
      for (var j = i+1; j < lists.length; j++) {
        if(lists[j].like > lists[max].like) {
          max = j;
        }
      }
      if(max != i) {
        var tmp = lists[i];
        lists[i] = lists[max];
        lists[max] = tmp;
      }
    }
    lists.slice(0, 20);
    console.log(lists);
    res.send(lists);
  });
}
