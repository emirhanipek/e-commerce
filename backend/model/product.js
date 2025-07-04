const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },
    imgUrl: String, // Ana resim (backward compatibility için)
    images: [String], // Birden fazla resim için array
    date: {
        type: String,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);