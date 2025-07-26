import { useEffect, useState } from "react";
import axios from "axios";
import "./viewplan.css";

const ViewPlan = () => {
  const [plans, setPlans] = useState([]);
  const [editPlan, setEditPlan] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/plan/getallplans");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load plans.");
    }
  };

  const handleDelete = async (planId) => {
    try {
      await axios.delete(`http://localhost:7000/api/plan/delete/${planId}`);
      setMessage("Plan deleted successfully.");
      fetchPlans();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete plan.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPlan({ ...editPlan, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:7000/api/plan/update/${editPlan.planId}`, editPlan);
      setMessage("Plan updated successfully.");
      setEditPlan(null);
      fetchPlans();
    } catch (err) {
      const msg = err.response?.data?.Mesaage || "Failed to update plan.";
      setMessage(msg);
    }
  };

  return (
    <div className="view-plans-container">
      <h2>View Plans</h2>
      {message && <div className="status-message">{message}</div>}
      <table className="plans-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.planId}>
              <td>{plan.planId}</td>
              <td>
                {editPlan?.planId === plan.planId ? (
                  <input
                    name="planName"
                    value={editPlan.planName}
                    onChange={handleEditChange}
                  />
                ) : (
                  plan.planName
                )}
              </td>
              <td>
                {editPlan?.planId === plan.planId ? (
                  <input
                    type="date"
                    name="planStartDate"
                    value={editPlan.planStartDate}
                    onChange={handleEditChange}
                  />
                ) : (
                  plan.planStartDate
                )}
              </td>
              <td>
                {editPlan?.planId === plan.planId ? (
                  <input
                    type="date"
                    name="planEndDate"
                    value={editPlan.planEndDate}
                    onChange={handleEditChange}
                  />
                ) : (
                  plan.planEndDate
                )}
              </td>
              <td>
                {editPlan?.planId === plan.planId ? (
                  <select
                    name="planStatus"
                    value={editPlan.planStatus}
                    onChange={handleEditChange}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                ) : (
                  plan.planStatus
                )}
              </td>
              <td>
                {editPlan?.planId === plan.planId ? (
                  <input
                    type="number"
                    name="planCategoryId"
                    value={editPlan.planCategoryId}
                    onChange={handleEditChange}
                  />
                ) : (
                  plan.planCategoryId
                )}
              </td>
              <td>
                {editPlan?.planId === plan.planId ? (
                  <>
                    <button className="save-btn" onClick={handleUpdate}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={() => setEditPlan(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => setEditPlan({ ...plan })}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(plan.planId)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPlan;
