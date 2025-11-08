import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const scrollToSection = (id) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavClick = (section) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(section), 200);
    } else {
      scrollToSection(section);
    }
  };

  return (
    <nav className="navbar white-navbar" style={{ background: '#fff', borderBottom: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      <div className="navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '1rem 2.5rem' }}>
        <div className="navbar-logo">
          <a href="#home" className="navbar-brand" style={{ color: '#222', fontWeight: 700, fontSize: 26, textDecoration: 'none', letterSpacing: 1 }} onClick={handleNavClick("home")}>Thermal Comfort</a>
        </div>
        <ul className="navbar-links" style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a href="#home" className="navbar-link" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18 }} onClick={handleNavClick("home")}>Home</a></li>
          <li><a href="#about" className="navbar-link" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18 }} onClick={handleNavClick("about")}>About Us</a></li>
          <li><a href="#contact" className="navbar-link" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18 }} onClick={handleNavClick("contact")}>Contact Us</a></li>
          {!user && (
            <>
              <li><Link to="/login" className="navbar-link" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>Login</Link></li>
              <li><Link to="/signup" className="navbar-link signup-btn" style={{ color: '#fff', background: '#222', borderRadius: 4, padding: '8px 24px', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>Sign Up</Link></li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/dashboard" className="navbar-link" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="logout-btn navbar-link"
                  style={{
                    color: '#222',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: 18,
                    textDecoration: 'none',
                    fontFamily: 'inherit',
                    lineHeight: 'inherit',
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
