import { useEffect, useState, useCallback } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Memoized functions to prevent unnecessary re-renders
  const fetchData = useCallback(() => {
    dispatch(getProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const hidePrices = useCallback(() => {
    const pricesElement = document.querySelector('.prices');
    if (pricesElement) {
      pricesElement.style.display = 'none';
    }
  }, []);

  useEffect(() => {
    fetchData();
    hidePrices();
  }, [fetchData, hidePrices]); // Add dependencies

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const scrollToProducts = useCallback(() => {
    const element = document.querySelector('.featured-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const slides = [
    {
      id: 'slide-1',
      title: "Eşsiz Deri Sanatı ve Tasarımı",
      subtitle: "El İşçiliğiyle Hazırlanmış Premium Deri Ürünler",
      description: "Geleneksel zanaat teknikleri ile modern tasarımın buluştuğu koleksiyonumuz",
      image: "/images/slider1.jpg"
    },
    {
      id: 'slide-2',
      title: "Zarafet ve Kalite",
      subtitle: "Doğal Deriden Üretilen Lüks Aksesuarlar",
      description: "Her detayında mükemmellik arayışının yansıdığı özel tasarım ürünler",
      image: "/images/slider2.jpg"
    },
    {
      id: 'slide-3',
      title: "Ustalık ve Gelenek",
      subtitle: "Nesilden Nesile Aktarılan Deri İşçiliği",
      description: "Yılların deneyimi ve modern teknolojinin mükemmel uyumu",
      image: "/images/slider3.webp"
    }
  ];

  return (
    <div className="bg-white text-black font-serif">
      <Helmet>
        <title>Sergio Ferrari | Toptan Deri Cüzdan | İstanbul El Yapımı Deri Cüzdanlar</title>
        <meta name="description" content="Sergio Ferrari, İstanbul'da el yapımı hakiki deri cüzdan üreticisi. Toptan deri cüzdan, erkek ve kadın deri cüzdan modelleri uygun fiyatlarla." />
        <meta name="keywords" content="deri cüzdan, toptan deri cüzdan, deri cüzdan istanbul, sergio ferrari deri cüzdan, erkek deri cüzdan, kadın deri cüzdan" />
        <link rel="canonical" href="https://sergioferrari.tr" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Sergio Ferrari Deri Cüzdan",
              "description": "İstanbul'un en kaliteli deri cüzdan üreticisi",
              "url": "https://sergioferrari.tr",
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
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="relative h-full w-full">
          {slides.map((slide) => (
            <div key={slide.id} className={`hero-slide ${slides.indexOf(slide) === currentSlide ? 'active' : ''}`}>
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{backgroundImage: `url(${slide.image})`}}
              >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
              </div>
              <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
                <div className="max-w-4xl text-white">
                  <h1 className="text-4xl md:text-6xl font-normal mb-4 tracking-wider drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <h2 className="text-lg md:text-2xl font-light mb-8 opacity-90 leading-relaxed">
                    {slide.subtitle}
                  </h2>
                  <p className="text-base md:text-lg mb-12 opacity-80 leading-relaxed max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button 
                      className="bg-yellow-600 hover:bg-yellow-500 text-black px-8 py-4 text-base font-semibold tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      onClick={scrollToProducts}
                    >
                      Koleksiyonu Keşfet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Navigation */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-30">
          {slides.map((slide) => (
            <button 
              key={`nav-${slide.id}`} 
              className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
                slides.indexOf(slide) === currentSlide 
                  ? 'bg-yellow-600 transform scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => setCurrentSlide(slides.indexOf(slide))}
            />
          ))}
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16 pt-3">
            <h2 className="text-4xl font-normal text-black mb-4 tracking-wide">Kategoriler</h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
              Özenle seçilmiş deri ürün koleksiyonlarımız
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[450px]">
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

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[450px]">
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

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[450px]">
              <img 
                src="/images/klac_cuzdan.jpg" 
                alt="Klac" 
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
      <section className="featured-products py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal text-black mb-4 tracking-wide">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
              El işçiliğiyle hazırlanmış özel tasarım ürünler
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.slice(0, 3).map(product => (
              <Link 
                key={product._id} 
                to={`/product/${product._id}`} 
                className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.images && product.images.length > 0 
                      ? `${process.env.REACT_APP_API_URL}public/img/${product.images[0]}` 
                      : '/api/placeholder/300/300'} 
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/api/placeholder/300/300'; }}
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-normal text-black mb-2 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-normal text-black mb-8 tracking-wide">
                Ustalık ve Gelenek
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Yılların deneyimi ve geleneksel deri işçiliği tekniklerini modern tasarım anlayışıyla 
                harmanlayarak, her ürünümüzü özenle hazırlıyoruz. Kaliteli hammaddeler ve titiz 
                işçilikle ürettiğimiz deri ürünler, zarafet ve dayanıklılığın mükemmel birleşimidir.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Müşterilerimizin memnuniyeti ve güveni bizim için en değerli varlıktır. 
                Her üründe kalite standardımızı koruyarak, size en iyisini sunma hedefindeyiz.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-500 flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-semibold tracking-wide mb-2">Premium</div>
                  <div className="text-xl font-semibold tracking-wide">Kalite</div>
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
