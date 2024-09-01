import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddOrg.css"; // Import the CSS file

export const AddOrg = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [fields, setFields] = useState("");
  let data = {};

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Adding Company</h2>
        <div className="form-group">
          <label className="form-label">Company Name:</label>
          <br />
          <input
            type="text"
            className="form-input"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Fields (Input fields separated by commas):
          </label>
          <br />
          <input
            type="text"
            className="form-input"
            onChange={(e) => {
              setFields(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="submit-button"
            onClick={async () => {
              data.company = company;
              data.fields = fields.split(",");
              console.log(data);
              await fetch("http://localhost:8080/orgs", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              navigate("/");
              console.log("Added Org: " + company);
            }}
          >
            Add Organization
          </button>
        </div>
      </div>
    </div>
  );
};
