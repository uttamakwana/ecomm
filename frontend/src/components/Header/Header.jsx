import "./header.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { CgCloseR } from "react-icons/cg";
import { useState } from "react";
const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header className="header">
      <div className="header-logo flex-center">
        {/* <img src="" alt="logo" /> */}
        <h1>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "var(--color-dark-purple)",
            }}
          >
            TrendHaven
          </Link>
        </h1>
      </div>
      <div className={`header-nav flex-center ${mobileMenu ? "active" : ""}`}>
        <ul className={`header-nav-list`}>
          <li
            className="header-nav-list-item flex-center"
            onClick={() => setActiveLink("Home")}
          >
            <Link
              to="/"
              className={`header-nav-list-item-link ${
                activeLink === "Home" ? "active" : ""
              }`}
              onClick={() => {
                setMobileMenu(false);
              }}
            >
              Home
            </Link>
          </li>
          <li
            className="header-nav-list-item flex-center"
            onClick={() => setActiveLink("Product")}
          >
            <Link
              to="/products"
              className={`header-nav-list-item-link ${
                activeLink === "Product" ? "active" : ""
              }`}
              onClick={() => {
                setMobileMenu(false);
              }}
            >
              Product
            </Link>
          </li>
          <li
            className="header-nav-list-item flex-center"
            onClick={() => setActiveLink("Contact")}
          >
            <Link
              to="/contact"
              className={`header-nav-list-item-link ${
                activeLink === "Contact" ? "active" : ""
              }`}
              onClick={() => {
                setMobileMenu(false);
              }}
            >
              Contact
            </Link>
          </li>
          <li
            className="header-nav-list-item flex-center"
            onClick={() => setActiveLink("About")}
          >
            <Link
              to="/about"
              className={`header-nav-list-item-link ${
                activeLink === "About" ? "active" : ""
              }`}
              onClick={() => {
                setMobileMenu(false);
              }}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="header-menu flex-center">
        <Link
          to="/search"
          onClick={() => {
            setTimeout(() => {
              document.getElementById("search").focus();
            }, 1000);
          }}
        >
          <AiOutlineSearch className="header-menu-icon" />
        </Link>
        <AiOutlineShoppingCart className="header-menu-icon" />
        <CgProfile className="header-menu-icon" />
        {!mobileMenu ? (
          <TfiMenuAlt
            id="toggle-menu"
            className="header-menu-icon"
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          />
        ) : (
          <CgCloseR
            id="close-mobile-menu"
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
