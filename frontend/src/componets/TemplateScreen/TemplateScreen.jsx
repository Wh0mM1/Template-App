import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TemplateScreen.css";

export const TemplateScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cols, setCols] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch(
      `http://localhost:8080/template/upload-csv/${location.state.companyName}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then(() => {
        alert("File uploaded successfully.");
        fetchUsers(); // Refresh users list after successful upload
      })
      .catch((error) => {
        console.error("Error uploading file:", error.message);
        alert(`Failed to upload file: ${error.message}`);
      });
  };

  // Fetch user data
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/template/${location.state.companyName}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }, [location.state.companyName]);

  // Fetch column data
  const fetchCols = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/orgs/${location.state.companyName}`
      );
      const data = await response.json();
      setCols(data.fields);
    } catch (error) {
      console.error("Error fetching columns:", error.message);
    }
  }, [location.state.companyName]);

  // Handle user deletion
  const deleteUser = async ({ fieldName, fieldValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/template/${location.state.companyName}/${fieldName}/${fieldValue}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        fetchUsers(); // Refresh users list after successful deletion
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // Fetch users and columns on component mount
  useEffect(() => {
    fetchUsers();
    fetchCols();
  }, [fetchUsers, fetchCols]);

  return (
    <div className="template-screen">
      <header className="header">
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
      </header>

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
              onClick={() => {
                const isConfirmed = window.confirm(
                  `Are you sure you want to delete ${user[cols[0]]}?`
                );

                if (isConfirmed) {
                  deleteUser({ fieldName: cols[0], fieldValue: user[cols[0]] });
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          className="download-button"
          onClick={() =>
            (window.location.href = `http://localhost:8080/template/export/${location.state.companyName}`)
          }
        >
          Download
        </button>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input"
        />
        <button className="upload-button" onClick={handleFileUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};
