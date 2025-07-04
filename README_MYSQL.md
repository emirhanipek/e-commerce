# E-commerce MySQL Docker Kurulumu

Bu proje, mevcut Node.js/MongoDB e-commerce projesinin MySQL veritabanı yapısını Docker konteynerları ile çalıştırabilmeniz için oluşturulmuştur.

## Özellikler

- ✅ **MySQL 8.0** veritabanı
- ✅ **phpMyAdmin** web arayüzü
- ✅ **Otomatik veritabanı kurulumu** 
- ✅ **Fake veriler** ile dolu tablolar
- ✅ **Modern MySQL şema** tasarımı

## Kurulum

### 1. Docker Kurulumu
Bilgisayarınızda Docker Desktop'un kurulu olduğundan emin olun.

### 2. Projeyi Başlatma
```bash
cd "/Users/emirhanipek/Desktop/SF Web/MERN-Stack-e-commerce"
docker compose up -d
```

### 3. Konteyner Durumunu Kontrol Etme
```bash
docker compose ps
```

### 4. Logları Görüntüleme
```bash
# Tüm servisler
docker compose logs

# Sadece MySQL
docker compose logs mysql

# Sadece phpMyAdmin
docker compose logs phpmyadmin
```

## Erişim Bilgileri

### phpMyAdmin Web Arayüzü
- **URL**: http://localhost:8080
- **Kullanıcı Adı**: `root`
- **Şifre**: `root123`

### MySQL Veritabanı Bağlantısı
- **Host**: `localhost`
- **Port**: `3306`
- **Veritabanı**: `ecommerce_db`
- **Kullanıcı**: `ecommerce_user`
- **Şifre**: `ecommerce_pass`
- **Root Şifre**: `root123`

## Veritabanı Yapısı

### Tablolar
1. **categories** - Ürün kategorileri
2. **users** - Kullanıcı bilgileri
3. **products** - Ürün bilgileri
4. **cart** - Sepet öğeleri
5. **orders** - Siparişler
6. **order_items** - Sipariş detayları

### Örnek Veriler
- **10 kategori** (Elektronik, Giyim, Ev & Yaşam, vs.)
- **10 kullanıcı** (test hesapları)
- **76 ürün** (her kategoriden çeşitli ürünler)
- **15 sipariş** (farklı durumlar)
- **Sepet öğeleri** (test sepetleri)

## Kullanım

### phpMyAdmin ile Veritabanını İnceleme
1. http://localhost:8080 adresine gidin
2. Root kullanıcısı ile giriş yapın
3. `ecommerce_db` veritabanını seçin
4. Tabloları ve verileri inceleyin

### Yeni Veriler Ekleme
phpMyAdmin üzerinden SQL sorguları çalıştırarak yeni veriler ekleyebilirsiniz.

### Backup Alma
```bash
docker exec ecommerce_mysql mysqldump -u root -proot123 ecommerce_db > backup.sql
```

### Backup'tan Geri Yükleme
```bash
docker exec -i ecommerce_mysql mysql -u root -proot123 ecommerce_db < backup.sql
```

## Konteyner Yönetimi

### Konteynerları Durdurma
```bash
docker compose down
```

### Konteynerları Yeniden Başlatma
```bash
docker compose restart
```

### Sadece Veritabanını Yeniden Başlatma
```bash
docker compose restart mysql
```

### Verileri Temizleme (DİKKAT: Tüm veriler silinir!)
```bash
docker compose down -v
docker compose up -d
```

## Sorun Giderme

### Portlar Kullanımda Hatası
Eğer 3306 veya 8080 portları kullanımda ise, `docker-compose.yml` dosyasında port numaralarını değiştirebilirsiniz.

### MySQL Başlatma Sorunu
```bash
# MySQL loglarını kontrol edin
docker compose logs mysql

# Konteyner durumunu kontrol edin
docker compose ps
```

### phpMyAdmin Erişim Sorunu
```bash
# phpMyAdmin loglarını kontrol edin
docker compose logs phpmyadmin

# MySQL'in tamamen başlatıldığından emin olun
docker compose logs mysql | grep "ready for connections"
```

## Veritabanı Şeması Detayları

### users tablosu
- Kullanıcı kimlik doğrulama bilgileri
- Şifreler bcrypt ile hashlendi
- Test şifresi: `123456` (admin hariç: `admin123`)

### products tablosu
- Kategoriler arası foreign key ilişkiler
- Resim URL'leri
- Kullanıcı bazlı ürün yönetimi

### orders tablosu
- Sipariş durumu takibi
- Kullanıcı bilgileri dahil
- order_items ile one-to-many ilişki

Bu yapı, modern e-commerce uygulamaları için tüm temel işlevleri desteklemektedir.
