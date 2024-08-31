import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TemplateScreen.css";

export const TemplateScreen = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [cols, setCols] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/template/${location.state.companyName}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  }, [location.state.companyName]);

  const fetchCols = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/orgs/${location.state.companyName}`
      );
      const data = await response.json();
      setCols(data.fields);
    } catch (err) {
      console.error("Error fetching columns:", err.message);
    }
  }, [location.state.companyName]);

  const deleteUser = async ({ fieldName, fieldValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/template/${location.state.companyName}/${fieldName}/${fieldValue}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        await fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCols();
  }, [fetchUsers, fetchCols]);

  return (
    <div className="template-screen">
      <div className="header">
        <h2 className="title">Template Screen</h2>
        <h2 className="company-name">{location.state.companyName}</h2>
        <button
          className="add-button"
          onClick={() =>
            navigate("/add-user", {
              state: { companyName: location.state.companyName },
            })
          }
        >
          Add
        </button>
      </div>

      <div
        className="column-headers"
        style={{ borderBottom: "2px solid #007BFF" }}
      >
        {cols.map((col, index) => (
          <div key={index} className="column-header">
            {col}
          </div>
        ))}
        <div>Delete</div>
      </div>

      <div className="users-list">
        {users.map((user, i) => (
          <div key={i} className={`user-row ${i % 2 === 0 ? "even" : "odd"}`}>
            {cols.map((col, j) => (
              <div key={j} className="user-data">
                {user[col]}
              </div>
            ))}
            <button
              className="delete-button"
              onClick={() =>
                deleteUser({ fieldName: cols[0], fieldValue: user[cols[0]] })
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        className="download-button"
        onClick={() =>
          (window.location.href = `http://localhost:8080/template/export/${location.state.companyName}`)
        }
      >
        Download
      </button>
    </div>
  );
};
