import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import TextInput from "./TextInput";
import urlStore from "../store/urlStore";
import magicwand from "../images/magicwand.png";

const { newUrlPayload } = urlStore;

const DummyDash = () => {
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);

  const handleTrimUrl = async () => {
    await urlStore.createNewUrl();
    setShowTable(true);
    navigate("/Dashboard"); // Navigate to the dashboard page after adding the URL
  };

  return (
    <section className="section5">
      <div className="cont5">
        {!showTable ? (
          <form action="#">
            <TextInput
              placeholder="Paste URL here..."
              onChange={(val) =>
                (newUrlPayload.originalLink = val.toLocaleString())
              }
              value={newUrlPayload.originalLink}
              className="url"
            />
            <br />
            <div className="int">
              <select id="dos" className="dos">
                <option value="dos">Choose Domain</option>
                <option value="dos">domain</option>
                <option value="dos">domain</option>
                <option value="dos">domain</option>
              </select>
              <TextInput
                placeholder="Type Alias here"
                className="alias"
                onChange={(val) =>
                  (newUrlPayload.customUrlCode = val.toLocaleString())
                }
                value={newUrlPayload.customUrlCode || ""}
              />
            </div>
            <button type="button" onClick={handleTrimUrl}>
              Trim URL <img src={magicwand} alt="" />
            </button>
            <p>
              By clicking Trim URL, I agree to the{" "}
              <b>Terms of Service, Privacy policy</b> and Use of cookies
            </p>
          </form>
        ) : (
          <p>
            URL added successfully. You will be redirected to the dashboard
            shortly.
          </p>
        )}
      </div>
    </section>
  );
};

export default DummyDash;
