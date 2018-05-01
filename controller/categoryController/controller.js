const ObjectId = require('mongoose').Types.ObjectId;
const category = require('./schema');

// get product by id
const getCateById = function (id) {
  return category.findOne({ id: id });
};

const createItem = function (item) {
  return category.insertMany(item);
};

module.exports = {
  getCateById,
  createItem
};
