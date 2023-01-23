var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  housenumber: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  iban: {
    type: String,
    required: false,
  },
  cardnumber: {
    type: String,
    required: false,
  },
  cardexpire: {
    type: String,
    required: false,
  },
  cardcvc: {
    type: String,
    required: false,
  },
  paypalmail: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
