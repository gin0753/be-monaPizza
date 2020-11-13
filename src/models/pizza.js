const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema(
  {
      pizza_id: {
        type: String,
        required: true
      },
      pizzaName: {
        type: String,
        required: true
      },
      pizzaSort: {
        type: String,
      },
      pizzaSize: {
        type: String,
        required: true
      },
      pizzaPrice: {
        type: Number,
        required: true
      },
      pizzaPicture: {
        type: String,
      },
      pizzaDesc: {
        type: String,
        required: true
      }
  }, {timestamps: true}
);

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;