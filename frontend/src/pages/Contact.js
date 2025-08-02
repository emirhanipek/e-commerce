import React, { useState, useCallback } from 'react';
import Footer from "../components/Footer";
import { Helmet } from 'react-helmet';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(resetForm, 3000);
  }, [formData, resetForm]);

  return (
    <div className="bg-white text-black font-serif">
      <Helmet>
        <title>İletişim | Sergio Ferrari Deri Cüzdan | Toptan Deri Cüzdan</title>
        <meta name="description" content="Sergio Ferrari ile iletişime geçin. İstanbul'da toptan deri cüzdan üreticisi ile doğrudan bağlantı kurun. Özel siparişler, toptan alımlar ve sorularınız için bizimle iletişime geçin." />
        <meta name="keywords" content="deri cüzdan iletişim, toptan deri cüzdan iletişim, sergio ferrari iletişim, istanbul deri cüzdan üretici" />
        <link rel="canonical" href="https://sergioferrari.tr/contact" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "url": "https://sergioferrari.tr/contact",
              "name": "Sergio Ferrari İletişim",
              "description": "Sergio Ferrari ile iletişime geçin. İstanbul'da deri cüzdan üreticisi.",
              "mainEntity": {
                "@type": "Organization",
                "name": "Sergio Ferrari",
                "telephone": "+90 212 123 45 67",
                "email": "info@sergioferrari.tr",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "İstanbul",
                  "addressRegion": "İstanbul",
                  "postalCode": "34000",
                  "addressCountry": "TR"
                }
              }
            }
          `}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="h-96 min-h-[300px] relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-white max-w-2xl px-5">
          <h1 className="text-5xl font-normal mb-4 tracking-wide drop-shadow-lg">İletişim</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5">
        {/* Contact Information */}
        <section className="py-20 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-10 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">E-posta</h3>
              <p className="text-gray-600 leading-relaxed">emirhanipek231@gmail.com</p>
            </div>
            
            <div className="bg-white p-10 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">Telefon</h3>
              <p className="text-gray-600 leading-relaxed mb-2">+90 541 360 99 17</p>
              <p className="text-gray-600 leading-relaxed">+90 535 938 24 30</p>
            </div>
            
            <div className="bg-white p-10 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">Adres</h3>
              <p className="text-gray-600 leading-relaxed mb-2">Arnavutköy Merkez Mahallesi</p>
              <p className="text-gray-600 leading-relaxed">34000 İstanbul, Türkiye</p>
            </div>
            
            <div className="bg-white p-10 text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">Çalışma Saatleri</h3>
              <p className="text-gray-600 leading-relaxed mb-2">Pazartesi - Cuma: 09:00 - 18:00</p>
              <p className="text-gray-600 leading-relaxed mb-2">Cumartesi: 10:00 - 17:00</p>
              <p className="text-gray-600 leading-relaxed">Pazar: Kapalı</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-normal text-black mb-4 tracking-wide">Mesaj Gönderin</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Sorularınız, önerileriniz veya özel siparişleriniz için bizimle iletişime geçin.
              </p>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">Teşekkürler!</h3>
                  <p className="text-green-700 leading-relaxed">
                    Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-black px-8 py-4 rounded-md font-semibold tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Mesaj Gönder
                  </button>
                </form>
              )}
            </div>

            {/* Map Section */}
            <div>
              <h2 className="text-4xl font-normal text-black mb-4 tracking-wide">Konumumuz</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Atölyemizi ziyaret ederek ürünlerimizi yakından inceleyebilirsiniz.
              </p>
              
              <div className="rounded-lg overflow-hidden shadow-lg mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280047457!2d28.6348!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2s%C4%B0stanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1659000000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sergio Ferrari Konumu"
                ></iframe>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">Ulaşım Bilgileri</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong className="text-black">Metro:</strong> Vezneciler İstasyonu (500m)</li>
                  <li><strong className="text-black">Otobüs:</strong> 28, 61C, 99A hatları</li>
                  <li><strong className="text-black">Otopark:</strong> Yakın çevrede ücretli park alanları</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <h2 className="text-4xl font-normal text-black mb-12 text-center tracking-wide">
            Sık Sorulan Sorular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">
                Ürünlerinizde hangi deri türlerini kullanıyorsunuz?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sadece en kaliteli doğal deri türlerini kullanıyoruz. Dana derisi, 
                buffalo deri ve özel olarak işlenmiş nappa deri ana malzemelerimizdir.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">
                Özel tasarım sipariş verebilir miyim?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Elbette! Özel tasarım ve kişiselleştirme hizmetleri sunuyoruz. 
                Detaylar için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">
                Ürünleriniz ne kadar sürede hazır olur?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Standart ürünlerimiz stokta mevcuttur. Özel siparişler için 
                2-3 hafta hazırlık süresi gerekebilir.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-black mb-4 tracking-wide">
                Garanti süresi nedir?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tüm ürünlerimiz 2 yıl garanti kapsamındadır. İmalat hatası durumunda 
                ücretsiz tamir veya değişim hizmeti sunuyoruz.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}