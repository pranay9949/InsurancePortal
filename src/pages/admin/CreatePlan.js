import { useState } from "react";
import axios from "axios";
import "./createplan.css";

const CreatePlan = () => {
  const [planName, setPlanName] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [planEndDate, setPlanEndDate] = useState("");
  const [planCategoryId, setPlanCategoryId] = useState("");
  const [planStatus, setPlanStatus] = useState("ACTIVE");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    planName,
    planStartDate,
    planEndDate,
    planCategoryId: parseInt(planCategoryId),
    planStatus,
  };

  try {
    await axios.post("http://localhost:7000/api/plan/addPlan", payload);
    setMessage("✅ Plan Created Successfully!");
    setPlanName("");
    setPlanStartDate("");
    setPlanEndDate("");
    setPlanCategoryId("");
    setPlanStatus("ACTIVE");
  } catch (error) {
    const errorMsg =
      error.response?.data?.Mesaage || "❌ Failed to create plan.";
    setMessage(errorMsg);
    console.error(error);
  }
};


  return (
    <div className="admin-container">
      <h2>Create New Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={planStartDate}
          onChange={(e) => setPlanStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={planEndDate}
          onChange={(e) => setPlanEndDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Plan Category ID"
          value={planCategoryId}
          onChange={(e) => setPlanCategoryId(e.target.value)}
          required
        />
        <select
          value={planStatus}
          onChange={(e) => setPlanStatus(e.target.value)}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <button type="submit">Create Plan</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePlan;
