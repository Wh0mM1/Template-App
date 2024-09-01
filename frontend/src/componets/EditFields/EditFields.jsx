import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditFields.css"; // Import the CSS file

export const EditFields = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("Predefined Value");

  useEffect(() => {
    fetch(`http://localhost:8080/orgs/${location.state.companyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInputValue(data.fields);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [location.state.companyName]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Editing fields of company</h2>
        <div className="company-name">
          <label>Company Name: </label>
          {location.state.companyName}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <button
            className="submit-button"
            onClick={async () => {
              console.log(inputValue);
              await fetch(
                `http://localhost:8080/orgs/${location.state.companyName}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(inputValue),
                }
              );
              navigate("/");
            }}
          >
            Edit Fields
          </button>
        </div>
      </div>
    </div>
  );
};
