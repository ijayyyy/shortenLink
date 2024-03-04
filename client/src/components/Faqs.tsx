import React from "react";

import "../App.css";
import line70 from "../images/Line70.png";
import minus from "../images/minus.png";
import plus from "../images/plus.png";

function Faqs({ id }: { id: string }) {
  return (
    <div>
      <section className="section6" id="Faqs">
        <div className="cont6">
          <div className="text04">
            <h2>
              <img src={line70} alt="" className="img9" />{" "}
              <span className="h3e">FAQs</span>
            </h2>
          </div>
          <div className="cont65">
            <div className="text05">
              <h5>
                How does URL Shortening work?{" "}
                <img src={minus} alt="" className="img10" />
              </h5>
              <p>
                URL shortening works by taking a long URL and creating a shorter
                condensed version that redirects to the original URL. when a
                user click on the shortened link they are redirected to the
                intended destination.
              </p>
              <br />
              <h5>
                Is it necessary to create an account to use the URL Shortening
                Service? <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                Are the shortened links permanent ? Will they expire?{" "}
                <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                Are there any limitations to the number of URLs I can Shorten?{" "}
                <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                Can I Customize the shortened URLs to reflect my brand or
                contents? <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                Can I track the performance of my shortened URLs?{" "}
                <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                How secure is the URL shortening Service? Are the shortened
                links protected against spam or malicious activity?{" "}
                <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                What is QR code and what can it do?{" "}
                <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
              <h5>
                Is there an API available for integrating the URL shortening
                service into my own application or website?{" "}
                <img src={plus} alt="" className="img10" />
              </h5>
              <hr />
            </div>
          </div>
        </div>
      </section>

      <section className="section7">
        <div className="cont7">
          <h1>Revolutionizing Link Optimization</h1>
          <a href="#Prices">Get Started</a>
        </div>
      </section>
    </div>
  );
}

export default Faqs;
