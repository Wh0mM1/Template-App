import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddOrg = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [fields, setFields] = useState("");
  let data = {};

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
          Adding Company
        </h2>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#333", fontWeight: "bold" }}>
            Company Name:
          </label>
          <br />
          <input
            type="text"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#333", fontWeight: "bold" }}>
            Fields (Input fields separated by commas):
          </label>
          <br />
          <input
            type="text"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
            onChange={(e) => {
              setFields(e.target.value);
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
