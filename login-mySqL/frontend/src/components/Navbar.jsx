import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Manger Products </Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;