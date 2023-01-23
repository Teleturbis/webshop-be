var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const cartScheam = new Schema({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartScheam);

module.exports = Cart;
