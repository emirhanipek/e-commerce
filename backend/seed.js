// filepath: /Users/emirhanipek/Desktop/SF Web/MERN-Stack-e-commerce/backend/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./model/user');

// .env dosyasını yükle
dotenv.config();

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    createAdminUser();
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

async function createAdminUser() {
  try {
    // Kullanıcının var olup olmadığını kontrol et
    const existingUser = await User.findOne({ email: 'emirhanipek231@gmail.com' });
    
    if (existingUser) {
      console.log('Bu email adresi ile bir kullanıcı zaten var. Admin rolüne yükseltiliyor...');
      
      // Kullanıcı varsa, rolünü admin olarak güncelle
      existingUser.role = 'admin';
      await existingUser.save();
      
      console.log('Kullanıcı admin rolüne yükseltildi!');
      process.exit(0);
      return;
    }
    
    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Yeni admin kullanıcısı oluştur
    const adminUser = new User({
      name: 'Emirhan İpek',
      email: 'emirhanipek231@gmail.com',
      password: hashedPassword,
      role: 'admin',
      cart: []
    });
    
    await adminUser.save();
    
    console.log('Admin kullanıcısı başarıyla oluşturuldu:');
    console.log('Email: emirhanipek231@gmail.com');
    console.log('Şifre: admin123');
    
    // İşlem tamamlandıktan sonra bağlantıyı kapat
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Admin kullanıcısı oluşturulurken hata oluştu:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}