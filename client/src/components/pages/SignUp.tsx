import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../Services/authServices";
import Footer from "../Footer";
import "./SignUpandLogIn.css";
import TextInput from "../TextInput";

import Pathapple from "../../images/Pathapple.png";
import google from "../../images/google.png";
import vectorA from "../../images/VectorA.png";

function SignUp() {
  const [signupPayload, setSignupPayload] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div>
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>
              <h5>Sign up with:</h5>
              <div className="bttn">
                <a href="/" className="btti">
                  <img src={google} alt="" />
                  Google
                </a>
                <a href="/" className="bttii">
                  <img src={Pathapple} alt="" />
                  Apple
                </a>
              </div>
              <h4>
                {" "}
                <span className="span1">Or</span>{" "}
              </h4>
            </header>

            <div className="field input-field">
              <TextInput
                label="Full name"
                value={signupPayload.fullName}
                onChange={(val) =>
                  setSignupPayload({
                    ...signupPayload,
                    fullName: val.toLocaleString(),
                  })
                }
                placeholder="Username"
                className="input"
              />
            </div>

            <div className="field input-field">
              <TextInput
                label="Email"
                value={signupPayload.email}
                className="input"
                onChange={(val) =>
                  setSignupPayload({
                    ...signupPayload,
                    email: val.toLocaleString(),
                  })
                }
                placeholder="Email"
              />
            </div>

            <div className="field input-field">
              <TextInput
                label="Password"
                value={signupPayload.password}
                onChange={(val) =>
                  setSignupPayload({
                    ...signupPayload,
                    password: val.toLocaleString(),
                  })
                }
                placeholder="password"
                type="password"
                className="password"
              />
              <img src={vectorA} alt="" className="img1" />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Retype password"
                className="password"
              />
              <img src={vectorA} alt="" className="img1" />
            </div>

            <div className="form-link2">
              <a href="/" className="forgot-pass">
                6 or more characters, one number, one uppercase & one lower
                case.
              </a>
            </div>

            <div className="field button-field">
              <button
                onClick={() => {
                  signup(signupPayload, navigate);
                }}
              >
                Sign up
              </button>
            </div>

            <div className="form-link">
              <span>
                Already have an account?
                <Link to="/LogIn" className="link signup-link">
                  Log In
                </Link>
              </span>
            </div>

            <p>
              By signing in with an account, You agree to Scissor's{" "}
              <b>Terms of service, privacy policy</b> and{" "}
              <b>Acceptable Use Policy.</b>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default SignUp;
