import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
import { fetchCategories } from '../store/categorySlice';
import Footer from '../components/Footer';
import { ShoppingBag, SlidersHorizontal, Grid3X3, List, Search, X, ChevronDown, Star, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Product() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.categories.items);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
    const [sortOption, setSortOption] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        // Apply filters and sorting
        let result = [...products];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategories.length > 0) {
            result = result.filter(product =>
                selectedCategories.includes(product.categoryId)
            );
        }

        // Apply price filter
        result = result.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply sorting
        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Default sorting (featured)
                break;
        }

        setFilteredProducts(result);
    }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

    const toggleFilterPanel = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const toggleViewType = () => {
        setViewType(viewType === 'grid' ? 'list' : 'grid');
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const handlePriceChange = (index, value) => {
        const newRange = [...priceRange];
        newRange[index] = Number(value);
        setPriceRange(newRange);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 5000]);
        setSearchQuery('');
        setSortOption('featured');
    };

    const getProductImage = (product) => {
        // Check if product has multiple images
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return `${process.env.REACT_APP_API_URL}public/img/${product.images[0]}`; // Use first image
        }
        // Fallback to single image field for backward compatibility
        if (product.imgUrl) {
            return `${process.env.REACT_APP_API_URL}public/img/${product.imgUrl}`;
        }
        // Default placeholder if no image
        return '/api/placeholder/300/300';
    };

    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>Deri Cüzdan Koleksiyonu | Toptan Deri Cüzdan | Sergio Ferrari</title>
                <meta name="description" content="Sergio Ferrari deri cüzdan koleksiyonu. İstanbul'da üretilen, el yapımı erkek ve kadın deri cüzdanlar. Toptan deri cüzdan satışı için bizimle iletişime geçin." />
                <meta name="keywords" content="deri cüzdan, toptan deri cüzdan, deri cüzdan istanbul, sergio ferrari, hakiki deri cüzdan, erkek deri cüzdan, kadın deri cüzdan" />
                <link rel="canonical" href="https://sergioferrari.tr/products" />
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": "Sergio Ferrari Deri Cüzdan Koleksiyonu",
                            "image": [
                                "https://sergioferrari.com/images/products/cuzdan1.jpg",
                                "https://sergioferrari.com/images/products/cuzdan2.jpg"
                            ],
                            "description": "El işçiliği ile üretilen premium deri cüzdanlar. Toptan deri cüzdan koleksiyonumuz, İstanbul'da üretilmektedir.",
                            "brand": {
                                "@type": "Brand",
                                "name": "Sergio Ferrari"
                            },
                            "offers": {
                                "@type": "AggregateOffer",
                                "offerCount": "${filteredProducts.length}",
                                "lowPrice": "${filteredProducts.length > 0 ? Math.min(...filteredProducts.map(p => p.price)) : 0}",
                                "highPrice": "${filteredProducts.length > 0 ? Math.max(...filteredProducts.map(p => p.price)) : 0}",
                                "priceCurrency": "TRY"
                            }
                        }
                    `}
                </script>
            </Helmet>
            
            {/* Hero Banner */}
            <div className="relative bg-black h-60 md:h-80 overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                    <img
                        src="/images/slider1.jpg"
                        alt="Products"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Ürünlerimiz</h1>
                    <div className="flex items-center text-white/80 text-sm">
                        <Link to="/" className="hover:text-amber-400 transition-colors">Ana Sayfa</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-amber-400">Ürünlerimiz</span>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto px-4 py-8">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={toggleFilterPanel}
                        className="flex items-center space-x-2 bg-black hover:bg-opacity-90 text-white px-4 py-2 rounded-md w-full justify-center transition-colors"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>{isFilterOpen ? 'Filtreleri Gizle' : 'Filtreleri Göster'}</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters - Sidebar */}
                    <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
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

                            {/* Search */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-3">Ara</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ürün ara..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                    <div className="absolute right-3 top-2.5 text-gray-400">
                                        {searchQuery ? (
                                            <X
                                                className="h-5 w-5 cursor-pointer hover:text-gray-600 transition-colors"
                                                onClick={() => setSearchQuery('')}
                                            />
                                        ) : (
                                            <Search className="h-5 w-5" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-3">Kategoriler</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {categories.map(category => (
                                        <div key={category._id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`category-${category._id}`}
                                                checked={selectedCategories.includes(category._id)}
                                                onChange={() => handleCategoryChange(category._id)}
                                                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                                            />
                                            <label htmlFor={`category-${category._id}`} className="ml-2 text-gray-700 hover:text-amber-600 cursor-pointer transition-colors">
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-3">Fiyat Aralığı</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            min="0"
                                            max={priceRange[1]}
                                            value={priceRange[0]}
                                            onChange={(e) => handlePriceChange(0, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                    </div>
                                    <span className="text-gray-500">-</span>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            min={priceRange[0]}
                                            max="10000"
                                            value={priceRange[1]}
                                            onChange={(e) => handlePriceChange(1, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="relative h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute h-full bg-amber-500 rounded-full"
                                        style={{
                                            left: `${(priceRange[0] / 5000) * 100}%`,
                                            right: `${100 - (priceRange[1] / 5000) * 100}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                    <span>0₺</span>
                                    <span>5000₺</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <ShoppingBag className="h-5 w-5 text-amber-600 mr-2" />
                                <span className="text-gray-700">{filteredProducts.length} Ürün</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Sort */}
                                <div className="relative">
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer text-gray-700"
                                    >
                                        <option value="featured">Öne Çıkanlar</option>
                                        <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                                        <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                                        <option value="name-asc">İsim: A-Z</option>
                                        <option value="name-desc">İsim: Z-A</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>

                                {/* View Type Toggle */}
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={`px-3 py-2 ${viewType === 'grid' ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-colors`}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={`px-3 py-2 ${viewType === 'list' ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-colors`}
                                    >
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Display */}
                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-xl font-medium text-gray-700 mb-2">Ürün Bulunamadı</h3>
                                <p className="text-gray-500 mb-6">Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirerek tekrar deneyin.</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                                >
                                    Filtreleri Temizle
                                </button>
                            </div>
                        ) : (
                            viewType === 'grid' ? (
                                // Grid View
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map(product => (
                                        <div key={product._id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <div className="relative aspect-w-1 aspect-h-1 bg-gray-100">
                                                <img
                                                    src={getProductImage(product)}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src = '/api/placeholder/300/300';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                        className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                                    >
                                                        Ürünü İncele
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center text-amber-400 mb-2">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                </div>
                                                <h3 className="text-gray-900 font-medium text-lg mb-1 truncate">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-black font-bold text-lg">{product.price}₺</span>
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                        className="text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors"
                                                    >
                                                        Detaylar
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // List View
                                <div className="space-y-4">
                                    {filteredProducts.map(product => (
                                        <div key={product._id} className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <div className="sm:w-48 h-48 bg-gray-100">
                                                <img
                                                    src={getProductImage(product)}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/api/placeholder/300/300';
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex items-center text-amber-400 mb-2">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                </div>
                                                <h3 className="text-gray-900 font-medium text-lg mb-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm mb-4 flex-grow">
                                                    {product.description}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-black font-bold text-xl">{product.price}₺</span>
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                        className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                                                    >
                                                        Ürünü İncele
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Custom CSS for scrollbars */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #b8860b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8b6914;
        }
      `}</style>

            <Footer />
        </div>
    );
}
