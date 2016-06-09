var Ingredient = require('../models/Ingredient');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

function wrap(callback) {
  callback();
}

// 비전
exports.mappingVision = function (req, res, next) {

  var visionResult = req.query.visionResult;
  var parseResult = JSON.parse(visionResult);

  // 공백 제거
  for(var i in parseResult.responses[0].labelAnnotations) {
    parseResult.responses[0].labelAnnotations[i].description =
      parseResult.responses[0].labelAnnotations[i].description.replace(' ', "");
  }

  var base = 'http://endic.naver.com/search.nhn?sLn=kr&searchOption=all&query=';
  var text = [];
  var result = [];
  var url = [];
  var count = [];

  for(var i in parseResult.responses[0].labelAnnotations) {
    var url = base+parseResult.responses[0].labelAnnotations[i].description;
    console.log(url);
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var temp = $('.align_right').children().first().find('.fnt_k05').first().text();
        if(temp!=='') {
          text[text.length] = temp;
        }
        count[count.length] = temp;
      }
      if(count.length===parseResult.responses[0].labelAnnotations.length) {
        for(var i in text) {
          wrap(function() {
            var empty = {"name":null, "id":null};
            empty.name = text[i];
            result[i] = empty;
          });
        }
        Ingredient.find(function(error, lists) {
          for(var i in lists) {
            for(var j in result) {
              if(lists[i].name===result[j].name) {
                console.log('same!! '+lists[i].name+' : '+text[j]);
                result[j].id = lists[i].id;
              }
            }
          }
          console.log(result);
          res.send(result);
        });
      }
    });
  }
}
