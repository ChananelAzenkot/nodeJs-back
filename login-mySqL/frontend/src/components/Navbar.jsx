import { useEffect } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Navbar() {
    
    const location = useLocation();

    return (
        <nav>
            <ul>
                <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
                <li className={location.pathname === '/products' ? 'active' : ''}><Link to="/products">Manger Products </Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;