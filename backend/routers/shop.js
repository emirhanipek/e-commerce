const express = require('express');
const router = express.Router();

const shopcontrollers = require('../controllers/shop');
const { verifyToken } = require('../utility/jwt');

router.get('/product', shopcontrollers.getProducts);

router.get('/product/:productId', shopcontrollers.getProductById);

router.get('/categories', shopcontrollers.getCategories);

router.get('/product/category/:categoryId', shopcontrollers.getProductsByCategoryId);

router.get('/product/category/:categoryId/price/:lowest/:highest', shopcontrollers.getProductsByPrice);

router.get('/cart/:userId', verifyToken, shopcontrollers.getCart);

router.post('/cart', verifyToken, shopcontrollers.addToCart);

router.delete('/cart/:userId/:productId', verifyToken, shopcontrollers.deleteCartItem);

router.get('/order/:userId', verifyToken, shopcontrollers.getOrder);

router.post('/order', verifyToken, shopcontrollers.addToOrder);

module.exports = router;