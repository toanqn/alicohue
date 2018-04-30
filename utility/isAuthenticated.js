module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send('not authenticated');
  }
};

