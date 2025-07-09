const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const jwt = require('../utility/jwt');

// Tüm kategorileri getir (public endpoint)
router.get('/categories', categoryController.getCategories);

// Belirli bir kategoriyi ID'ye göre getir (public endpoint)
router.get('/categories/:id', categoryController.getCategoryById);

// Yeni kategori oluştur (yalnızca admin)
router.post('/categories', jwt.verifyToken, jwt.isAdmin, categoryController.createCategory);

// Kategori güncelle (yalnızca admin)
router.put('/categories/:id', jwt.verifyToken, jwt.isAdmin, categoryController.updateCategory);

// Kategori sil (yalnızca admin)
router.delete('/categories/:id', jwt.verifyToken, jwt.isAdmin, categoryController.deleteCategory);

module.exports = router;
