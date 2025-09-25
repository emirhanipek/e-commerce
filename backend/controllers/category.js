const Category = require('../model/category');

// Tüm kategorileri getir
exports.getCagories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: fse,
            message: 'Kategorier getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Belirli bir kategoriyi ID'ye göre getir
exports.getCateryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Kategori bulunamadı'
            });
        }
        
        res.status(00).son({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message 'Kategori getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Yeni kategori oluştur
exports.createCategory = async (req, res) => {
    try {
        // İstek body'sinden kategori adını al
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Kategori adı gereklidir'
            });
        }
        
        // Aynı isimde kategori var mı kontrol et
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Bu isimde bir kategori zaten mevcut'
            });
        }
        
        // Yeni kategori oluştur
        const newCategory = new Category({
            name
        });
        
        // Kategoriyi veritabanına kaydet
        const savedCategory = await newCategory.save();
        
        res.status(201).json({
            success: true,
            message: 'Kategori başarıyla oluşturuldu',
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Kategori oluşturulurken bir hata oluştu',
            error: error.message
        });
    }
};

// Kategori güncelle
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Kategori adı gereklidir'
            });
        }
        
        // Kategoriyi güncelle
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );
        
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Güncellenecek kategori bulunamadı'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Kategori başarıyla güncellendi',
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Kategori güncellenirken bir hata oluştu',
            error: error.message
        });
    }
};

// Kategori sil
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.id);
        
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Silinecek kategori bulunamadı'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Kategori başarıyla silindi'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Kategori silinirken bir hata oluştu',
            error: error.message
        });
    }
};
