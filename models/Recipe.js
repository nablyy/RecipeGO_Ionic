var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, unique: true},
  img: {type: String, required: true},
  amount: {type: String, required: true},
  order_count: {type: Number, required: true},
  like: {type: Number, default: 0},
  main_ingredient: {type: String, required: true},
  season_ingredient: {type: String, required: true},
  main_amount: {type: String, required: true},
  season_amount: {type: String, required: true},
  order_list: {type: String, required: true}

}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Recipe = mongoose.model('Recipe', schema);

module.exports = Recipe;
