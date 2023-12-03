import { useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navbar = [
    { path: "/", title: "Home" },
    { path: "/Products", title: "Manger Products" },
  ];

  return (
    <nav>
      <ul>
        {navbar.map((item, index) => {
          return (
            <li
              key={index}
              className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
