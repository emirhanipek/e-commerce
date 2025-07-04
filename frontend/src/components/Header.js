import { Link, NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { useState } from "react";
import './Header.css';

export default function Header() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const cart = useSelector(state => state.shop.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <header className="modern-header">
            {/* Top Bar */}
            <div className="header-top">
                <div className="container">
                    <div className="top-left">
                        <span>Ücretsiz Kargo 500₺ ve üzeri alışverişlerde</span>
                    </div>
                    <div className="top-right">
                        <span>Müşteri Hizmetleri: 0850 123 45 67</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="header-main">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <div className="logo">
                            <Link to="/">
                                <h1>ShopApp</h1>
                                <span>Premium Store</span>
                            </Link>
                        </div>

                        {/* Navigation & Actions */}
                        <div className="nav-and-actions">
                            {/* Navigation */}
                            <nav className="header-nav-inline">
                                <ul className={`nav-list-inline ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                                    <li>
                                        <NavLink to="/" className="nav-link">Ana Sayfa</NavLink>
                                    </li>
                                    {isAuthenticated && (
                                        <>
                                            <li>
                                                <NavLink to="/add_product" className="nav-link">Ürün Ekle</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/admin_product" className="nav-link">Ürün Yönetimi</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/order" className="nav-link">Siparişlerim</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/logout" className="nav-link">Çıkış Yap</NavLink>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>

                            {/* Header Actions */}
                            <div className="header-actions">
                                {isAuthenticated ? (
                                    <>
                                        <div className="action-item">
                                            <PersonOutlineIcon />
                                            <span>Hesabım</span>
                                        </div>
                                        <div className="action-item">
                                            <FavoriteIcon />
                                            <span>Favoriler</span>
                                        </div>
                                        <Link to="/cart" className="action-item cart-link">
                                            <div className="cart-icon-wrapper">
                                                <ShoppingCartOutlinedIcon />
                                                {cart.length > 0 && (
                                                    <span className="cart-badge">{cart.length}</span>
                                                )}
                                            </div>
                                            <span>Sepetim</span>
                                        </Link>
                                    </>
                                ) : (
                                    <div className="auth-buttons">
                                        <Link to="/login" className="login-btn">Giriş Yap</Link>
                                        <Link to="/register" className="register-btn">Üye Ol</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                            <MenuIcon />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}