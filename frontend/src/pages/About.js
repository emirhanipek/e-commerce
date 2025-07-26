import React from 'react';
import Footer from "../components/Footer";
import { Helmet } from 'react-helmet';

export default function About() {
  return (
    <div className="bg-white font-serif">
      <Helmet>
        <title>Hakkımızda | Sergio Ferrari Deri Cüzdan | İstanbul Deri Atölyesi</title>
        <meta name="description" content="Sergio Ferrari Deri Cüzdan, 40 yılı aşkın deneyimiyle İstanbul'da el yapımı deri cüzdanlar üreten bir atölyedir. Toptan deri cüzdan üretimi konusunda uzmanlaşmış ekibimizle tanışın." />
        <meta name="keywords" content="sergio ferrari hakkında, deri cüzdan atölyesi, istanbul deri cüzdan üreticisi, toptan deri cüzdan imalatı, hakiki deri cüzdan üretimi" />
        <link rel="canonical" href="https://sergioferrari.tr/about" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "url": "https://sergioferrari.tr/about",
              "name": "Sergio Ferrari Hakkında",
              "description": "Sergio Ferrari'nin hikayesi ve deri cüzdan üretim değerleri.",
              "mainEntity": {
                "@type": "Organization",
                "name": "Sergio Ferrari",
                "foundingDate": "1985",
                "description": "İstanbul merkezli deri cüzdan üreticisi",
                "founder": {
                  "@type": "Person",
                  "name": "Sergio Ferrari"
                }
              }
            }
          `}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-amber-50 to-amber-100">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: `url('/images/slider1.jpg')`}}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide drop-shadow-lg">
              Geleneksel Zanaat, Modern Tasarım
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
              Yılların deneyimi ve tutku ile özenle hazırlanmış deri ürünleri
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-light text-amber-900 mb-6 tracking-wide">Hikayemiz</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                1985 yılında küçük bir atölyede başlayan yolculuğumuz, deri işçiliğine olan tutkumuz 
                ve müşterilerimizin güvenini kazanma kararlılığımızla bugünlere ulaştı. Geleneksel 
                deri işçiliği tekniklerini modern tasarım anlayışıyla harmanlayarak, her ürünümüzü 
                bir sanat eseri gibi özenle hazırlıyoruz.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kaliteli hammadde seçiminden son aşamaya kadar, her adımda mükemmellik arayışı 
                içindeyiz. Doğal deri kullanımı, el işçiliği ve titiz kalite kontrolü ile 
                ürettiğimiz ürünler, yalnızca günlük kullanım için değil, yaşam boyu size 
                eşlik edecek değerli aksesuarlar olarak tasarlanmıştır.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <span className="block text-5xl font-semibold mb-2">40+</span>
                  <span className="block text-xl font-medium tracking-wider">Yıllık Deneyim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-amber-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-amber-900 mb-4 tracking-wide">Değerlerimiz</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Kalite, güvenilirlik ve müşteri memnuniyeti odaklı yaklaşımımız
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
              <h3 className="text-2xl font-medium text-amber-800 mb-4">Kalite</h3>
              <p className="text-gray-700">
                Sadece en kaliteli deri hammaddelerini kullanır, her üründe 
                titiz kalite kontrol süreçleri uygularız.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
              <h3 className="text-2xl font-medium text-amber-800 mb-4">Ustalık</h3>
              <p className="text-gray-700">
                Yılların deneyimi ile kazanılmış el işçiliği becerileri, 
                geleneksel tekniklerle modern teknoloji birleşimi.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
              <h3 className="text-2xl font-medium text-amber-800 mb-4">Güvenilirlik</h3>
              <p className="text-gray-700">
                Müşterilerimizin güvenini kazanmak ve korumak, 
                işimizin en temel prensibidir.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
              <h3 className="text-2xl font-medium text-amber-800 mb-4">Sürdürülebilirlik</h3>
              <p className="text-gray-700">
                Çevreye saygılı üretim süreçleri ve doğal malzemelerin 
                sorumlu kullanımı önceliğimizdir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-amber-900 mb-4 tracking-wide">Üretim Sürecimiz</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Her ürün, titiz bir süreç sonunda hayat bulur
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-6 shadow-lg">01</div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">Hammadde Seçimi</h3>
              <p className="text-gray-700">En kaliteli doğal deri hammaddelerinin özenle seçilmesi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-6 shadow-lg">02</div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">Tasarım ve Kalıp</h3>
              <p className="text-gray-700">Fonksiyonel ve estetik tasarımların kalıp haline getirilmesi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-6 shadow-lg">03</div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">El İşçiliği</h3>
              <p className="text-gray-700">Deneyimli ustalarımız tarafından titiz el işçiliği</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-6 shadow-lg">04</div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">Kalite Kontrol</h3>
              <p className="text-gray-700">Her ürünün son aşamada detaylı kalite kontrolünden geçirilmesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-amber-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-amber-900 mb-4 tracking-wide">Uzman Ekibimiz</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Deneyimli ustalar ve tasarımcılardan oluşan ekibimiz
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-amber-500 mb-1">15+</div>
              <div className="text-lg text-gray-700 font-medium">Uzman Usta</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-amber-500 mb-1">40+</div>
              <div className="text-lg text-gray-700 font-medium">Yıllık Deneyim</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-amber-500 mb-1">1000+</div>
              <div className="text-lg text-gray-700 font-medium">Mutlu Müşteri</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-amber-500 mb-1">500+</div>
              <div className="text-lg text-gray-700 font-medium">Üretilen Ürün</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-light text-amber-900 mb-6 tracking-wide">Misyon & Vizyon</h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-amber-800">Misyonumuz</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Geleneksel deri işçiliğini modern tasarım anlayışıyla harmanlayarak, 
                  kaliteli ve dayanıklı ürünler üretmek. Müşterilerimize değer katacak, 
                  yaşam boyu kullanabilecekleri özel aksesuarlar sunmak.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-amber-800">Vizyonumuz</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Deri ürünleri sektöründe kalite ve güvenilirliğin sembolü olmak. 
                  Ulusal ve uluslararası pazarlarda tercih edilen, saygın bir marka 
                  haline gelmek ve deri işçiliğinin gelecek nesillere aktarılmasına 
                  katkı sağlamak.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-amber-500 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <span className="block text-xl font-medium text-amber-800">Kalite</span>
                  <span className="block text-xl font-medium text-amber-800">Güvenilirlik</span>
                  <span className="block text-xl font-medium text-amber-800">Sürdürülebilirlik</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       <Footer />
    </div>

   
  );
}