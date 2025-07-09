import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from '../../store/categorySlice';
import './style.css'

export default function Navigation() {
    const categories = useSelector(state => state.categories.items);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryName, categoryId } = useParams();
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    
    // Admin kontrolü yapılıyor
    const isAdmin = auth.user && auth.user.role === 'admin';
    
    return (
        <div className="container-nav">
            <nav className="nav-categories">
                <ul>
                    {
                        categories.map(category => {
                            return (
                                <li key={category._id}><NavLink to={`/products/${category.name}/${category._id}`}>{category.name}</NavLink></li>
                            )
                        })
                    }
                </ul>
            </nav>
            
            {/* Admin Paneli Linkleri */}
            {isAdmin && (
                <div className="admin-panel">
                    <h4>Admin Paneli</h4>
                    <nav className="nav-admin">
                        <ul>
                            <li><NavLink to="/admin_product">Ürün Yönetimi</NavLink></li>
                            <li><NavLink to="/admin_category">Kategori Yönetimi</NavLink></li>
                        </ul>
                    </nav>
                </div>
            )}
            
            <div className="prices">
                <h4>Prices</h4>
                <nav className="nav-prices">
                    <ul>
                        <li><NavLink to={`/products/${categoryName}/${categoryId}/prc/between/${0}/${2000}`}>0-2000</NavLink></li>
                        <li><NavLink to={`/products/${categoryName}/${categoryId}/prc/between/${2000}/${5000}`}>2000-5000</NavLink></li>
                        <li><NavLink to={`/products/${categoryName}/${categoryId}/prc/between/${5000}/${7500}`}>5000-7500</NavLink></li>
                        <li><NavLink to={`/products/${categoryName}/${categoryId}/prc/between/${7500}/${10000}`}>7500-10000</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}