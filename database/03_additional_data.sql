-- Ek kategoriler ve ürünler

-- Kitap & Kırtasiye kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('1984 - George Orwell', 89.99, 'George Orwell klasik eseri 1984', '1984book.jpg', 5, 5),
('Moleskine Defter', 299.99, 'Moleskine A5 Çizgili Defter Siyah', 'moleskinedefter.jpg', 5, 5),
('Pilot G2 Kalem', 19.99, 'Pilot G2 Premium Jel Kalem', 'pilotg2.jpg', 5, 5),
('Suç ve Ceza - Dostoyevski', 119.99, 'Dostoyevski Suç ve Ceza Türkçe', 'sucveceza.jpg', 5, 5),
('Faber Castell Kalem Seti', 199.99, 'Faber Castell 12li Renkli Kalem Seti', 'faberkalem.jpg', 5, 5),
('Post-it Yapışkan Not', 39.99, 'Post-it 3x3 Sarı Yapışkan Not 100 Yaprak', 'postit.jpg', 5, 5),
('Oxford Dosya', 49.99, 'Oxford A4 Plastik Dosya 20 Poşetli', 'oxforddosya.jpg', 5, 5),
('Kitap Ayracı Seti', 29.99, 'Metal Kitap Ayracı 5li Set', 'kitapayrac.jpg', 5, 5),
('Hesap Makinesi', 129.99, 'Casio MS-120TV Hesap Makinesi', 'casiohesap.jpg', 5, 5),
('Yapışkan Bant', 15.99, 'Scotch Magic Tape Şeffaf Bant', 'scotchbant.jpg', 5, 5);

-- Sağlık & Kozmetik kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('Nivea Krem', 49.99, 'Nivea Soft Nemlendirici Krem 300ml', 'niveakrem.jpg', 6, 6),
('Oral-B Diş Fırçası', 199.99, 'Oral-B Vitality Pro Elektrikli Diş Fırçası', 'oralbdisfircasi.jpg', 6, 6),
('Garnier Şampuan', 79.99, 'Garnier Fructis Güçlendirici Şampuan 360ml', 'garniersampuan.jpg', 6, 6),
('L\'Oreal Ruj', 149.99, 'L\'Oreal Paris Rouge Signature Matte Ruj', 'lorealruj.jpg', 6, 6),
('Dove Sabun', 29.99, 'Dove Beauty Bar Kremli Sabun 100g', 'dovesabun.jpg', 6, 6),
('Maybelline Maskara', 89.99, 'Maybelline Lash Sensational Maskara', 'maybellinemaskara.jpg', 6, 6),
('Cetaphil Temizleyici', 159.99, 'Cetaphil Gentle Skin Cleanser 236ml', 'cetaphil.jpg', 6, 6),
('Eucerin Güneş Kremi', 189.99, 'Eucerin Sun Face SPF 50+ 50ml', 'eucerinsun.jpg', 6, 6),
('Head & Shoulders', 69.99, 'Head & Shoulders Kepeğe Karşı Şampuan', 'headshoulders.jpg', 6, 6),
('Vaseline Petroleum Jelly', 39.99, 'Vaseline Original Petroleum Jelly 100ml', 'vaseline.jpg', 6, 6);

-- Oyuncak & Hobi kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('LEGO Creator', 899.99, 'LEGO Creator 3-in-1 Deep Sea Creatures', 'legocreator.jpg', 7, 7),
('Barbie Bebek', 299.99, 'Barbie Fashionistas Bebek', 'barbiebebek.jpg', 7, 7),
('Hot Wheels Araba', 49.99, 'Hot Wheels 5li Araba Seti', 'hotwheels.jpg', 7, 7),
('Puzzle 1000 Parça', 149.99, 'Ravensburger 1000 Parça Puzzle', 'puzzle1000.jpg', 7, 7),
('Playmobil Set', 599.99, 'Playmobil City Life Hastane Seti', 'playmobil.jpg', 7, 7),
('Nerf Blaster', 399.99, 'Nerf Elite 2.0 Commander Blaster', 'nerfblaster.jpg', 7, 7),
('Monopoly Oyunu', 199.99, 'Monopoly Classic Türkçe Kutu Oyunu', 'monopoly.jpg', 7, 7),
('UNO Kart Oyunu', 39.99, 'UNO Classic Kart Oyunu', 'unooyun.jpg', 7, 7),
('Remote Control Car', 799.99, 'Uzaktan Kumandalı Araba 4WD', 'rccar.jpg', 7, 7),
('Slime Kit', 99.99, 'DIY Slime Making Kit', 'slimekit.jpg', 7, 7);

-- Otomotiv kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('Michelin Lastik', 1499.99, 'Michelin Primacy 4 205/55R16 Lastik', 'michelinlastik.jpg', 8, 8),
('Bosch Akü', 899.99, 'Bosch S4 74Ah Akü', 'boschaku.jpg', 8, 8),
('Castrol Motor Yağı', 299.99, 'Castrol GTX 10W-40 4 Litre Motor Yağı', 'castrolyag.jpg', 8, 8),
('NGK Buji', 89.99, 'NGK Standard Buji Seti 4 Adet', 'ngkbuji.jpg', 8, 8),
('Araç Şampuanı', 59.99, 'Chemical Guys Citrus Wash Araç Şampuanı', 'aracsampuan.jpg', 8, 8),
('Oto Paspas', 199.99, 'Universal 4 Mevsim Oto Paspas Seti', 'otopaspas.jpg', 8, 8),
('Araç Kamera', 1299.99, 'Xiaomi 70mai Dash Cam Pro Araç Kamerası', 'arackamera.jpg', 8, 8),
('Araç Telefon Tutucu', 129.99, 'Baseus Gravity Araç Telefon Tutucu', 'aractelefon.jpg', 8, 8),
('Araç Parfümü', 49.99, 'Areon Car Perfume Araç Parfümü', 'aracparfum.jpg', 8, 8),
('Jump Starter', 999.99, 'Powerbank Jump Starter 12000mAh', 'jumpstarter.jpg', 8, 8);

