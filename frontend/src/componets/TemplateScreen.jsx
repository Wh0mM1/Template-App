import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const TemplateScreen = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [cols, setCols] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/template/${location.state.companyName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch(`http://localhost:8080/orgs/${location.state.companyName}`)
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
      style={{ padding: 20, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <h2 style={{ color: "#007BFF", marginBottom: 20 }}>Template Screen</h2>
        <h2 style={{ color: "#007BFF", marginBottom: 20 }}>
          {location.state.companyName}
        </h2>
        <button
          style={{
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            height: 35,
          }}
          onClick={() => {
            navigate("/add-user", {
              state: { companyName: location.state.companyName },
            });
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
        }}
      >
        {cols.map((col, j) => (
          <div
            key={j}
            style={{
              width: "10%",
              marginLeft: 10,
              paddingLeft: 10,
              textAlign: "center",
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {users.map((user, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: i % 2 === 0 ? "#e9ecef" : "#FFF",
            padding: "10px 0",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          {cols.map((col, j) => (
            <div
              key={j}
              style={{
                marginLeft: 10,
                paddingLeft: 10,
                width: "10%",
                textAlign: "center",
                color: "#333",
              }}
            >
              {user[col]}
            </div>
          ))}
        </div>
      ))}
      <button
        style={{
          marginTop: 30,
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          padding: "10px 20px 10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          window.location.href = `http://localhost:8080/template/export/${location.state.companyName}`;
        }}
      >
        Download
      </button>
    </div>
  );
};
