import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EditFileds = () => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "#FFF",
          borderRadius: "8px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#007BFF" }}>
          Editing fields of company
        </h2>
        <div style={{ marginBottom: "15px", color: "#333" }}>
          <label style={{ fontWeight: "bold" }}>Company Name: </label>
          {location.state.companyName}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
          />
        </div>
        <div>
          <button
            style={{
              marginTop: 10,
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
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
