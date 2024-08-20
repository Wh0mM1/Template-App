import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DefineFields = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/orgs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrgs(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div
      style={{ padding: 20, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <div></div>
        <button
          style={{
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/add-org");
          }}
        >
          Add
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 10,
          borderBottom: "2px solid #007BFF",
          color: "#333",
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        <p style={{ width: "7%" }}>Company</p>
        <p style={{ width: "10%" }}>Fields</p>
        <p style={{ width: "7%" }}>Details</p>
      </div>

      <div>
        {orgs.map((org, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: i % 2 === 0 ? "#e9ecef" : "#FFF",
                padding: "10px 0",
                borderBottom: "1px solid #dee2e6",
                alignItems: "center",
              }}
            >
              <div style={{ width: "7%", color: "#333" }}>{org.company}</div>
              <div style={{ display: "flex", width: "10%", color: "#333" }}>
                {org.fields.map((field, j) => {
                  return (
                    <div key={j} style={{ paddingRight: 10 }}>
                      {field}
                    </div>
                  );
                })}
              </div>
              <button
                style={{
                  marginRight: 10,
                  marginBottom: 10,
                  backgroundColor: "#007BFF",
                  color: "#FFF",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/edit-fields", {
                    state: { companyName: org.company },
                  });
                }}
              >
                Edit
              </button>
              <button
                style={{
                  marginRight: 10,
                  marginBottom: 10,
                  backgroundColor: "#28A745",
                  color: "#FFF",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/template-screen", {
                    state: { companyName: org.company },
                  });
                }}
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
