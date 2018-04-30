const adminModel = require('./schema');

const createUser = function (info) {
  return adminModel.insertMany(info);
};

const findUserByUsername = function (username) {
  return adminModel.findOne({ username });
};

module.exports = {
  createUser,
  findUserByUsername,
};
