import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getProducts } from "../store/productSlice";
import { fetchCategories } from "../store/categorySlice";
import './Home.css';
import { Helmet } from "react-helmet";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const categories = useSelector(state => state.categories.items);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchCategories());
    if(document.querySelector('.prices')) {
      document.querySelector('.prices').style.display='none';
    }
  }, [dispatch])

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const scrollToProducts = () => {
    document.querySelector('.featured-products').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  const slides = [
    {
      title: "Eşsiz Deri Sanatı ve Tasarımı",
      subtitle: "El İşçiliğiyle Hazırlanmış Premium Deri Ürünler",
      description: "Geleneksel zanaat teknikleri ile modern tasarımın buluştuğu koleksiyonumuz",
      image: "/images/slider1.jpg"
    },
    {
      title: "Zarafet ve Kalite",
      subtitle: "Doğal Deriden Üretilen Lüks Aksesuarlar",
      description: "Her detayında mükemmellik arayışının yansıdığı özel tasarım ürünler",
      image: "/images/slider2.jpg"
    },
    {
      title: "Ustalık ve Gelenek",
      subtitle: "Nesilden Nesile Aktarılan Deri İşçiliği",
      description: "Yılların deneyimi ve modern teknolojinin mükemmel uyumu",
      image: "/images/slider3.webp"
    }
  ];

  return (
    <div className="home-page">
      <Helmet>
        <title>Sergio Ferrari | Toptan Deri Cüzdan | İstanbul El Yapımı Deri Cüzdanlar</title>
        <meta name="description" content="Sergio Ferrari, İstanbul'da el yapımı hakiki deri cüzdan üreticisi. Toptan deri cüzdan, erkek ve kadın deri cüzdan modelleri uygun fiyatlarla." />
        <meta name="keywords" content="deri cüzdan, toptan deri cüzdan, deri cüzdan istanbul, sergio ferrari deri cüzdan, erkek deri cüzdan, kadın deri cüzdan" />
        <link rel="canonical" href="https://sergioferrari.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Sergio Ferrari Deri Cüzdan",
              "description": "İstanbul'un en kaliteli deri cüzdan üreticisi",
              "url": "https://sergioferrari.com",
              "telephone": "+90 212 123 45 67",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "İstanbul",
                "addressLocality": "İstanbul",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.0082",
                "longitude": "28.9784"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "₺₺"
            }
          `}
        </script>
      </Helmet>
      
      {/* Hero Section - Full Width Slider */}
      <section className="hero-section">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div key={index} className={`hero-slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="hero-background" style={{backgroundImage: `url(${slide.image})`}}>
                <div className="hero-overlay"></div>
              </div>
              <div className="hero-content">
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <h2>{slide.subtitle}</h2>
                  <p>{slide.description}</p>
                  <div className="hero-buttons">
                    <button className="btn-primary" onClick={scrollToProducts}>
                      Koleksiyonu Keşfet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Navigation */}
        <div className="slider-nav">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
       
      </section>

      {/* Category Cards Section */}
      <section className="category-section">
        <div className="container">
          <p className="p-4"></p>
          <div className="section-header pt-3">
            <h2>Kategoriler</h2>
            <p>Özenle seçilmiş deri ürün koleksiyonlarımız</p>
          </div>
          <div className="category-grid">
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-[450px]">
              <img 
                src="/images/erkek_cuzdan.jpg" 
                alt="Erkek Cüzdan" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                <div className="text-center px-6 py-4">
                  <h3 className="text-white text-2xl font-semibold tracking-wide mb-2">Erkek Cüzdan</h3>
                  <div className="w-12 h-1 bg-amber-400 mx-auto my-2 transform origin-left transition-all duration-500 group-hover:w-24"></div>
                  <p className="text-white/80 mt-2 text-sm">El işçiliği ile hazırlanmış özel deri cüzdanlar</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-[450px]">
              <img 
                src="/images/kadin_cuzdan.jpg" 
                alt="Kadın Cüzdan" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                <div className="text-center px-6 py-4">
                  <h3 className="text-white text-2xl font-semibold tracking-wide mb-2">Kadın Cüzdan</h3>
                  <div className="w-12 h-1 bg-amber-400 mx-auto my-2 transform origin-left transition-all duration-500 group-hover:w-24"></div>
                  <p className="text-white/80 mt-2 text-sm">Zarif tasarımlı premium deri cüzdanlar</p>

                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-[450px]">
              <img 
                src="/images/klac_cuzdan.jpg" 
                alt="Bütün Modeller" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                <div className="text-center px-6 py-4">
                  <h3 className="text-white text-2xl font-semibold tracking-wide mb-2">Klac</h3>
                  <div className="w-12 h-1 bg-amber-400 mx-auto my-2 transform origin-left transition-all duration-500 group-hover:w-24"></div>
                  <p className="text-white/80 mt-2 text-sm">Tüm deri ürün koleksiyonumuzu keşfedin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Öne Çıkan Ürünler</h2>
            <p>El işçiliğiyle hazırlanmış özel tasarım ürünler</p>
          </div>
          <div className="products-grid">
            {products.slice(0, 3).map(product => (
              <Link key={product._id} to={`/product/${product._id}`} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.images && product.images.length > 0 
                      ? `https://api.sergioferrari.tr/public/img/${product.images[0]}` 
                      : '/api/placeholder/300/300'} 
                    alt={product.name}
                    onError={(e) => { e.target.src = '/api/placeholder/300/300'; }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Ustalık ve Gelenek</h2>
              <p>
                Yılların deneyimi ve geleneksel deri işçiliği tekniklerini modern tasarım anlayışıyla 
                harmanlayarak, her ürünümüzü özenle hazırlıyoruz. Kaliteli hammaddeler ve titiz 
                işçilikle ürettiğimiz deri ürünler, zarafet ve dayanıklılığın mükemmel birleşimidir.
              </p>
              <p>
                Müşterilerimizin memnuniyeti ve güveni bizim için en değerli varlıktır. 
                Her üründe kalite standardımızı koruyarak, size en iyisini sunma hedefindeyiz.
              </p>
            </div>
            <div className="about-image">
              <div className="about-visual">
                <div className="quality-badge">
                  <span>Premium</span>
                  <span>Kalite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
