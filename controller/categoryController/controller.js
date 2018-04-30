const ObjectId = require('mongoose').Types.ObjectId;
const product = require('./schema');

// get product by id
const getCateById = function (id) {
  return product.findOne({ id: id });
};


module.exports = {
  getCateById,
};
