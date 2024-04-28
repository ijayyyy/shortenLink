import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../util/useAuth";
import { logout } from "../Services/authServices";

import Logologo from "../images/Logologo.png";
import iconsMenu from "../images/iconsMenu.png";
import iconClose from "../images/iconClose.png";
import chevronDown from "../images/chevronDown.png";

function Header() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setNavbarOpen(!navbarOpen);
  };

  const handleLogout = () => {
    logout(() => navigate("/login")); 
  };

  return (
    <section>
      <header>
        <p className="logo"> 
          <img src={Logologo} alt="logo" />
        </p>

        <ul className={navbarOpen ? "navbar open" :  "navbar"}>
          <li>
            <Link to="/Dashboard" className="active">
              My URLs
            </Link>
          </li>
          {/* Other navigation links */}
          <li>
            <a href="#About" className="btnn" id="btnn">
              Features{" "} <img src={chevronDown} className="img1" id="img1" alt="" />
             
            </a>
            <ul className="dropdown" id="dropdown">
              <li>
                <a href="#About">item 1</a>
              </li>
              <li>
                <a href="#About">item 2</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#Prices">Pricing</a>
          </li>
          <li>
            <a href="#Main">Analytics</a>
          </li>
          <li>
            <a href="#Faqs">FAQs</a>
          </li>
          
          {/* Render "Try For Free" and "Log out" buttons among the navbar */}
          
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/LogIn" className="logbtn" onClick={handleLogout} >
                  Log out
                </Link>
              </li> 
              <li>
                <a href="#Prices" className="trybtn">
                  Try For Free
                </a>
              </li>
            </>
          ) : (
            <>
            <li>
              <Link to="/LogIn" className="logbtn">
                Log In
              </Link>
            </li>
            <li>
                <a href="#Prices" className="trybtn">
                  Try For Free
                </a>
              </li>
              </>
          )}

       </ul>
          
        

        <div>
          <span className="hamburger" onClick={handleClick}>
            {navbarOpen ? (
              <img
                src={iconClose} 
                alt="Close"
              />
            ) : (
              <img
                src={iconsMenu} 
                alt="Menu"
              />
            )}
          </span>
        </div>
      </header>
    </section>
  );
}

export default Header;
