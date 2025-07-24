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
    createUsers();
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

async function createUsers() {
  try {
    // 1. Mevcut admin kullanıcıyı kontrol et ve admin yap
    const existingAdmin = await User.findOne({ email: 'emirhanipek231@gmail.com' });
    if (existingAdmin) {
      console.log('Mevcut kullanıcı bulundu, admin rolüne yükseltiliyor...');
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Kullanıcı admin rolüne yükseltildi!');
    } else {
      // Admin kullanıcı yoksa oluştur
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const adminUser = new User({
        name: 'Emirhan İpek',
        email: 'emirhanipek231@gmail.com',
        password: hashedPassword,
        role: 'admin',
        cart: []
      });
      await adminUser.save();
      console.log('Admin kullanıcısı oluşturuldu: emirhanipek231@gmail.com / admin123');
    }

    // 2. Yeni kullanıcı oluştur
    const existingNewUser = await User.findOne({ email: 'emirhan@sergioferrari.com' });
    if (existingNewUser) {
      console.log('Yeni kullanıcı zaten mevcut:', existingNewUser.email);
    } else {
      const hashedPasswordNew = await bcrypt.hash('123456', 12);
      const newUser = new User({
        name: 'Emirhan',
        email: 'emirhan@sergioferrari.com',
        password: hashedPasswordNew,
        role: 'user',  // normal kullanıcı rolü
        cart: []
      });
      await newUser.save();
      console.log('Yeni kullanıcı başarıyla oluşturuldu: emirhan@sergioferrari.com / 123456');
    }

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Kullanıcı oluşturma sırasında hata:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

