var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true, unique: true}
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true}
});

var Ingredient = mongoose.model('Ingredient', schema);

module.exports = Ingredient;
