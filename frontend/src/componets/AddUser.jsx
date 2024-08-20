import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
          paddingRight: "30px", // Horizontal padding on the right
          backgroundColor: "#FFF",
          borderRadius: "8px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          width: "80%", // Optional: Set a width to ensure consistency in layout
          maxWidth: "600px", // Optional: Limit the maximum width
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#007BFF" }}>
          Adding User To Company
        </h2>
        {cols.map((col, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <div style={{ marginBottom: "5px", color: "#333" }}>
              <label style={{ fontWeight: "bold" }}>{col}:</label>
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => {
                  data[col] = e.target.value;
                }}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                }}
              />
            </div>
          </div>
        ))}
        <br />
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
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
