import { useEffect, useState } from "react";
import axios from "axios";
import "./viewcaseworker.css";

const ViewCaseWorker = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editWorker, setEditWorker] = useState(null);
  const [message, setMessage] = useState("");

  const fetchWorkers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/worker/getAll");
      setWorkers(res.data || []);
    } catch (err) {
      console.error("Error fetching workers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case worker?"))
      return;
    try {
      await axios.delete(`http://localhost:7000/api/worker/delete/${id}`);
      setMessage("Case Worker deleted successfully");
      fetchWorkers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (worker) => {
    setEditWorker(worker);
    setMessage("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditWorker((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:7000/api/worker/update/${editWorker.id}`,
        editWorker
      );
      setMessage("Case Worker updated successfully");
      setEditWorker(null);
      fetchWorkers();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="worker-view-container">
      <h2>Case Workers List</h2>
      {message && <div className="msg">{message}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="worker-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>SSN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.caseWorkerName}</td>
                  <td>{worker.caseWorkerEmailId}</td>
                  <td>{worker.caseWorkerMobileNumber}</td>
                  <td>{worker.caseWorkerGender}</td>
                  <td>{worker.caseWorkerDateOfBirth}</td>
                  <td>{worker.ssn}</td>
                  <td>
                    <button onClick={() => handleEdit(worker)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(worker.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editWorker && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Case Worker</h3>
            <input
              type="text"
              name="caseWorkerName"
              value={editWorker.caseWorkerName}
              onChange={handleEditChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="caseWorkerEmailId"
              value={editWorker.caseWorkerEmailId}
              onChange={handleEditChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="caseWorkerMobileNumber"
              value={editWorker.caseWorkerMobileNumber}
              onChange={handleEditChange}
              placeholder="Mobile"
            />
            <input
              type="text"
              name="caseWorkerGender"
              value={editWorker.caseWorkerGender}
              onChange={handleEditChange}
              placeholder="Gender"
            />
            <input
              type="date"
              name="caseWorkerDateOfBirth"
              value={editWorker.caseWorkerDateOfBirth}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="ssn"
              value={editWorker.ssn}
              onChange={handleEditChange}
              placeholder="SSN"
            />
            <div className="modal-actions">
              <button onClick={handleEditSubmit}>Update</button>
              <button onClick={() => setEditWorker(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCaseWorker;
