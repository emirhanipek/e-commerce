import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, getProducts } from "../../store/productSlice";
import { addToCart } from "../../store/shopSlice";
import { ChevronLeft, ChevronRight, ShoppingCart, TruckIcon, RefreshCcw, ShieldCheck, Star } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function ProductDetail() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productDetail = useSelector(state => state.product.productDetail);
    const products = useSelector(state => state.product.products);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const getProductImages = () => {
        if (productDetail.images && Array.isArray(productDetail.images) && productDetail.images.length > 0) {
            return productDetail.images.map(img => `${process.env.REACT_APP_API_URL}${img}`);
        }
        if (productDetail.imgUrl) {
            return [`${process.env.REACT_APP_API_URL}${productDetail.imgUrl}`];
        }
        return ['/placeholder-image.jpg'];
    };

    const images = getProductImages();

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const onButtonClick = () => {
        dispatch(addToCart({productId: productId, userId: userId, quantity}));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    }

    // Get similar/suggested products
    const getSimilarProducts = () => {
        if (!productDetail.categoryId || !products.length) return [];
        return products.filter(p => 
            p.categoryId === productDetail.categoryId && 
            p._id !== productDetail._id
        ).slice(0, 4);
    };

    useEffect(() => {
        dispatch(getProductById(productId));
        dispatch(getProducts()); // Get all products for suggestions
        setCurrentImageIndex(0); // Reset image index when product changes
        setQuantity(1);
        setAddedToCart(false);
    }, [productId, dispatch])

    if (!productDetail._id) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Helmet>
                <title>{productDetail.name} | Deri Cüzdan | Sergio Ferrari</title>
                <meta name="description" content={`${productDetail.name} - ${productDetail.description && productDetail.description.substring(0, 150)}... Kaliteli deri cüzdan, İstanbul'da üretim. Toptan deri cüzdan için iletişime geçin.`} />
                <meta name="keywords" content={`deri cüzdan, ${productDetail.name}, toptan deri cüzdan, deri cüzdan istanbul, sergio ferrari, hakiki deri cüzdan`} />
                <link rel="canonical" href={`${process.env.REACT_APP_API_URL}product/${productId}`} />
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": "${productDetail.name}",
                            "image": ${JSON.stringify(images)},
                            "description": "${productDetail.description?.replace(/"/g, '\\"') || 'Kaliteli deri cüzdan'}",
                            "sku": "${productId}",
                            "brand": {
                                "@type": "Brand",
                                "name": "Sergio Ferrari"
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": "${process.env.REACT_APP_API_URL}product/${productId}",
                                "priceCurrency": "TRY",
                                "price": "${productDetail.price || 0}",
                                "itemCondition": "https://schema.org/NewCondition",
                                "availability": "https://schema.org/InStock"
                            }
                        }
                    `}
                </script>
            </Helmet>
            
            {/* Compact Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Geri Dön
                        </button>
                        <span className="mx-2">/</span>
                        <span>Ürün Detayı</span>
                    </div>
                </div>
            </div>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Compact Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Image Gallery - Compact */}
                    <div className="space-y-4">
                        {/* Main Image - Smaller */}
                        <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm aspect-square">
                            <img 
                                src={images[currentImageIndex]} 
                                alt={productDetail.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
                                    >
                                        <ChevronLeft className="h-4 w-4 text-gray-700" />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
                                    >
                                        <ChevronRight className="h-4 w-4 text-gray-700" />
                                    </button>
                                </>
                            )}
                            {/* Premium Badge */}
                            <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                Premium
                            </div>
                        </div>
                        
                        {/* Thumbnails - Smaller */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((image, index) => (
                                    <div 
                                        key={`thumb-${productDetail._id}-${index}`}
                                        className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 aspect-square ${index === currentImageIndex ? 'border-amber-500 shadow-sm' : 'border-gray-200 hover:border-amber-300'}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${productDetail.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info - Compact */}
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{productDetail.name}</h1>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center text-amber-400">                                {[...Array(5)].map((_, i) => (
                                    <Star key={`rating-main-${productDetail._id}-${i}`} className="h-4 w-4 fill-current" />
                                ))}
                                    <span className="text-gray-500 text-sm ml-2">(24)</span>
                                </div>
                                <span className="text-xs text-gray-500">#{productDetail._id.substring(0, 8)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-amber-600">{productDetail.price} ₺</div>
                                <div className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Stokta</div>
                            </div>
                        </div>

                        {/* Quick Features */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <h3 className="font-medium text-gray-800 mb-3">Özellikler</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-600">Yüksek Kalite</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-600">Modern Tasarım</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-600">Dayanıklı</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-600">Garantili</span>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart - Compact */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-sm font-medium text-gray-700">Adet:</span>
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <button 
                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200 text-sm"
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <div className="px-3 py-1 bg-white text-center min-w-[30px] text-sm">{quantity}</div>
                                    <button 
                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200 text-sm"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button 
                                className={`flex items-center justify-center w-full py-3 rounded-lg font-medium text-sm ${addedToCart ? 'bg-green-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'} transition-all duration-300 shadow-sm hover:shadow-md`}
                                onClick={onButtonClick}
                            >
                                {addedToCart ? (
                                    <>✓ Sepete Eklendi</>
                                ) : (
                                    <>
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Sepete Ekle
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Shipping Info - Compact */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <TruckIcon className="h-4 w-4 text-amber-500" />
                                    <span className="text-gray-700">100₺+ Ücretsiz Kargo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RefreshCcw className="h-4 w-4 text-amber-500" />
                                    <span className="text-gray-700">30 Gün İade</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-amber-500" />
                                    <span className="text-gray-700">24 Ay Garanti</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Description */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Ürün Açıklaması</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{productDetail.description}</p>
                </div>

                {/* Compact Similar Products */}
                {getSimilarProducts().length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Benzer Ürünler</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {getSimilarProducts().map(product => (
                                <div key={product._id} className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div 
                                        className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        <img 
                                            src={product.images && product.images.length > 0 
                                                ? `${process.env.REACT_APP_API_URL}${product.images[0]}` 
                                                : product.imgUrl 
                                                    ? `${process.env.REACT_APP_API_URL}${product.imgUrl}` 
                                                    : '/placeholder-image.jpg'
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="bg-white hover:bg-gray-50 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                İncele
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            Premium
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <div className="flex items-center text-amber-400 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={`rating-similar-${product._id}-${i}`} className="h-3 w-3 fill-current" />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300">
                                            {product.name}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">{product.price}₺</span>
                                            <button
                                                onClick={() => navigate(`/product/${product._id}`)}
                                                className="text-amber-600 hover:text-amber-700 text-xs font-medium transition-colors duration-300 flex items-center space-x-1"
                                            >
                                                <span>Detay</span>
                                                <ChevronRight className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
