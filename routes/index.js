const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const markdown = require( "markdown" ).markdown;
const productController = require('../controller/productController/controller');
const adminController = require('../controller/adminController/controller');
const categoryController = require('../controller/categoryController/controller')
const isAuthenticated = require('../utility/isAuthenticated');

/* GET home page. */
router.get('/', function(req, res, next) {
  let anProducts = [];
  let pcccProduts = []
  let csProducts = [];

  productController.showAll()
  .then((products) => {
    anProducts = products.filter(product => ['000001', '000002', '000003', '000004'].includes(product.category));
    pcccProducts = products.filter(product => ['000005', '000006', '000007'].includes(product.category));
    csProducts = products.filter(product => ['000008', '000009', '000010', '000011'].includes(product.category));
    res.render('index', { 
      login: req.isAuthenticated(),
      title: 'Alicohue',
      anProducts: anProducts,
      pcccProducts: pcccProducts,
      csProducts: csProducts,
    });
  })
  .catch((err) => {
    res.send(err);
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { 
    login: req.isAuthenticated(),
    title: 'Alicohue' 
  });
});

router.get('/about', (req, res) => {
  res.render('about', { 
    login: req.isAuthenticated(),
    title: 'Alicohue' 
  });
});

router.get('/profile', (req, res) => {
  res.render('profile', { 
    login: req.isAuthenticated(),
    title: 'Alicohue' 
  });
});

router.get('/addProduct', isAuthenticated, (req, res) => {
  res.render('addProduct', { 
    login: req.isAuthenticated(),
    title: 'Alicohue' 
  });
});

router.get('/editProduct', isAuthenticated, (req, res) => {
  const { idProduct } = req.query;
  productController.show(idProduct)
    .then((product) => {
      res.render('editProduct', { 
        login: req.isAuthenticated(),
        title: 'Alicohue',
        product
      });
    })
    .catch(err => res.send(err));
});

router.get('/manageProduct', isAuthenticated, (req, res) => {
  let anProducts = [];
  let pcccProduts = []
  let csProducts = [];

  productController.showAll()
  .then((products) => {
    anProducts = products.filter(product => ['000001', '000002', '000003', '000004'].includes(product.category));
    pcccProducts = products.filter(product => ['000005', '000006', '000007'].includes(product.category));
    csProducts = products.filter(product => ['000008', '000009', '000010', '000011'].includes(product.category));
    res.render('manageProduct', { 
      login: req.isAuthenticated(),
      title: 'Alicohue',
      anProducts,
      pcccProducts,
      csProducts,
    });
  })
  .catch(err => res.send(err));
});

router.get('/detail', (req, res) => {
  const { id } = req.query;
  productController.show(id)
    .then((product) => {
      product.detail = markdown.toHTML(product.detail);
      res.render('detail', {
        login: req.isAuthenticated(),
        product
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/category', (req, res) => {
  const { id } = req.query;
  Promise.all(productController.showByCate(id), categoryController.getCateById(id)) 
    .then(([products, category]) => {
      res.render('detail', {
        login: req.isAuthenticated(),
        category,
        products
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
