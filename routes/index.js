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
  productController.showAll()
  .then((products) => {
    let anProducts = products.filter(product => ['000001', '000002', '000003', '000004'].includes(product.category));
    let pcccProducts = products.filter(product => ['000005', '000006', '000007'].includes(product.category));
    let csProducts = products.filter(product => ['000008', '000009', '000010', '000011'].includes(product.category));
    anProducts.length = Math.min(anProducts.length, 15);
    pcccProducts.length = Math.min(pcccProducts.length, 15);
    csProducts.length = Math.min(csProducts.length, 15);
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
  const { id } = req.query;
  productController.show(id)
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
  Promise.all([productController.showByCate(id), categoryController.getCateById(id)]) 
    .then(([products, category]) => {
      if (category) {
        res.render('category', {
          login: req.isAuthenticated(),
          category,
          products
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/search', (req, res) => {
  const { query } = req.query;
  productController.getProductByName(query)
    .then((products) => {
      console.log(query);
      console.log(products);
      res.render('category', {
        login: req.isAuthenticated(),
        products,
        category: {name: 'Kết quả'}
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//for add category
router.get('/addCategory', (req, res) => {
  res.render('addCategory', { 
    login: req.isAuthenticated(),
    title: 'Alicohue' 
  });
});

module.exports = router;
