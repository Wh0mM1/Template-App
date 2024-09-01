import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./AddUser.css"; // Import the CSS file

export const AddUser = () => {
  const navigate = useNavigate();
  const [cols, setCols] = useState([]);
  let data = {};
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/orgs/" + location.state.companyName)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCols(data.fields);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [location.state.companyName]);

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Adding User To Company</h2>
        {cols.map((col, i) => (
          <div key={i} className="form-group">
            <div className="form-label">
              <label>{col}:</label>
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                onChange={(e) => {
                  data[col] = e.target.value;
                }}
              />
            </div>
          </div>
        ))}
        <br />
        <button
          className="submit-button"
          onClick={async () => {
            console.log(data);
            await fetch(
              "http://localhost:8080/template/" + location.state.companyName,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            console.log(`Added user to ${location.state.companyName}`);
            navigate("/template-screen", {
              state: { companyName: location.state.companyName },
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
