import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DefineFields.css";

export const DefineFields = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);

  const fetchOrgs = async () => {
    try {
      const response = await fetch("http://localhost:8080/orgs");
      const data = await response.json();
      setOrgs(data);
    } catch (error) {
      console.error("Error fetching organizations:", error.message);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const deleteOrg = async (companyName) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${companyName}?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/orgs/${companyName}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchOrgs();
        } else {
          console.error("Failed to delete org");
        }
      } catch (error) {
        console.error("Error deleting org:", error.message);
      }
    }
  };

  return (
    <div className="define-fields-container">
      <div className="header-container">
        <h2 className="header-title">Dashboard</h2>
        <button className="header-button" onClick={() => navigate("/add-org")}>
          Add
        </button>
      </div>

      <div className="org-list-header">
        <p className="org-list-item">Company</p>
        <p className="org-list-item">Fields</p>
        <p className="org-list-item">Details</p>
      </div>

      {orgs.map((org, i) => (
        <div
          key={org.company}
          className={`org-list-item-container ${i % 2 === 0 ? "even" : "odd"}`}
        >
          <div className="org-list-item">{org.company}</div>
          <div className="org-fields">
            {org.fields.map((field, j) => (
              <div key={j} className="org-field">
                {field}
              </div>
            ))}
          </div>
          <button
            className="edit-button"
            onClick={() =>
              navigate("/edit-fields", { state: { companyName: org.company } })
            }
          >
            Edit
          </button>
          <button
            className="view-button"
            onClick={() =>
              navigate("/template-screen", {
                state: { companyName: org.company },
              })
            }
          >
            View
          </button>
          <button className="del-button" onClick={() => deleteOrg(org.company)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
