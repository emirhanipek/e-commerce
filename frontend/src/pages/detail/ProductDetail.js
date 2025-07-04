import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from "../../store/productSlice";
import { addToCart } from "../../store/shopSlice";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './detail.css';

export default function ProductDetail() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const productDetail = useSelector(state => state.product.productDetail);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getProductImages = () => {
        if (productDetail.images && Array.isArray(productDetail.images) && productDetail.images.length > 0) {
            return productDetail.images.map(img => `http://localhost:8000/${img}`);
        }
        if (productDetail.imgUrl) {
            return [`http://localhost:8000/${productDetail.imgUrl}`];
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

    const onButtonClick = () => {
        dispatch(addToCart({productId: productId, userId: userId}));
        //navigate('/cart');
    }

    useEffect(() => {
        dispatch(getProductById(productId));
        setCurrentImageIndex(0); // Reset image index when product changes
    }, [productId, dispatch])

    return (
        <div className="modern-product-detail">
            {/* Hero Section */}
            <div className="product-hero">
                <div className="hero-content">
                    <div className="image-section">
                        <div className="main-image-wrapper">
                            {images.length > 1 && (
                                <button className="nav-btn prev-btn" onClick={prevImage}>
                                    <ArrowBackIosIcon />
                                </button>
                            )}
                            
                            <div className="main-image-display">
                                <img 
                                    src={images[currentImageIndex]} 
                                    alt={productDetail.name}
                                    onError={(e) => {
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                                {images.length > 1 && (
                                    <div className="image-indicator">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                )}
                            </div>

                            {images.length > 1 && (
                                <button className="nav-btn next-btn" onClick={nextImage}>
                                    <ArrowForwardIosIcon />
                                </button>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="thumbnails-grid">
                                {images.map((image, index) => (
                                    <div 
                                        key={index}
                                        className={`thumbnail-item ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${productDetail.name} ${index + 1}`}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <div className="product-header">
                            <h1>{productDetail.name}</h1>
                            <div className="price-tag">{productDetail.price}₺</div>
                        </div>
                        
                        <div className="product-summary">
                            <p>{productDetail.description}</p>
                        </div>

                        <div className="product-actions">
                            <button className="add-to-cart-btn" onClick={onButtonClick}>
                                Sepete Ekle
                            </button>
                            <div className="delivery-info">
                                <div className="delivery-item">
                                    <span className="icon">🚚</span>
                                    <span>Ücretsiz Kargo</span>
                                </div>
                                <div className="delivery-item">
                                    <span className="icon">↩️</span>
                                    <span>30 Gün İade</span>
                                </div>
                                <div className="delivery-item">
                                    <span className="icon">🛡️</span>
                                    <span>2 Yıl Garanti</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Description Section */}
            <div className="product-details-section">
                <div className="details-container">
                    <h2>Ürün Detayları</h2>
                    <div className="details-content">
                        <div className="detail-card">
                            <h3>Ürün Açıklaması</h3>
                            <p>{productDetail.description}</p>
                            <p>Bu ürün, en yüksek kalite standartlarında üretilmiş olup, modern tasarımı ve dayanıklı yapısıyla uzun yıllar kullanım sağlar. Detaylı işçilik ve özenle seçilmiş malzemelerle hazırlanmıştır.</p>
                        </div>
                        
                        <div className="detail-card">
                            <h3>Özellikler</h3>
                            <ul>
                                <li>Yüksek kalite malzeme</li>
                                <li>Modern ve şık tasarım</li>
                                <li>Uzun ömürlü kullanım</li>
                                <li>Kolay montaj</li>
                                <li>Çevre dostu üretim</li>
                            </ul>
                        </div>

                        <div className="detail-card">
                            <h3>Kargo ve İade</h3>
                            <p>Siparişleriniz 1-3 iş günü içinde kargoya verilir. 50₺ ve üzeri alışverişlerde kargo ücretsizdir. Ürünlerinizi 30 gün içinde hiçbir neden belirtmeksizin iade edebilirsiniz.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="product-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Hakkımızda</h4>
                        <p>Kaliteli ürünler ve mükemmel müşteri hizmetiyle sizlere hizmet veriyoruz.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Müşteri Hizmetleri</h4>
                        <ul>
                            <li>İletişim</li>
                            <li>SSS</li>
                            <li>Kargo Takibi</li>
                            <li>İade ve Değişim</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Kategoriler</h4>
                        <ul>
                            <li>Elektronik</li>
                            <li>Giyim</li>
                            <li>Ev & Yaşam</li>
                            <li>Spor</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Bizi Takip Edin</h4>
                        <div className="social-links">
                            <span>📧 info@mağaza.com</span>
                            <span>📞 0850 123 45 67</span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Modern E-Ticaret. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    )
}