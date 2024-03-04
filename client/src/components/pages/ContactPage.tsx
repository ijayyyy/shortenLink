import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import "./ContactPage.css";

function Contact() {
  return (
    <div>
      <Header />
      <div className="section0">
        <h2 className="h2">Let's get in touch</h2>
        <div className="cont">
          <form action="thank-you.html">
            <span>first Name*</span> <span id="span1">Last Name*</span>
            <div className="form-group fullname" id="fnm">
              <label htmlFor="fullname"></label>
              <input type="text" id="fullname" className="fname" />
              <label htmlFor="fullname"></label>
              <input type="text" id="fullname" className="lname" />
            </div>
            <div className="form-group email">
              <label htmlFor="email">Company Name*</label>
              <input type="text" id="email" />
            </div>
            <div className="form-group email">
              <label htmlFor="email">Business Email Address*</label>
              <input type="text" id="email" />
            </div>
            <div className="form-group password">
              <label htmlFor="password">Phone Number*</label>
              <input type="tel" id="password" />
              <i id="pass-toggle-btn" className="fa-solid fa-eye"></i>
            </div>
            <div className="form-group gender">
              <label htmlFor="gender">Job Title</label>
              <select id="gender">
                <option value="" selected disabled>
                  Please Select
                </option>
                <option value="Male">select</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group gender">
              <label htmlFor="gender">Gender</label>
              <select id="gender">
                <option value="" selected disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group gender">
              <label htmlFor="gender">Gender</label>
              <select id="gender">
                <option value="" selected disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group gender">
              <label htmlFor="gender">Gender</label>
              <select id="gender">
                <option value="" selected disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="para">
              <p>
                Scissor requires the contact information you provide in order to
                reach out to you regarding our products and services. You have
                the option to unsubscribe from these communications whenever you
                wish. To learn more about how to unsunscribe, our privacy
                practices, and our dedication to safeguarding your privacy.
                please refer to our privacy policy
              </p>
            </div>
            <div className="form-group submit-btn">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
