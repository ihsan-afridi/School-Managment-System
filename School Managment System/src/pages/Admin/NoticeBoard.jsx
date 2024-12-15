import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { getNotices } from "./Services/notice";

const NoticeBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
  });

  const [editId, setEditId] = useState(null); // State to manage editing

  const handleAddNoticeClick = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  const handleEditClick = (notice) => {
    setFormData({
      id: notice.id,
      title: notice.title,
      description: notice.description,
      date: notice.date,
    });
    setEditId(notice.id);
    setShowForm(true);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // Editing existing notice
      const updatedNotices = notices.map((notice) =>
        notice.id === editId ? formData : notice
      );
      setNotices(updatedNotices);
      setEditId(null);
    } else {
      // Adding new notice
      setNotices([...notices, formData]);
    }
    // Reset form and hide additional fields
    setFormData({
      id: "",
      title: "",
      description: "",
      date: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  const yearOptions = [
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    // Add more options as needed
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const data = await getNotices(); // Fetch the notices using the function
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="container-fluid" style={{ overflowX: "hidden" }}>
      if (loading) return <p>Loading...</p>;
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9" style={{ width: "76%" }}>
          <div className="content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 style={{ color: "#000", flex: "1" }}>Notice Board</h1>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center" style={{ flex: "1" }}>
                <Select
                  options={yearOptions}
                  placeholder="Select Year"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "1px solid black",
                      minWidth: "150px",
                      marginRight: "10px",
                    }),
                  }}
                />
                <div className="input-group" style={{ width: "50%" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a notice by title or description"
                    aria-label="Search"
                    style={{
                      paddingLeft: "2.5rem",
                      border: "1px solid black",
                      borderRadius: "6px",
                    }}
                  />
                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "17px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "16px",
                      color: "#ccc",
                    }}
                  />
                </div>
              </div>
              <button
                onClick={handleAddNoticeClick}
                className="btn btn-primary mb-3"
                style={{
                  padding: "5px 20px",
                  height: "calc(1.5em + .75rem + 2px)",
                  marginTop: "0px",
                  position: "relative",
                  top: "9px",
                }}
              >
                <FaPlus /> Add Notice
              </button>
            </div>
            {showForm && (
              <div
                className="card"
                style={{
                  maxWidth: "800px",
                  margin: "auto",
                  border: "1px solid black",
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
              >
                <div className="card-header">
                  <h3 style={{ color: " black" }}>
                    {editId !== null ? "Edit Notice" : "Add Notice"}
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-4 mb-2">
                        <label
                          style={{
                            color: "black",
                            textAlign: "start",
                            display: "flex",
                            marginBottom: "5px",
                          }}
                        >
                          ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Notice ID"
                          aria-label="ID"
                          name="id"
                          value={formData.id}
                          onChange={(e) => handleChange("id", e.target.value)}
                          style={{ border: "1px solid black" }}
                          disabled={editId !== null} // Disable ID input during edit
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label
                          style={{
                            color: "black",
                            textAlign: "start",
                            display: "flex",
                            marginBottom: "5px",
                          }}
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Notice Title"
                          aria-label="Title"
                          name="title"
                          value={formData.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          style={{ border: "1px solid black" }}
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <label
                          style={{
                            color: "black",
                            textAlign: "start",
                            display: "flex",
                            marginBottom: "5px",
                          }}
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter Notice Date"
                          aria-label="Date"
                          name="date"
                          value={formData.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          style={{ border: "1px solid black" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12 mb-2">
                        <label
                          style={{
                            color: "black",
                            textAlign: "start",
                            display: "flex",
                            marginBottom: "5px",
                          }}
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter Notice Description"
                          aria-label="Description"
                          name="description"
                          value={formData.description}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                          style={{
                            border: "1px solid black",
                            minHeight: "100px", // Set minimum height
                            resize: "vertical", // Allow vertical resizing
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            marginTop: "20px",
                            float: "right",
                          }}
                        >
                          {editId !== null ? "Update Notice" : "Add Notice"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="class-list">
              <div
                className="card"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <div
                  className="card-body"
                  style={{ padding: "0", overflowX: "hidden" }}
                >
                  <table
                    className="table table-striped"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice, index) => (
                        <tr key={index}>
                          <td>{notice.id}</td>
                          <td>{notice.title}</td>
                          <td>{notice.description}</td>
                          <td>{notice.date}</td>
                          <td className="d-flex">
                            <button
                              className="btn btn-warning"
                              style={{ marginRight: "8px" }}
                              onClick={() => handleEditClick(notice)}
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(notice.id)}
                            >
                              <FaTrash /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
