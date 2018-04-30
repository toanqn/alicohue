const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const schema = mongoose.Schema;

const categorySchema = new schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('category', categorySchema);
