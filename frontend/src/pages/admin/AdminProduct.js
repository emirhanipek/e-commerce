import { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProductsByUserId } from "../../store/productSlice";
import './AdminProduct.css';

export default function AdminProduct() {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.product.userProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const deleteBtnOnClick = (productId) => {
        if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
            dispatch(deleteProduct(productId));
        }
    }

    const getProductImage = (product) => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return `http://localhost:8000/${product.images[0]}`;
        }
        if (product.imgUrl) {
            return `http://localhost:8000/${product.imgUrl}`;
        }
        return '/placeholder-image.jpg';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    useEffect(() => {
        dispatch(getProductsByUserId(userId));
    }, [userId, dispatch]);

    useEffect(() => {
        const filtered = userProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [userProducts, searchTerm]);

    return (
        <div className="admin-products-container">
            {/* Header Section */}
            <div className="admin-header">
                <div className="admin-title">
                    <h1>Ürün Yönetimi</h1>
                    <p>Mağazanızdaki ürünleri yönetin</p>
                </div>
                <Link to="/add_product" className="add-product-btn">
                    <AddIcon />
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Search Bar */}
            <div className="search-section">
                <div className="search-bar">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="products-count">
                    {filteredProducts.length} ürün bulundu
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="products-grid">
                    {filteredProducts.map(item => (
                        <div key={item._id} className="product-card">
                            <div className="product-image">
                                <img 
                                    src={getProductImage(item)} 
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                                <div className="image-overlay">
                                    <Link to={`/product/${item._id}`} className="view-btn">
                                        <VisibilityIcon />
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="product-content">
                                <div className="product-header">
                                    <h3 className="product-name">{item.name}</h3>
                                    <div className="product-price">{item.price}₺</div>
                                </div>
                                
                                <div className="product-meta">
                                    <span className="product-date">{formatDate(item.date)}</span>
                                </div>
                                
                                <div className="product-actions">
                                    <Link to={`/edit_product/${item._id}`} className="edit-btn">
                                        <DriveFileRenameOutlineIcon />
                                        Düzenle
                                    </Link>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => deleteBtnOnClick(item._id)}
                                    >
                                        <DeleteOutlineIcon />
                                        Sil
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h2>Henüz ürün yok</h2>
                    <p>İlk ürününüzü ekleyerek başlayın</p>
                    <Link to="/add_product" className="add-first-product-btn">
                        <AddIcon />
                        İlk Ürünü Ekle
                    </Link>
                </div>
            )}
        </div>
    )
}