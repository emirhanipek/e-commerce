const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/user');
const { verifyToken } = require('../utility/jwt');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    }, 
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

// Multer upload configuration for multiple files (max 10 images)
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
        files: 10 // Max 10 files
    },
    fileFilter: (req, file, cb) => {
        // Only allow image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

router.get('/product/user/:userId', verifyToken, userController.getProductsByUserId);

// Product routes with multiple image support
router.post('/product', verifyToken, upload.array('images', 10), userController.addProduct);

router.delete('/product/:productId', verifyToken, userController.deleteProduct);

router.put('/product', verifyToken, upload.array('images', 10), userController.updateProduct);

// Test endpoint for multiple image upload
router.post('/test-upload', upload.array('images', 10), (req, res) => {
    try {
        res.json({
            message: 'Images uploaded successfully!',
            filesCount: req.files ? req.files.length : 0,
            files: req.files ? req.files.map(file => ({
                filename: file.filename,
                originalname: file.originalname,
                size: file.size,
                mimetype: file.mimetype
            })) : [],
            body: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Upload test failed',
            error: error.message
        });
    }
});

module.exports = router;