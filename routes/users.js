const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const productController = require('../controller/productController/controller');
const adminController = require('../controller/adminController/controller');
const categoryController = require('../controller/categoryController/controller');
const isAuthenticated = require('../utility/isAuthenticated');

/* GET users listing. */
router.post('/saveProduct',  (req, res) => {
  const item = {
    name: req.body.name,
    price: req.body.price,
    detail: req.body.detail,
    category: req.body.categoryId,
    img: req.body.img
  };
  productController.createItem(item)
    .then((success) => {
      res.redirect('/addProduct');
    }).catch(err => res.send(err));
});

router.post('/updateProduct', (req, res) => {
  const idProduct = req.body.idProduct;
  productController.show(idProduct)
    .then((success) => {
      success.name = req.body.name;
      success.price = req.body.price;
      success.detail = req.body.detail;
      success.category = req.body.categoryId;
      success.img = req.body.img;
      success.save((err) => {
        if (err) throw err;
        console.log(`Update product ${idProduct} successfull!`);
      });
      res.redirect('/manageProduct');
    })
    .catch(err => res.send(err));
})

router.post('/deleteProduct', (req, res) => {
  const id = req.body.id;
  productController.deleteProduct(id)
    .then((success) => {
      console.log(`Remove item ${id} from products successfull!`);
    res.redirect('/manageProduct');
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Login successfull!');
  res.redirect('/');
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/signup', (req, res) => {
  bcrypt.hash('123456', 10)
  .then((encodePwd) => {
    adminController.createUser({
      username: 'admin',
      pwd: encodePwd,
      email: 'admin@alicohue.com'
    })
    .then((success) => {
      console.log('Register successfull!');
      res.redirect('/');
    })
    .catch((err) => {
      res.send('Error');
    })
  })
});

//test
router.post('/createCategory',  (req, res) => {
  const item = {
    id: req.body.id,
    name: req.body.name,
  };
  categoryController.createItem(item)
    .then((success) => {
      res.redirect('/addCategory');
    }).catch(err => res.send(err));
});

module.exports = router;
