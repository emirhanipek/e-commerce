const jwt = require('jsonwebtoken');
const User = require('../model/user');

// Token doğrulama middleware'i
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Token bulunmamaktadır!'
        });
    }
    
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Yetkisiz! Geçersiz token.',
                error: err
            });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Admin yetkisi kontrolü
const isAdmin = async (req, res, next) => {
    try {
        // Kullanıcıyı bul
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Kullanıcı bulunamadı!'
            });
        }
        
        // Admin kontrolü
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin yetkisi gerekiyor!'
            });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Yetki kontrolü sırasında bir hata oluştu',
            error: error.message
        });
    }
};

module.exports = { verifyToken, isAdmin };