import React from "react";

import "../App.css";
import Line70 from "../images/Line70.png";
import checkCircle from "../images/checkCircle.png";
import checkcircleA from "../images/checkcircleA.png";

function Prices({ id }: { id: string }) {
  return (
    <section className="section4" id="Prices">
      <div className="cont4">
        <div className="text03">
          <h1>
            <img src={Line70} alt="" id="img8" />
            <span className="h2e">A </span>
            <span id="posc"> price perfect</span> for your needs.
          </h1>

          <p>
            From catering for your personal, business, event, socials needs, you
            can be rest assured we have you in mind in our pricing.
          </p>
        </div>

        <div className="cards4">
          <div className="card4">
            <h4>Basic</h4>
            <h2>Free</h2>
            <h5>Free plan for all users</h5>
            <p>
              <img src={checkCircle} alt="" />
              Unlimited URL Shortening
            </p>
            <p>
              <img src={checkCircle} alt="" />
              Basic Link Analytics
            </p>
            <p>
              <img src={checkCircle} alt="" />
              Customizable Short Links
            </p>
            <p>
              <img src={checkCircle} alt="" />
              Standard Support
            </p>
            <p>
              <img src={checkCircle} alt="" />
              Ad-Supported
            </p>
          </div>

          <div className="card5">
            <h4>Professional</h4>
            <h2>$15/month</h2>
            <h5>Ideal for business creators</h5>
            <p>
              <img src={checkcircleA} alt="" />
              Enhanced Link Analytics
            </p>
            <p>
              <img src={checkcircleA} alt="" />
              Custom Branded Domains
            </p>
            <p>
              <img src={checkcircleA} alt="" />
              Advanced Link Customisation
            </p>
            <p>
              <img src={checkcircleA} alt="" />
              Priority Support
            </p>
            <p>
              <img src={checkcircleA} alt="" />
              Ad-free Experience
            </p>
          </div>

          <div className="card4">
            <h4>Teams</h4>
            <h2>$25/month</h2>
            <h5>Share with up to 10 users</h5>
            <p>
              <img src={checkCircle} alt="" />
              Team Collaboration
            </p>
            <p>
              <img src={checkCircle} alt="" />
              User Roles and permission
            </p>
            <p>
              <img src={checkCircle} alt="" />
              Enhanced Security
            </p>
            <p>
              <img src={checkCircle} alt="" />
              API Access
            </p>
            <p>
              <img src={checkCircle} alt="" />
              Dedicated Account Manager
            </p>
          </div>
        </div>

        <div className="bttn4">
          <a href="/" className="btnn4i">
            Get Custom Pricing
          </a>
          <a href="/" className="btnn4ii">
            Select Pricing
          </a>
        </div>
      </div>
    </section>
  );
}

export default Prices;
