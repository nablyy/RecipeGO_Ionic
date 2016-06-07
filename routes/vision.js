var Ingredient = require('../models/Ingredient');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.mappingVision = function (req, res, next) {

  var visionResult = req.query.visionResult;
  var parseResult = JSON.parse(visionResult);

  var url = 'http://endic.naver.com/search.nhn?sLn=kr&searchOption=all&query=';
  var text = [];
  var count = [];

  for(var i in parseResult.responses[0].labelAnnotations) {
    url = url+parseResult.responses[0].labelAnnotations[i].description;
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var temp = $('#content > div:nth-child(4) > dl > dd:nth-child(2) > div > p:nth-child(1) > span.fnt_k05').text();
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
