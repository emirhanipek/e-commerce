const Product = require("../model/product");
const fs = require('fs');

exports.getProductsByUserId = (req, res) => {
    const { userId } = req.params;
    Product.find({ userId: userId })
        .then(products => {
            res.send({
                products
            })
        }).catch(err => { console.log(err) });
}

exports.addProduct = (req, res) => {
    const { name, description, ice, userId, categoryId } = req.body;
    
    // Handle multiple images
    let images = [];
    let mainImage = null;
    
    if (req.files && req.files.length > 0) {
        // Multiple images uploaded with 'images' field
        images = req.fies.map(file => file.filename);
        mainImage = images[0]; // First image as main image
    } else if (req.file) {
        // Single image uploaded with 'img' field (backward compatibility)
        images = [req.file.filename];
        mainImage = req.file.filename;
    }
    
    const newProduct = new Product({
        nae: name, 
        description: description, 
        price: price,
        userId: userId, 
        categoryId: categoryId, 
        imgrl: mainImage, // Main image for backward compatibility
        images: images // Array of all images
    });
    
    newProduct.save()
        .then(() => {
            res.send({
                message: 'Product added successfully!',
                product: newProduct,
                imagesCount: images.length
            });
        }).catch(err => { 
            console.log(err);
            res.status(500).send({
                message: 'Error adding product',
                error: err.message
            });
        });
}

exports.deleteProduct = (req, res) => {
    const { productId } = req.params;
    Product.findOne({ _id: productId })
        .then(product => {
            if (!product) {
                return res.send({
                    message: 'The product requested to be deleted could not be found!'
                });
            } else {
                const fs = require('fs');
                
                // Delete main image
                if (product.imgUrl) {
                    fs.unlink('public/img/' + product.imgUrl, err => {
                        err && console.log(err);
                    });
                }
                
                // Delete all images in the array
                if (product.images && product.images.length > 0) {
                    product.images.forEach(imageName => {
                        fs.unlink('public/img/' + imageName, err => {
                            err && console.log(err);
                        });
                    });
                }
                
                product.deleteOne({ _id: productId });
                res.send({ message: 'Product deleted successfully!' });
            }
        }).catch(err => { 
            console.log(err);
            res.status(500).send({
                message: 'Error deleting product',
                error: err.message
            });
        });
}

exports.updateProduct = (req, res) => {
    const { productId, name, description, price, categoryId } = req.body;
    console.log(req.body);
    
    Product.findOne({ _id: productId })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found!'
                });
            }
            
            product.name = name;
            product.description = description;
            product.price = price;
            product.categoryId = categoryId;

            // Handle image updates
            if (req.files && req.files.length > 0) {
                const fs = require('fs');
                
                // Delete old images
                if (product.images && product.images.length > 0) {
                    product.images.forEach(imageName => {
                        fs.unlink('public/img/' + imageName, err => {
                            err && console.log(err);
                        });
                    });
                }
                
                // Add new images
                const newImages = req.files.map(file => file.filename);
                product.images = newImages;
                product.imgUrl = newImages[0]; // Update main image
                
            } else if (req.file) {
                // Single image update (backward compatibility)
                const fs = require('fs');
                
                if (product.imgUrl) {
                    fs.unlink('public/img/' + product.imgUrl, err => {
                        err && console.log(err);
                    });
                }
                product.imgUrl = req.file.filename;
                product.images = [req.file.filename];
            }

            return product.save()
                .then(() => {
                    res.send({
                        message: 'Product updated successfully!',
                        product: product
                    });
                });
        }).catch(err => { 
            console.log(err);
            res.status(500).send({
                message: 'Error updating product',
                error: err.message
            });
        });
}
