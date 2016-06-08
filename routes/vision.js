var Ingredient = require('../models/Ingredient');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

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
        console.log(text);
        res.send(text);
      }
    });
  }
}
