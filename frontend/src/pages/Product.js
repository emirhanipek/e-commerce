import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
import { fetchCategories } from '../store/categorySlice';
import Footer from '../components/Footer';
import { ShoppingBag, Grid3X3, List, Search, X, Star, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Product() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.categories.items);
    const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
    const [sortOption, setSortOption] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Memoized data fetching
    const fetchData = useCallback(() => {
        dispatch(getProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    const handlePriceChange = useCallback((index, value) => {
        const newRange = [...priceRange];
        newRange[index] = Number(value);
        setPriceRange(newRange);
    }, [priceRange]);

    const clearFilters = useCallback(() => {
        setSelectedCategories([]);
        setPriceRange([0, 5000]);
        setSearchQuery('');
        setSortOption('featured');
    }, []);

    const getProductImage = useCallback((product) => {
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
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
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

            {/* Compact Top Filter Bar - Full Width */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="w-full px-4 py-3">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Left Side - Search and Count */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <ShoppingBag className="h-4 w-4 text-amber-600" />
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-gray-900">{filteredProducts.length}</span>
                                    <span className="text-gray-600 ml-1 text-sm">Ürün</span>
                                </div>
                            </div>
                            
                            <div className="relative flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Ürün ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                {searchQuery && (
                                    <X
                                        className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
                                        onClick={() => setSearchQuery('')}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Side - Filters and Controls */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Quick Category Filter */}
                            <select
                                value={selectedCategories[0] || ''}
                                onChange={(e) => setSelectedCategories(e.target.value ? [e.target.value] : [])}
                                className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                            >
                                <option value="">Tüm Kategoriler</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* Sort */}
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                            >
                                <option value="featured">Öne Çıkanlar</option>
                                <option value="price-asc">Fiyat ↑</option>
                                <option value="price-desc">Fiyat ↓</option>
                                <option value="name-asc">İsim A-Z</option>
                                <option value="name-desc">İsim Z-A</option>
                            </select>

                            {/* Price Range Inputs */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange[0] || ''}
                                    onChange={(e) => handlePriceChange(0, e.target.value)}
                                    className="w-20 px-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange[1] || ''}
                                    onChange={(e) => handlePriceChange(1, e.target.value)}
                                    className="w-20 px-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                <span className="text-xs text-gray-500">₺</span>
                            </div>

                            {/* Clear Filters */}
                            {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 5000) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-xs text-amber-600 hover:text-amber-700 font-medium px-3 py-2 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors duration-300"
                                >
                                    Temizle
                                </button>
                            )}

                            {/* View Toggle */}
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`p-1.5 rounded transition-all duration-300 ${
                                        viewType === 'grid' 
                                            ? 'bg-white text-amber-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`p-1.5 rounded transition-all duration-300 ${
                                        viewType === 'list' 
                                            ? 'bg-white text-amber-600 shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-Screen Products - No Sidebar, Full Width */}
            <div className="w-full px-4 py-6">

                {/* Full-Screen Products Display */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ürün Bulunamadı</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirerek tekrar deneyin.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                ) : (
                    viewType === 'grid' ? (
                        // Compact Grid View - Smaller Cards, More Products Per Row
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                            {filteredProducts.map(product => (
                                <div key={product._id} className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                        <img
                                            src={getProductImage(product)}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/250/250';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="bg-white hover:bg-gray-50 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                            >
                                                İncele
                                            </Link>
                                        </div>
                                        {/* Premium Badge - Smaller */}
                                        <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            Premium
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <div className="flex items-center text-amber-400 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={`star-grid-${product._id}-${i}`} className="h-3 w-3 fill-current" />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">{product.price}₺</span>
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="text-amber-600 hover:text-amber-700 text-xs font-medium transition-colors duration-300 flex items-center space-x-1"
                                            >
                                                <span>Detay</span>
                                                <ChevronRight className="h-3 w-3" />
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
                                <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-48 h-48 sm:h-32 bg-gray-100 overflow-hidden">
                                            <img
                                                src={getProductImage(product)}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = '/api/placeholder/200/200';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center text-amber-400 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={`star-list-${product._id}-${i}`} className="h-3 w-3 fill-current" />
                                                    ))}
                                                    <span className="text-xs text-gray-500 ml-2">(4.8)</span>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-amber-600 transition-colors duration-300">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xl font-bold text-gray-900">{product.price}₺</span>
                                                    <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                        Premium
                                                    </span>
                                                </div>
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                                                >
                                                    Ürünü İncele
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>

            <Footer />
        </div>
    );
}
