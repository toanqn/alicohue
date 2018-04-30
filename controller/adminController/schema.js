const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Email is Invalid',
  }),
];

var adminSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator,
  }
});

adminSchema.methods.validPassword = function(pwd){
  return bcrypt.compareSync(pwd, this.pwd);
}

module.exports = mongoose.model('admin', adminSchema);
