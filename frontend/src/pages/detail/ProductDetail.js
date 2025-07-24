import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, getProducts } from "../../store/productSlice";
import { addToCart } from "../../store/shopSlice";
import { ChevronLeft, ChevronRight, ShoppingCart, TruckIcon, RefreshCcw, ShieldCheck, Star, StarHalf } from 'lucide-react';
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
    const [activeTab, setActiveTab] = useState('description');
    const [addedToCart, setAddedToCart] = useState(false);

    const getProductImages = () => {
        if (productDetail.images && Array.isArray(productDetail.images) && productDetail.images.length > 0) {
            return productDetail.images.map(img => `https://api.sergioferrari.tr:8000/${img}`);
        }
        if (productDetail.imgUrl) {
            return [`https://api.sergioferrari.tr:8000/${productDetail.imgUrl}`];
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
        <div className="bg-gray-50 min-h-screen pt-8">
            <Helmet>
                <title>{productDetail.name} | Deri Cüzdan | Sergio Ferrari</title>
                <meta name="description" content={`${productDetail.name} - ${productDetail.description && productDetail.description.substring(0, 150)}... Kaliteli deri cüzdan, İstanbul'da üretim. Toptan deri cüzdan için iletişime geçin.`} />
                <meta name="keywords" content={`deri cüzdan, ${productDetail.name}, toptan deri cüzdan, deri cüzdan istanbul, sergio ferrari, hakiki deri cüzdan`} />
                <link rel="canonical" href={`https://sergioferrari.com/product/${productId}`} />
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
                                "url": "https://sergioferrari.com/product/${productId}",
                                "priceCurrency": "TRY",
                                "price": "${productDetail.price || 0}",
                                "itemCondition": "https://schema.org/NewCondition",
                                "availability": "https://schema.org/InStock"
                            }
                        }
                    `}
                </script>
            </Helmet>
            
            {/* Hero Section */}
            <div className="max-w-12xl mx-auto pt-6 px-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Left Column - Product Images */}
                    <div className="flex flex-col space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md aspect-w-4 aspect-h-3">
                            <img 
                                src={images[currentImageIndex]} 
                                alt={productDetail.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                            
                          
                        </div>
                        
                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-5 gap-2">
                                {images.map((image, index) => (
                                    <div 
                                        key={index}
                                        className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 aspect-w-1 aspect-h-1 ${index === currentImageIndex ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-primary-300'}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${productDetail.name} thumbnail ${index + 1}`}
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

                    {/* Right Column - Product Info */}
                    <div className="flex flex-col space-y-5">
                        {/* Product Header */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{productDetail.name}</h1>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-500">Ürün Kodu: {productDetail._id.substring(0, 8)}</span>
                                <div className="flex items-center text-amber-400">
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <StarHalf className="h-4 w-4 fill-current" />
                                    <span className="text-gray-500 text-xs ml-1">(24 değerlendirme)</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                                <div className="text-3xl font-bold text-amber-600">{productDetail.price} ₺</div>
                                <span className="text-sm text-green-600 font-medium">Stokta var</span>
                            </div>
                        </div>

                        {/* Quick Overview */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="font-medium text-gray-800 mb-3">Hızlı Bakış</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {productDetail.description}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                    <span className="text-gray-600">Yüksek kalite</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                    <span className="text-gray-600">Modern tasarım</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                    <span className="text-gray-600">Dayanıklı yapı</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                    <span className="text-gray-600">Kolay kullanım</span>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-gray-700 font-medium">Adet</span>
                                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                                    <button 
                                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <div className="px-4 py-2 bg-white text-center min-w-[40px]">{quantity}</div>
                                    <button 
                                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button 
                                className={`flex items-center justify-center w-full p-3 rounded-lg font-medium ${addedToCart ? 'bg-green-500 text-white' : 'bg-black hover:bg-gray-900 text-white'} transition-all duration-300 shadow-md hover:shadow-lg`}
                                onClick={onButtonClick}
                            >
                                {addedToCart ? (
                                    <>Sepete Eklendi ✓</>
                                ) : (
                                    <>
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        Sepete Ekle
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Shipping Info */}
                        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <TruckIcon className="h-5 w-5 text-amber-500" />
                                <span className="text-sm text-gray-700">100₺ Üzeri Ücretsiz Kargo</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <RefreshCcw className="h-5 w-5 text-amber-500" />
                                <span className="text-sm text-gray-700">30 Gün İade Garantisi</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-amber-500" />
                                <span className="text-sm text-gray-700">24 Ay Garanti</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs and Detailed Content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'description' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Ürün Açıklaması
                            </button>
                            <button
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'details' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('details')}
                            >
                                Özellikler
                            </button>
                            <button
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'shipping' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('shipping')}
                            >
                                Kargo & İade
                            </button>
                            <button
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'reviews' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Değerlendirmeler (24)
                            </button>
                        </nav>
                    </div>
                    
                    <div className="p-6">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ürün Açıklaması</h3>
                                <p className="text-gray-600 mb-4">{productDetail.description}</p>
                                <p className="text-gray-600 mb-4">
                                    Bu ürün, en yüksek kalite standartlarında üretilmiş olup, modern tasarımı ve dayanıklı yapısıyla uzun yıllar kullanım sağlar. 
                                    Detaylı işçilik ve özenle seçilmiş malzemelerle hazırlanmıştır.
                                </p>
                                <p className="text-gray-600">
                                    Modern yaşam alanlarına şık bir dokunuş katmak isteyenler için ideal bir seçimdir. 
                                    Estetiği ve işlevselliği bir arada sunan bu ürün, kullanıcılarına hem görsel hem de pratik açıdan memnuniyet sağlar.
                                </p>
                            </div>
                        )}
                        
                        {activeTab === 'details' && (
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ürün Özellikleri</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-amber-800 mb-2">Genel Özellikler</h4>
                                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                                            <li>Yüksek kalite malzemeden üretilmiştir</li>
                                            <li>Modern ve şık tasarıma sahiptir</li>
                                            <li>Uzun ömürlü kullanım için tasarlanmıştır</li>
                                            <li>Kolay montaj imkanı sunar</li>
                                            <li>Çevre dostu üretim süreçleriyle hazırlanmıştır</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-amber-800 mb-2">Teknik Özellikler</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-600 font-medium">Boyut:</div>
                                            <div className="text-gray-600">30 x 45 cm</div>
                                            
                                            <div className="text-gray-600 font-medium">Ağırlık:</div>
                                            <div className="text-gray-600">1.2 kg</div>
                                            
                                            <div className="text-gray-600 font-medium">Malzeme:</div>
                                            <div className="text-gray-600">Premium Ahşap</div>
                                            
                                            <div className="text-gray-600 font-medium">Menşei:</div>
                                            <div className="text-gray-600">Türkiye</div>
                                            
                                            <div className="text-gray-600 font-medium">Garanti:</div>
                                            <div className="text-gray-600">24 Ay</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'shipping' && (
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Kargo ve İade Bilgileri</h3>
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-gray-700 mb-2">Kargo Bilgileri</h4>
                                    <p className="text-gray-600 mb-2">
                                        Siparişleriniz 1-3 iş günü içinde kargoya verilir. 100₺ ve üzeri alışverişlerde kargo ücretsizdir.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>Türkiye'nin her yerine gönderim yapılmaktadır</li>
                                        <li>Hafta içi saat 14:00'e kadar verilen siparişler aynı gün kargolanır</li>
                                        <li>Kargo takip numarası SMS ile iletilir</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2">İade ve Değişim</h4>
                                    <p className="text-gray-600 mb-2">
                                        Ürünlerinizi 30 gün içinde hiçbir neden belirtmeksizin iade edebilirsiniz.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>İade etmek istediğiniz ürün orijinal ambalajında ve kullanılmamış olmalıdır</li>
                                        <li>İade kargo ücreti müşteriye aittir</li>
                                        <li>İade onayından sonra 3 iş günü içinde ödeme iadesi yapılır</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'reviews' && (
                            <div className="prose max-w-none">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-800">Müşteri Değerlendirmeleri</h3>
                                    <div className="flex items-center">
                                        <div className="flex text-amber-400 mr-2">
                                            <Star className="h-5 w-5 fill-current" />
                                            <Star className="h-5 w-5 fill-current" />
                                            <Star className="h-5 w-5 fill-current" />
                                            <Star className="h-5 w-5 fill-current" />
                                            <StarHalf className="h-5 w-5 fill-current" />
                                        </div>
                                        <span className="text-gray-700 font-medium">4.7/5</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {/* Sample Reviews */}
                                    <div className="border-b border-gray-200 pb-6">
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-amber-400 mr-2">
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                            </div>
                                            <span className="text-gray-700 font-medium">Ahmet Y.</span>
                                            <span className="text-gray-500 text-sm ml-auto">10 Haziran 2025</span>
                                        </div>
                                        <p className="text-gray-600">Harika bir ürün! Beklentilerimin üzerinde çıktı. Hızlı kargo ve sağlam paketleme için de teşekkürler.</p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-6">
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-amber-400 mr-2">
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4" />
                                            </div>
                                            <span className="text-gray-700 font-medium">Zeynep K.</span>
                                            <span className="text-gray-500 text-sm ml-auto">28 Mayıs 2025</span>
                                        </div>
                                        <p className="text-gray-600">Kaliteli malzemeden üretilmiş, şık bir ürün. Evimize çok yakıştı. Dördüncü yıldızı küçük bir montaj zorluğu nedeniyle kırdım.</p>
                                    </div>
                                    
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-amber-400 mr-2">
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                                <Star className="h-4 w-4 fill-current" />
                                            </div>
                                            <span className="text-gray-700 font-medium">Mehmet A.</span>
                                            <span className="text-gray-500 text-sm ml-auto">15 Mayıs 2025</span>
                                        </div>
                                        <p className="text-gray-600">Uzun araştırmalar sonucu bu ürünü tercih ettim ve kesinlikle doğru bir karar vermişim. Kalitesi, görünüşü ve kullanım kolaylığı tam istediğim gibi.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products */}
                {getSimilarProducts().length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benzer Ürünler</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {getSimilarProducts().map(product => (
                                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div 
                                        className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        <img 
                                            src={product.images && product.images.length > 0 
                                                ? `http://localhost:8000/${product.images[0]}` 
                                                : product.imgUrl 
                                                    ? `http://localhost:8000/${product.imgUrl}` 
                                                    : '/placeholder-image.jpg'
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-gray-900 font-medium text-sm mb-1 truncate">{product.name}</h3>
                                        <p className="text-amber-600 font-bold">{product.price} ₺</p>
                                        <button 
                                            className="mt-2 w-full text-center py-2 bg-black hover:bg-gray-900 text-white text-sm rounded transition-colors duration-200"
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            Ürünü İncele
                                        </button>
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
