import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Products from "../components/products/Products";
import { getProducts } from "../store/productSlice";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  
  useEffect(() => {
    dispatch(getProducts());
    if(document.querySelector('.prices')) {
      document.querySelector('.prices').style.display='none';
    }
  }, [])

  const scrollToProducts = () => {
    document.querySelector('.featured-products').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  return (
    <div className="landing-page">
      {/* Hero Section - Full Screen Slider */}
      <section className="hero-section">
        <div className="hero-slider">
          <div className="hero-slide active">
            <div className="hero-content">
              <div className="hero-text">
                <h1>Premium E-Ticaret Deneyimi</h1>
                <p>En kaliteli ürünler, en uygun fiyatlar ve mükemmel hizmet anlayışı ile karşınızdayız.</p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={scrollToProducts}>
                    Ürünleri Keşfet
                    <ArrowDownwardIcon />
                  </button>
                  <Link to="/register" className="btn-secondary">
                    Üye Ol
                  </Link>
                </div>
              </div>
              <div className="hero-image">
                <div className="floating-card">
                  <ShoppingBagIcon />
                  <span>Premium Alışveriş</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator" onClick={scrollToProducts}>
          <ArrowDownwardIcon />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <SecurityIcon className="feature-icon" />
              <h3>Güvenli Alışveriş</h3>
              <p>256-bit SSL sertifikası ile güvenli ödeme</p>
            </div>
            <div className="feature-card">
              <LocalShippingIcon className="feature-icon" />
              <h3>Hızlı Teslimat</h3>
              <p>24 saat içinde ücretsiz kargo</p>
            </div>
            <div className="feature-card">
              <SupportAgentIcon className="feature-icon" />
              <h3>7/24 Destek</h3>
              <p>Müşteri memnuniyeti önceliğimiz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Öne Çıkan Ürünler</h2>
            <p>Size özel seçilmiş premium ürünler</p>
          </div>
          <Products products={products.slice(0, 6)} />
          <div className="view-all-container">
            <Link to="/products" className="btn-primary">
              Tüm Ürünleri Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Hakkımızda</h2>
              <p>
                2020 yılından beri müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunuyoruz. 
                Teknoloji, moda, ev & yaşam kategorilerinde binlerce ürün seçeneği ile sizlere hizmet veriyoruz.
              </p>
              <p>
                Müşteri memnuniyetini ön planda tutan anlayışımız, hızlı teslimat ağımız ve 
                7/24 müşteri desteğimiz ile e-ticaret sektöründe öncü olmaya devam ediyoruz.
              </p>
              <div className="stats">
                <div className="stat">
                  <h3>50K+</h3>
                  <p>Mutlu Müşteri</p>
                </div>
                <div className="stat">
                  <h3>10K+</h3>
                  <p>Ürün Çeşidi</p>
                </div>
                <div className="stat">
                  <h3>99%</h3>
                  <p>Memnuniyet Oranı</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="about-card">
                <h4>Vizyonumuz</h4>
                <p>E-ticaret sektöründe kalite ve güvenin adresi olmak</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Kampanyalardan Haberdar Olun</h2>
            <p>E-posta adresinizi girerek özel indirimler ve yeni ürünlerden ilk siz haberdar olun.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="E-posta adresiniz" />
              <button type="submit">Abone Ol</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
                <h3>ShopApp</h3>
                <p>Premium e-ticaret deneyimi</p>
              </div>
              <div className="social-links">
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="Twitter">TW</a>
                <a href="#" aria-label="LinkedIn">LI</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Hızlı Linkler</h4>
              <ul>
                <li><Link to="/">Ana Sayfa</Link></li>
                <li><Link to="/products">Ürünler</Link></li>
                <li><Link to="/about">Hakkımızda</Link></li>
                <li><Link to="/contact">İletişim</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Müşteri Hizmetleri</h4>
              <ul>
                <li><Link to="/help">Yardım</Link></li>
                <li><Link to="/returns">İade & Değişim</Link></li>
                <li><Link to="/shipping">Kargo Bilgileri</Link></li>
                <li><Link to="/faq">Sık Sorulan Sorular</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>İletişim</h4>
              <div className="contact-info">
                <p>📧 info@shopapp.com</p>
                <p>📞 0850 123 45 67</p>
                <p>📍 İstanbul, Türkiye</p>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 ShopApp. Tüm hakları saklıdır.</p>
            <div className="footer-links">
              <Link to="/privacy">Gizlilik Politikası</Link>
              <Link to="/terms">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}