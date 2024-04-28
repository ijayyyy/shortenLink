import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

import vectorC from "../images/VectorC.png";
import VectorB from "../images/VectorB.png";
import linkB from "../images/linkB.png";
import lineG from "../images/LineG.png";
import RectangleMirror from "../images/RectangleMirror.png";
import EllipseA from "../images/EllipseA.png";

function Main({ id }: { id: string }) {
  return (
    <section>
      <div className="main">
        <h1>
          Optimize Your Online Experience With Our
          <br /> Advanced <span className="check">URL Shortening </span>
          Solution
        </h1>
        <img src={vectorC} className="img2" alt="" />
        <p>
          Personalise your shortened URLs to align with your brand Identity.
          Utilise customs slugs,
          <br /> Branded links and domain customization options to reinforce
          your brand presence and
          <br /> enhance user engagement.
        </p>
        <div className="btns2">
          <Link to="/SignUp" className="btns2i">
            Sign Up
          </Link>
          <Link to="/Contact" className="btns2ii">
            Learn More
          </Link>
        </div>

        <div className="mains3">
          <div className="left">
            <img src={VectorB} alt="k" className="img3" />
          </div>

          <div className="box1">
            <div className="content">
              <div className="img4">
                <img src={linkB} alt="" className="red" />
                <img src={linkB} alt="" className="red" />
                <img src={linkB} alt="" className="red" />
                <span className="linee">
                  {" "}
                  <img src={lineG} id="line" className="red" alt="" />
                </span>
                <img src={linkB} alt="" className="red" />
              </div>
              <p>
                Seamlessly transform your long URLs into concise and shareable
                links with just few clicks.
              </p>
            </div>
          </div>
        </div>

        <div className="mains4">
          <div className="img5">
           
            <img src={EllipseA} alt="" className="mirror" />
            <img src={RectangleMirror} alt="" className="rect" />
          </div>
        </div>
      </div>

      <div className="section2" id="Main">
        <div className="cont2">
          <div className="text01">
            <h2>
              One Stop.
              <br />
              Four<span id="posc"> Possibilities.</span>{" "}
            </h2>
          </div>
          <div className="card">
           
            <div className="card1">
              <h2>3M</h2>
              <p>Active Users</p>
            </div>
            <div className="card1">
              <h2>60M</h2>
              <p>Links and QR codes created</p>
            </div>
            
            <div className="card1">
              <h2>1B</h2>
              <p>Clicked and Scanned connections</p>
            </div>
            <div className="card-1">
              <h2>300K</h2>
              <p>App integrations</p>
            </div> 
           
           </div>
          </div>
        </div>
   
    </section>
  );
}

export default Main;
