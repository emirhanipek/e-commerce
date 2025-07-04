import { Outlet, useLocation } from "react-router-dom";
import Navigation from"../../components/Navigation/Navigation"
import'./layout.css';

export default function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    return (
        <div className={`layout ${isHomePage ? 'home-layout' : ''}`}>
            {!isHomePage && <Navigation/>}
            <div className={isHomePage ? 'full-width' : 'content'}>
                <Outlet />
            </div>
        </div>
    )
}