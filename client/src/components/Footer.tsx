import React from "react";

import "../App.css";
import Logo from "../images/Logo.png";
import twitter from "../images/twitter.png";
import feather from "../images/feather.png";
import linkedin from "../images/linkedin.png";
import facebook from "../images/facebook.png";

function Footer() {
  return (
    <section>
      <footer>
        <div className="cont8i">
          <div className="cont-8-container">
            <div className="cont8">
              <h4>
                <img src={Logo} alt="" />
              </h4>
              <div className="social-links">
                <a href="/">
                  <img src={twitter} alt="" className="img11" />
                </a>
                <a href="/">
                  <img src={feather} alt="" className="img11" />
                </a>
                <a href="/">
                  <img src={linkedin} alt="" className="img11" />
                </a>
                <a href="/">
                  <img src={facebook} alt="" className="img11" />
                </a>
              </div>
            </div>
          </div>

          <div className="cont-8-containerii">
            <div className="cont8">
              <h3>Why Scissor?</h3>
              <ul>
                <li>
                  <a href="/">Scissor 101</a>
                </li>
                <li>
                  <a href="/">Integrations & API</a>
                </li>
                <li>
                  <a href="/">Pricing</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="cont-8-containeriii">
            <div className="cont8">
              <h3>Solutions</h3>
              <ul>
                <li>
                  <a href="/">Social Media</a>
                </li>
                <li>
                  <a href="/">Digital Marketing</a>
                </li>
                <li>
                  <a href="/">Customer Service</a>
                </li>
                <li>
                  <a href="/">For Developers</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="cont-8-containeriv">
            <div className="cont8">
              <h3>Products</h3>
              <ul>
                <li>
                  <a href="/">Link Management</a>
                </li>
                <li>
                  <a href="/">QR Codes</a>
                </li>
                <li>
                  <a href="/">Link-in-bio</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="cont-8-containerv">
            <div className="cont8">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="/">About Scissor</a>
                </li>
                <li>
                  <a href="/">careers</a>
                </li>
                <li>
                  <a href="/">Partners</a>
                </li>
                <li>
                  <a href="/">Press</a>
                </li>
                <li>
                  <a href="/">Contact</a>
                </li>
                <li>
                  <a href="/">Previews</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="foot2">
          <div className="cont-8-containervi">
            <div className="cont8">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/">Resources Library</a>
                </li>
                <li>
                  <a href="/">Developers</a>
                </li>
                <li>
                  <a href="/">App Connections</a>
                </li>
                <li>
                  <a href="/">Support</a>
                </li>
                <li>
                  <a href="/">Trust Center</a>
                </li>
                <li>
                  <a href="/">Browser Extension</a>
                </li>
                <li>
                  <a href="/">Mobile App</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="cont-8-containervii">
            <div className="cont8">
              <h3>Features</h3>
              <ul>
                <li>
                  <a href="/">Branded Links</a>
                </li>
                <li>
                  <a href="/">Mobile Links</a>
                </li>
                <li>
                  <a href="/">Campaign</a>
                </li>
                <li>
                  <a href="/">Management &</a>
                </li>
                <li>
                  <a href="/">Analytics</a>
                </li>
                <li>
                  <a href="/">QR Code generation</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="cont-8-containerviii">
            <div className="cont8">
              <h3>Legal</h3>
              <ul>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Cookie Policy</a>
                </li>
                <li>
                  <a href="/">Terms of Service</a>
                </li>
                <li>
                  <a href="/">Acceptable Use Policy</a>
                </li>
                <li>
                  <a href="/">Code of Conduct</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="end">
          <a href="/">Term of Service</a> |<a href="/"> Security</a> |
          <a href="/"> Scissor 2023</a>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
