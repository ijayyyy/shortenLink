import React from "react";

import "../App.css";
import EllipseB from "../images/EllipseB.png";
import Line70 from "../images/Line70.png";
import linkB2 from "../images/linkB2.png";
import edit from "../images/edit.png";
import grid from "../images/grid.png";
import activity from "../images/activity.png";

function About({ id }: { id: string }) {
  return (
    <section className="section3" id="About">
      <div className="cont3">
        <div className="text02">
          <h1 className="h2r">
            <img src={Line70} alt="" id="img6" />
            <span className="h1e">Why Choose</span>{" "}
            <span id="posc"> Scissors</span>
          </h1>
          <p className="h2p">
            Scissors is the hub of everything that has to do with your link
            management. We shorten your URLs, Allow you create custom ones for
            your personal, business, event usage. Our swift QR code creation,
            management and usage tracking with advance analytics for all of
            these is second to none.
          </p>
        </div>
        <div className="cards1">
          <div className="card2-container">
            <div className="card2-containerii">
              <div className="card2">
                <img src={EllipseB} alt="" className="img7" />
                <img src={linkB2} alt="" className="link2" />
                <h2 className="h2r">URL Shortening</h2>
                <p className="h2p">
                  Scissor allows you to shorten URLs of your business, events,
                  Shorten your URL, at scale, URL redirects.
                </p>
              </div>

              <div className="card2">
                <img src={EllipseB} alt="" className="img7" />
                <img src={edit} alt="" className="link2" />
                <h2 className="h2r">Custom URLs</h2>
                <p className="h2p">
                  With Scissor, you can create custom URLs,with the length you
                  want! Asolution for socials and businesses
                </p>
              </div>
            </div>

            <div className="card2-containeriii">
              <div className="card2">
                <img src={EllipseB} alt="" className="img7" />
                <img src={grid} alt="" className="link2" />
                <h2 className="h2r">QR Codes</h2>
                <p className="h2p">
                  Genenrate QR codes to your business, events, Bring your
                  audience and customers to your doorstep with this scan and go
                  solution
                </p>
              </div>

              <div className="card2">
                <img src={EllipseB} alt="" className="img7" />
                <img src={activity} alt="" className="link2" />
                <h2 className="h2r">Data Analytics</h2>
                <p className="h2p">
                  Recieve data on the usage of either your shortened URL, custom
                  URLs or generated QR codes, Embedded to monitor progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
