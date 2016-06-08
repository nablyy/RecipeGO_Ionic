var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, unique: true},
  img: {type: String, required: true},
  amount: {type: String, required: true},
  order_count: {type: Number, required: true},
  ingredient_count: {type: Number, required: true},
  like: {type: Number, default: 0},
  main_ingredient: [String],
  season_ingredient: [String],
  main_amount: [String],
  season_amount: [String],
  order_list: [String]

}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Recipe = mongoose.model('Recipe', schema);

module.exports = Recipe;