-- Bahçe & Yapı Market kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('Bosch Matkap', 1599.99, 'Bosch GSB 13 RE Darbeli Matkap', 'boschmatkap.jpg', 9, 9),
('Çiçek Tohumu', 29.99, 'Karışık Çiçek Tohumu Paketi', 'cicektohum.jpg', 9, 9),
('Bahçe Hortumu', 199.99, '20 Metre Spiralli Bahçe Hortumu', 'bahcehortum.jpg', 9, 9),
('Çim Biçme Makinesi', 4999.99, 'Black+Decker Elektrikli Çim Biçme Makinesi', 'cimbicme.jpg', 9, 9),
('Saksı Seti', 149.99, 'Terracotta Saksı Seti 5 Adet', 'saksiset.jpg', 9, 9),
('Gübre', 79.99, 'Organik Solucan Gübresi 5kg', 'gubre.jpg', 9, 9),
('Makita Testere', 2999.99, 'Makita M4301 Dekupaj Testere', 'makitatestere.jpg', 9, 9),
('Bahçe Eldiveni', 39.99, 'Su Geçirmez Bahçe Eldiveni', 'bahceelidven.jpg', 9, 9),
('Sulama Sistemi', 299.99, 'Damla Sulama Sistemi Kit', 'sulama.jpg', 9, 9),
('Çapa', 129.99, 'Bahçe Çapası Ahşap Saplı', 'capa.jpg', 9, 9);

-- Mücevher & Saat kategorisi ürünleri
INSERT INTO products (name, price, description, img_url, user_id, category_id) VALUES 
('Casio Saat', 899.99, 'Casio G-Shock DW-5600E-1VER', 'casiogshock.jpg', 10, 10),
('Altın Kolye', 2999.99, '14 Ayar Altın İnce Zincir Kolye', 'altinkolye.jpg', 10, 10),
('Gümüş Yüzük', 199.99, '925 Ayar Gümüş Kadın Yüzük', 'gumusyuzuk.jpg', 10, 10),
('Swarovski Küpe', 1299.99, 'Swarovski Kristal Küpe', 'swarovskikupe.jpg', 10, 10),
('Fossil Saat', 1999.99, 'Fossil Grant Chronograph Erkek Saat', 'fossilsaat.jpg', 10, 10),
('Pandora Bileklik', 1599.99, 'Pandora Rose Moments Bileklik', 'pandorabileklik.jpg', 10, 10),
('Citizen Saat', 3999.99, 'Citizen Eco-Drive Titanium Saat', 'citizensaat.jpg', 10, 10),
('Pırlanta Küpe', 9999.99, '0.25 Karat Pırlanta Küpe Çifti', 'pirlantakupe.jpg', 10, 10),
('Seiko Saat', 2499.99, 'Seiko Prospex Solar Diver Saat', 'seikosaat.jpg', 10, 10),
('Gümüş Bileklik', 399.99, '925 Ayar Gümüş Erkek Bileklik', 'gumusbileklik.jpg', 10, 10);

-- Ek sipariş verileri
INSERT INTO orders (user_id, user_name, user_email, total_amount, status) VALUES 
(7, 'Zeynep Şahin', 'zeynep@gmail.com', 1199.98, 'delivered'),
(8, 'Mustafa Arslan', 'mustafa@gmail.com', 5999.97, 'shipped'),
(9, 'Emine Doğan', 'emine@gmail.com', 449.97, 'confirmed'),
(10, 'Hasan Kılıç', 'hasan@gmail.com', 12999.97, 'pending'),
(2, 'Ahmet Yılmaz', 'ahmet@gmail.com', 899.99, 'delivered');

-- Ek sipariş detayları
INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES 
(6, 31, '1984 - George Orwell', 89.99, 2, 179.98),
(6, 33, 'Pilot G2 Kalem', 19.99, 5, 99.95),
(6, 32, 'Moleskine Defter', 299.99, 3, 899.97),
(7, 47, 'LEGO Creator', 899.99, 2, 1799.98),
(7, 54, 'Remote Control Car', 799.99, 5, 3999.95),
(8, 41, 'Nivea Krem', 49.99, 3, 149.97),
(8, 43, 'Garnier Şampuan', 79.99, 2, 159.98),
(8, 46, 'Maybelline Maskara', 89.99, 1, 89.99),
(9, 67, 'Casio Saat', 899.99, 3, 2699.97),
(9, 72, 'Fossil Saat', 1999.99, 5, 9999.95),
(10, 51, 'LEGO Creator', 899.99, 1, 899.99);

-- Ek sepet verileri
INSERT INTO cart (user_id, product_id, quantity) VALUES 
(7, 35, 3),
(7, 42, 1),
(8, 48, 2),
(8, 56, 1),
(9, 61, 1),
(9, 66, 2),
(10, 68, 1),
(10, 71, 3),
(2, 74, 1),
(3, 76, 2),
(4, 35, 1),
(5, 49, 2),
(6, 63, 1);
