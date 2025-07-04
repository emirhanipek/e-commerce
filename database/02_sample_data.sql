-- E-commerce Database Sample Data
-- Fake veriler

-- Kategoriler
INSERT INTO categories (name) VALUES 
('Elektronik'),
('Giyim'),
('Ev & Yaşam'),
('Spor & Outdoor'),
('Kitap & Kırtasiye'),
('Sağlık & Kozmetik'),
('Oyuncak & Hobi'),
('Otomotiv'),
('Bahçe & Yapı Market'),
('Mücevher & Saat');

-- Admin ve test kullanıcıları
INSERT INTO users (name, email, password) VALUES 
('Admin User', 'admin@ecommerce.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'), -- password: admin123
('Ahmet Yılmaz', 'ahmet@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'), -- password: 123456
('Mehmet Demir', 'mehmet@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Ayşe Kaya', 'ayse@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Fatma Özkan', 'fatma@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Ali Çelik', 'ali@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Zeynep Şahin', 'zeynep@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Mustafa Arslan', 'mustafa@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Emine Doğan', 'emine@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy'),
('Hasan Kılıç', 'hasan@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36JJCf6FBJODOOhz6TdOJjy');

-- Elektronik kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('iPhone 15 Pro', 45999.99, 'Apple iPhone 15 Pro 256GB Titanium Blue', 'iphone15pro.jpg', 1, 1),
('Samsung Galaxy S24', 35999.99, 'Samsung Galaxy S24 256GB Phantom Black', 'galaxys24.jpg', 1, 1),
('MacBook Air M3', 42999.99, 'Apple MacBook Air 13" M3 Chip 256GB', 'macbookair.jpg', 1, 1),
('Dell XPS 13', 28999.99, 'Dell XPS 13 Intel i7 16GB RAM 512GB SSD', 'dellxps13.jpg', 1, 1),
('Sony WH-1000XM5', 8999.99, 'Sony WH-1000XM5 Kablosuz Kulaklık', 'sonywh1000xm5.jpg', 1, 1),
('iPad Pro 12.9', 38999.99, 'Apple iPad Pro 12.9" M2 Chip 256GB', 'ipadpro.jpg', 1, 1),
('LG OLED55C3', 75999.99, 'LG OLED55C3 55" 4K Smart TV', 'lgoled55c3.jpg', 1, 1),
('Canon EOS R8', 65999.99, 'Canon EOS R8 Mirrorless Kamera Body', 'canonr8.jpg', 1, 1),
('Nintendo Switch OLED', 9999.99, 'Nintendo Switch OLED Model Beyaz', 'switcholed.jpg', 1, 1),
('Apple Watch Series 9', 12999.99, 'Apple Watch Series 9 GPS 45mm', 'applewatch9.jpg', 1, 1);

-- Giyim kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('Levi\'s 501 Jean', 899.99, 'Levi\'s 501 Original Fit Erkek Jean Pantolon', 'levis501.jpg', 2, 2),
('Nike Air Force 1', 3499.99, 'Nike Air Force 1 \'07 Beyaz Spor Ayakkabı', 'nikeaf1.jpg', 2, 2),
('Adidas Hoodie', 1299.99, 'Adidas Originals Trefoil Kapüşonlu Sweatshirt', 'adidashoodie.jpg', 2, 2),
('Zara Blazer', 2199.99, 'Zara Erkek Klasik Kesim Blazer Ceket', 'zarablager.jpg', 2, 2),
('H&M Basic Tişört', 299.99, 'H&M Basic Pamuklu Tişört', 'hmbasic.jpg', 2, 2),
('Mango Elbise', 1599.99, 'Mango Kadın Midi Elbise', 'mangoelbise.jpg', 2, 2),
('LC Waikiki Gömlek', 599.99, 'LC Waikiki Erkek Klasik Gömlek', 'lcgomlek.jpg', 2, 2),
('Koton Pantolon', 799.99, 'Koton Kadın Yüksek Bel Pantolon', 'kotonpantolon.jpg', 2, 2),
('Pull&Bear Mont', 1899.99, 'Pull&Bear Kadın Oversize Mont', 'pullbearmont.jpg', 2, 2),
('Bershka Çanta', 499.99, 'Bershka Kadın Mini Çanta', 'bershkacanta.jpg', 2, 2);

