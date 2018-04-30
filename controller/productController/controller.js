const ObjectId = require('mongoose').Types.ObjectId;
const product = require('./schema');

const createItem = function (item) {
  return product.insertMany(item);
};

//get8Products
const showAll = function () {
  return product.find({});
};
// get product by id
const show = function (id) {
  return product.findOne({ _id: id });
};

const createProduct = function (item) {
  return product.insertMany(item);
};

const deleteProduct = function (id) {
  return product.findOneAndRemove({ _id: id });
};

const showByCate = function (cateId) {
  return product.find({ category: cateId });
};

const getProductByName = function (text) {
  return product.find({ 'name': { $regex: `.*${text}*.` } });   // eslint-disable-line
};

module.exports = {
  createItem,
  show,
  showAll,
  showByCate,
  createProduct,
  deleteProduct,
  getProductByName,
};
