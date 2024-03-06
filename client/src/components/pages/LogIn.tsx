import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Services/authServices";
import TextInput from "../TextInput";
import Footer from "../Footer";
import google from "../../images/google.png";
import Pathapple from "../../images/Pathapple.png";
import vectorA from "../../images/VectorA.png";
import "./SignUpandLogIn.css";

function LogIn() {
  const [loginPayload, setLoginPayload] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <section>
      <div className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header className="sign-in">
              <h5>Log in with:</h5>
             
              <div className="btti">
                <a href="/" className="bttii">
                  <img src={google} alt="google" className="login-image" />
                  Google
                </a>
                <a href="/" className="bttiii">
                  <img src={Pathapple} alt="path apple" className="login-image" />
                  Apple
                </a> 
              </div>
             
              <div className="or-span">
             <h4> 
              {" "}
                <span className="span1">Or</span>{" "}
              </h4>
              </div>
            
            </header>

            <div className="field-container"> 
              <div className="field input-field">
              <TextInput
                value={loginPayload.email}
                onChange={(val) =>
                  setLoginPayload({
                    ...loginPayload,
                    email: val.toLocaleString(),
                  })
                }
                placeholder="Email address or username"
                className="input"
              />
            </div>
           
        
            <div className="field input-field">
              <TextInput
                value={loginPayload.password}
                onChange={(val) =>
                  setLoginPayload({
                    ...loginPayload,
                    password: val.toLocaleString(),
                  })
                }
                type="password"
                placeholder="password"
                className="password"
              />
              <img src={vectorA} alt="" className="img1" />
            </div>

            <div className="form-link1">
              <a href="/" className="forgot-pass">
                Forgot your password?
              </a>
            </div>

            <div className="field button-field">
              <button onClick={() => login(loginPayload, navigate)}>
                Log in
              </button>
            </div>

            <div className="form-link">
              <span>
                Don't have an account?{" "}
                <Link to="/SignUp" className="link signup-link">
                  Sign Up
                </Link>
              </span>
            </div>

            <p className="toss">
              <p className="tos">By signing in with an account, You agree to </p>{" "}
              <b className="tosss">Scissor's Terms of service, privacy policy and Acceptable Use Policy.</b>{" "}
            </p>
            </div>     
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default LogIn;
