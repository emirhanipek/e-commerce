import React, { useState } from 'react';
import './Contact.css';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>İletişim | Sergio Ferrari Deri Cüzdan | Toptan Deri Cüzdan</title>
        <meta name="description" content="Sergio Ferrari ile iletişime geçin. İstanbul'da toptan deri cüzdan üreticisi ile doğrudan bağlantı kurun. Özel siparişler, toptan alımlar ve sorularınız için bizimle iletişime geçin." />
        <meta name="keywords" content="deri cüzdan iletişim, toptan deri cüzdan iletişim, sergio ferrari iletişim, istanbul deri cüzdan üretici" />
        <link rel="canonical" href="https://sergioferrari.com/contact" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "url": "https://sergioferrari.com/contact",
              "name": "Sergio Ferrari İletişim",
              "description": "Sergio Ferrari ile iletişime geçin. İstanbul'da deri cüzdan üreticisi.",
              "mainEntity": {
                "@type": "Organization",
                "name": "Sergio Ferrari",
                "telephone": "+90 212 123 45 67",
                "email": "info@sergioferrari.com",
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
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>İletişim</h1>
        </div>
      </section>

      <div className="container">
        {/* Contact Information */}
        <section className="contact-info-section">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <span>📧</span>
              </div>
              <h3>E-posta</h3>
              <p>emirhanipek231@gmail.com</p>
              
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <span>📞</span>
              </div>
              <h3>Telefon</h3>
              <p>+90 541 360 99 17</p>

              <p>+90 535 938 24 30</p>
            
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <span>📍</span>
              </div>
              <h3>Adres</h3>
              <p>Arnavutköy Merkez Mahallesi</p>
              <p>34000 İstanbul, Türkiye</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <span>🕒</span>
              </div>
              <h3>Çalışma Saatleri</h3>
              <p>Pazartesi - Cuma: 09:00 - 18:00</p>
              <p>Cumartesi: 10:00 - 17:00</p>
              <p>Pazar: Kapalı</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="contact-main">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Mesaj Gönderin</h2>
              <p>Sorularınız, önerileriniz veya özel siparişleriniz için bizimle iletişime geçin.</p>
              
              {isSubmitted ? (
                <div className="success-message">
                  <h3>Teşekkürler!</h3>
                  <p>Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Adınız Soyadınız *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">E-posta Adresiniz *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Konu</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Mesajınız *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Mesaj Gönder
                  </button>
                </form>
              )}
            </div>

            {/* Map Section */}
            <div className="map-section">
              <h2>Konumumuz</h2>
              <p>Atölyemizi ziyaret ederek ürünlerimizi yakından inceleyebilirsiniz.</p>
              
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280047457!2d28.6348!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2s%C4%B0stanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1659000000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DeriSanat Konumu"
                ></iframe>
              </div>
              
              <div className="map-info">
                <h3>Ulaşım Bilgileri</h3>
                <ul>
                  <li><strong>Metro:</strong> Vezneciler İstasyonu (500m)</li>
                  <li><strong>Otobüs:</strong> 28, 61C, 99A hatları</li>
                  <li><strong>Otopark:</strong> Yakın çevrede ücretli park alanları</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Ürünlerinizde hangi deri türlerini kullanıyorsunuz?</h3>
              <p>
                Sadece en kaliteli doğal deri türlerini kullanıyoruz. Dana derisi, 
                buffalo deri ve özel olarak işlenmiş nappa deri ana malzemelerimizdir.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Özel tasarım sipariş verebilir miyim?</h3>
              <p>
                Elbette! Özel tasarım ve kişiselleştirme hizmetleri sunuyoruz. 
                Detaylar için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Ürünleriniz ne kadar sürede hazır olur?</h3>
              <p>
                Standart ürünlerimiz stokta mevcuttur. Özel siparişler için 
                2-3 hafta hazırlık süresi gerekebilir.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Garanti süresi nedir?</h3>
              <p>
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