-- Ev & Yaşam kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('IKEA BILLY Kitaplık', 899.99, 'IKEA BILLY Kitaplık Beyaz 80x28x202 cm', 'ikeabilly.jpg', 3, 3),
('Tefal Tava Seti', 1299.99, 'Tefal Titanium Pro 3\'lü Tava Seti', 'tefaltava.jpg', 3, 3),
('Philips Kahve Makinesi', 2999.99, 'Philips 2200 Series Tam Otomatik Espresso Makinesi', 'philipskahve.jpg', 3, 3),
('Dyson V15 Süpürge', 18999.99, 'Dyson V15 Detect Kablosuz Süpürge', 'dysonv15.jpg', 3, 3),
('Tempur Yastık', 3999.99, 'Tempur Original Memory Foam Yastık', 'tempuryastik.jpg', 3, 3),
('Xiaomi Hava Temizleyici', 4999.99, 'Xiaomi Mi Air Purifier 3H', 'xiaomihava.jpg', 3, 3),
('Karaca Yemek Takımı', 1899.99, 'Karaca 86 Parça Porselen Yemek Takımı', 'karacayemek.jpg', 3, 3),
('Vestel Buzdolabı', 24999.99, 'Vestel No Frost 600 Lt Buzdolabı', 'vestelbuzdolabi.jpg', 3, 3),
('Bosch Bulaşık Makinesi', 12999.99, 'Bosch 14 Kişilik A+++ Bulaşık Makinesi', 'boschbulasik.jpg', 3, 3),
('Kütahya Porselen Çay Seti', 799.99, 'Kütahya Porselen 12 Parça Çay Seti', 'kutahyacay.jpg', 3, 3);

-- Spor & Outdoor kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('Decathlon Yoga Matı', 299.99, 'Decathlon 8mm Kalınlık Yoga Matı', 'yogamati.jpg', 4, 4),
('Nike Koşu Ayakkabısı', 2999.99, 'Nike Revolution 6 Erkek Koşu Ayakkabısı', 'nikekosu.jpg', 4, 4),
('Adidas Futbol Topu', 599.99, 'Adidas UEFA Euro 2024 Futbol Topu', 'adidasfutbol.jpg', 4, 4),
('Columbia Mont', 3999.99, 'Columbia Erkek Su Geçirmez Mont', 'columbiamont.jpg', 4, 4),
('Salomon Trekking Ayakkabısı', 4999.99, 'Salomon X Ultra 3 GTX Trekking Ayakkabısı', 'salomontrek.jpg', 4, 4),
('Speedo Mayo', 899.99, 'Speedo Kadın Sporcu Mayosu', 'speedomayo.jpg', 4, 4),
('Wilson Tenis Raketi', 2499.99, 'Wilson Pro Staff 97 V13 Tenis Raketi', 'wilsontenis.jpg', 4, 4),
('Yonex Badminton Raketi', 1899.99, 'Yonex Arcsaber 11 Badminton Raketi', 'yonexbadminton.jpg', 4, 4),
('Kettler Fitness Bisikleti', 8999.99, 'Kettler Giro P Black Fitness Bisikleti', 'kettlerbisiklet.jpg', 4, 4),
('Domyos Dambıl Seti', 1599.99, 'Domyos 20kg Ayarlanabilir Dambıl Seti', 'domyosdambil.jpg', 4, 4);

-- Daha fazla örnek sipariş verisi
INSERT INTO orders (user_id, user_name, user_email, total_amount, status) VALUES 
(2, 'Ahmet Yılmaz', 'ahmet@gmail.com', 49499.98, 'delivered'),
(3, 'Mehmet Demir', 'mehmet@gmail.com', 8999.99, 'shipped'),
(4, 'Ayşe Kaya', 'ayse@gmail.com', 2399.97, 'confirmed'),
(5, 'Fatma Özkan', 'fatma@gmail.com', 1899.98, 'pending'),
(6, 'Ali Çelik', 'ali@gmail.com', 75999.99, 'delivered');

-- Sipariş detayları
INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES 
(1, 1, 'iPhone 15 Pro', 45999.99, 1, 45999.99),
(1, 5, 'Sony WH-1000XM5', 8999.99, 1, 8999.99),
(2, 5, 'Sony WH-1000XM5', 8999.99, 1, 8999.99),
(3, 11, 'Levi\'s 501 Jean', 899.99, 1, 899.99),
(3, 12, 'Nike Air Force 1', 3499.99, 1, 3499.99),
(4, 15, 'H&M Basic Tişört', 299.99, 2, 599.98),
(4, 17, 'LC Waikiki Gömlek', 599.99, 2, 1199.98),
(5, 7, 'LG OLED55C3', 75999.99, 1, 75999.99);

-- Sepet örnekleri
INSERT INTO cart (user_id, product_id, quantity) VALUES 
(2, 3, 1),
(2, 6, 2),
(3, 21, 1),
(3, 22, 1),
(4, 13, 1),
(5, 9, 1),
(5, 10, 1),
(6, 25, 2),
(7, 30, 1),
(8, 14, 3);
