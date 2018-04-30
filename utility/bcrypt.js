const bcrypt = require('bcrypt');

const comparePassword = function (password, encodePassword) {
  return bcrypt.compare(password, encodePassword);
};

module.exports = {
  comparePassword,
};
