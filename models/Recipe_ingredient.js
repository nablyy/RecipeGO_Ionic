var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  recipe_id: {type: String, required: true},
  ingredient_id: {type: String, required: true}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Recipe_ingredient = mongoose.model('Recipe_ingredient', schema);

module.exports = Recipe_ingredient;
