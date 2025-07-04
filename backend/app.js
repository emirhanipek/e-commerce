const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Remove global multer middleware - we'll apply it specifically to routes

const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const shopRouter = require('./routers/shop');

// Test endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'E-commerce Backend API is running!', 
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/register, /login',
            shop: '/products, /categories',
            user: '/cart, /orders'
        }
    });
});

app.use(authRouter);
app.use(userRouter);
app.use(shopRouter);

app.use('/public/img', express.static('./public/img'));
app.use(express.static(path.join(__dirname, 'public/img')));

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ahmetveli:ahmetveli@cluster0.a7ff9o2.mongodb.net/e-commerce?retryWrites=true&w=majority')
    .then(() => {
        app.listen(8000, () => {
            console.log('it is okey');
        });
    }).catch(err => { console.log(err) });

