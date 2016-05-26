var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  recipe_id: {type: String, required: true},
  order_number: {type: Number, required: true},
  order: {type: String, required: true}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Recipe_order = mongoose.model('Recipe_order', schema);

module.exports = Recipe_order;
