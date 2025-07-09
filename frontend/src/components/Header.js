import { Link, NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { useState } from "react";
import './Header.css';
import './HeaderTailwind.css';

export default function Header() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const cart = useSelector(state => state.shop.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileAdminMenuOpen, setMobileAdminMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileMenuOpen) {
            setMobileAdminMenuOpen(false); // Close admin menu when closing mobile menu
        }
    }

    return (
        <header className="modern-header">
            {/* Top Bar */}
            <div className="header-top">
                <div className="container top-center">
                        <span>Sergio Ferrari -- Yüksek Kalite Düşük Fiyat</span>
                </div>
            </div>

            {/* Main Header */}
            <div className="header-main">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <div className="logo">
                            <Link to="/">
                                <div className="logo-text flex items-center">
                                    <img width='70' src="/images/logo.png" alt="ShopApp Logo" className="logo-image" />
                                    <span className="ml-2 font-bold text-xl">Sergio Ferrari</span>
                                </div>
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
                                    <li>
                                        <NavLink to="/about" className="nav-link">Hakkımızda</NavLink>
                                    </li>
                                     <li>
                                        <NavLink to="/products" className="nav-link">Ürünler</NavLink>
                                    </li>
                                     <li>
                                        <NavLink to="/contact" className="nav-link">İletişim</NavLink>
                                    </li>



                                    {isAuthenticated && (
                                        <li className="relative group">
                                            <button className="nav-link m-0 flex items-center">
                                                Admin Paneli
                                            </button>
                                            <div className="absolute left-0 w-48 bg-white shadow-lg rounded-md invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1">
                                                <ul>
                                                    <li>
                                                        <NavLink to="/add_product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200">Ürün Ekle</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/admin_product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200">Ürün Yönetimi</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/admin_category" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200">Kategori Ekle</NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </nav>

                            {/* Header Actions */}
                            <div className="header-actions">
                                {isAuthenticated ? (
                                    <>
                                        <div className="relative group">
                                            <div className="action-item flex flex-row items-center">
                                                <PersonOutlineIcon className="text-gray-700" />
                                                <span className="">Hesabım</span>
                                            </div>
                                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1">
                                                <ul>
                                                    <li>
                                                        <NavLink to="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                                                            <span className="flex items-center">
                                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                                                </svg>
                                                                Çıkış Yap
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="action-item">
                                            <FavoriteIcon />
                                            <span>Favoriler</span>
                                        </div>
                                       
                                    </>
                                ) : (
                                    <div className="auth-buttons">
                                        <Link to="/login" className="login-btn">Giriş Yap</Link>
                                        {/* <Link to="/register" className="register-btn">Üye Ol</Link> */}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                            <MenuIcon className="text-gray-700 hover:text-purple-600 transition-colors duration-200" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Only visible when toggled) */}
            <div className={`md:hidden bg-white shadow-lg ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                <ul className="py-2">
                    <li>
                        <NavLink to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Ana Sayfa</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Hakkımızda</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>Ürünler</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleMobileMenu}>İletişim</NavLink>
                    </li>
                    
                    {isAuthenticated && (
                        <li className="px-4 py-2">
                            <div className="flex items-center justify-between text-gray-700" onClick={() => setMobileAdminMenuOpen(!mobileAdminMenuOpen)}>
                                <span>Admin Paneli</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileAdminMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            
                            {mobileAdminMenuOpen && (
                                <ul className="mt-2 ml-4 border-l-2 border-purple-200 pl-4">
                                    <li>
                                        <NavLink to="/add_product" className="block py-2 text-sm text-gray-700 hover:text-purple-600" onClick={toggleMobileMenu}>Ürün Ekle</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin_product" className="block py-2 text-sm text-gray-700 hover:text-purple-600" onClick={toggleMobileMenu}>Ürün Yönetimi</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/order" className="block py-2 text-sm text-gray-700 hover:text-purple-600" onClick={toggleMobileMenu}>Siparişlerim</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin_category" className="block py-2 text-sm text-gray-700 hover:text-purple-600" onClick={toggleMobileMenu}>Kategori Ekle</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </header>
    )
}