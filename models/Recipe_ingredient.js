var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  recipe_id: {type: String, required: true},
  ingredient_id: {type: String, required: true},
  // main, sub, season - 3 types
  ingredient_type: {type: String, required: true},
  ingredient_amount: {type: String, required: true}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Recipe_ingredient = mongoose.model('Recipe_ingredient', schema);

module.exports = Recipe_ingredient;
