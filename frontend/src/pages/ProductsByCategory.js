import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import Products from "../components/products/Products";
import { getProductsByCategoryId, getProductsByPrice } from "../store/productSlice";
import { fetchCategories } from "../store/categorySlice";
import { ChevronRight, ShoppingBag } from 'lucide-react';
import Footer from '../components/Footer';
import './ProductsByCategory.css';
import { Helmet } from 'react-helmet';

export default function ProductsByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, categoryName, lowest, highest } = useParams();
  const products = useSelector(state => state.product.products);
  const categories = useSelector(state => state.categories.items);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    if (lowest && highest) {
      dispatch(getProductsByPrice({ lowest, highest, categoryId }));
    } else {
      dispatch(getProductsByCategoryId(categoryId));
    }
  }, [categoryId, lowest, highest, dispatch]);

  useEffect(() => {
    let sorted = [...products];
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  }, [products, sortBy]);

  const handlePriceFilter = () => {
    if (priceRange.min || priceRange.max) {
      const min = priceRange.min || 0;
      const max = priceRange.max || 99999;
      navigate(`/products/${categoryName}/${categoryId}/prc/between/${min}/${max}`);
    } else {
      navigate(`/products/${categoryName}/${categoryId}`);
    }
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSortBy('default');
    navigate(`/products/${categoryName}/${categoryId}`);
  };

  const currentCategory = categories.find(cat => cat._id === categoryId);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{categoryName || 'Ürünler'} | Deri Cüzdan Koleksiyonu | Sergio Ferrari</title>
        <meta 
          name="description" 
          content={`Sergio Ferrari ${categoryName || 'deri ürünler'} koleksiyonu. İstanbul'da üretilen, el yapımı deri cüzdanlar. Toptan deri cüzdan satışı için bizimle iletişime geçin.`} 
        />
        <meta 
          name="keywords" 
          content={`${categoryName || 'deri cüzdan'}, toptan deri cüzdan, deri cüzdan istanbul, sergio ferrari deri cüzdan, hakiki deri cüzdan`} 
        />
        <link rel="canonical" href={`https://sergioferrari.com/products/${categoryName}/${categoryId}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "${categoryName || 'Ürün Koleksiyonu'} - Sergio Ferrari",
              "description": "Sergio Ferrari ${categoryName || 'deri ürünler'} koleksiyonu. El yapımı, yüksek kaliteli deri cüzdanlar.",
              "url": "https://sergioferrari.com/products/${categoryName}/${categoryId}",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Sergio Ferrari",
                "url": "https://sergioferrari.com"
              },
              "numberOfItems": ${filteredProducts.length}
            }
          `}
        </script>
      </Helmet>
      
      {/* Hero Banner */}
      <div className="relative bg-black h-60 md:h-80 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="/images/slider1.jpg" 
            alt={currentCategory?.name || 'Ürünler'} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{currentCategory?.name || 'Ürünler'}</h1>
          <div className="flex items-center text-white/80 text-sm">
            <Link to="/" className="hover:text-amber-400 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">{currentCategory?.name || 'Ürünler'}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filtreler</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-amber-600 hover:text-amber-800 transition-colors"
                >
                  Temizle
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Kategori</h3>
                <div className="relative">
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      const selectedCategory = categories.find(cat => cat._id === e.target.value);
                      if (selectedCategory) {
                        navigate(`/products/${selectedCategory.name}/${selectedCategory._id}`);
                      }
                    }}
                    className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Fiyat Aralığı</h3>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    min={priceRange.min || 0}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handlePriceFilter}
                  className="w-full py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                >
                  Uygula
                </button>
              </div>

              {/* Sort Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Sırala</h3>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="default">Varsayılan</option>
                    <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                    <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                    <option value="name">İsim: A-Z</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Content */}
          <div className="flex-1">
            {/* Products Header */}
            <div className="flex items-center gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-amber-600" />
              <span className="text-gray-700">{filteredProducts.length} Ürün Bulundu</span>
            </div>

            {/* Products Display */}
            {filteredProducts.length > 0 ? (
              <Products products={filteredProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-500 mb-6">Bu kategoride ürün bulunamadı. Lütfen farklı filtreler deneyin veya diğer kategorilere göz atın.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}