import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../util/useAuth";
import { logout } from "../Services/authServices";

import Logologo from "../images/Logologo.png";
import iconsMenu from "../images/iconsMenu.png";
import chevronDown from "../images/chevronDown.png";

function Header() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/login"));
  };

  return (
    <section>
      <header>
        <p className="logo">
          <img src={Logologo} alt="logo" />
        </p>

        <ul className="navbar">
          <li>
            <Link to="/Dashboard" className="active">
              My URLs
            </Link>
          </li>
          {/* Other navigation links */}
          <li>
            <a href="#About" className="btnn" id="btnn">
              Features{" "}
              <img src={chevronDown} className="img1" id="img1" alt="" />
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
        </ul>

        <div className="main1">
          {/* Conditionally render logout button if user is logged in */}
          {isLoggedIn ? (
            <>
              <a href="#Prices" className="trybtn" id="">
                Try For Free
              </a>

              <Link to="/LogIn" className="logbtn" onClick={handleLogout}>
                Log out
              </Link>
              <span className="menu" id="micon">
                <img src={iconsMenu} alt="m" />
              </span>
            </>
          ) : (
            <>
              <Link to="/LogIn" className="logbtn">
                Log In
              </Link>

              <span className="menu" id="micon">
                <img src={iconsMenu} alt="m" />
              </span>
            </>
          )}
        </div>
      </header>
    </section>
  );
}

export default Header;
