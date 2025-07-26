import { useState } from "react";
import axios from "axios";
import "./createcaseworker.css";

const CreateCaseWorker = () => {
  const [formData, setFormData] = useState({
    caseWorkerName: "",
    caseWorkerEmailId: "",
    caseWorkerMobileNumber: "",
    caseWorkerGender: "M",
    caseWorkerDateOfBirth: "",
    ssn: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(null);

    try {
      const res = await axios.post(
        "http://localhost:7000/api/worker/register",
        formData
      );
      const msg = res.data.message || "Registration successful!";
      setSuccess(true);
      setMessage(msg);
      setFormData({
        caseWorkerName: "",
        caseWorkerEmailId: "",
        caseWorkerMobileNumber: "",
        caseWorkerGender: "M",
        caseWorkerDateOfBirth: "",
        ssn: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.Mesaage || "Registration Failed. Try again.";
      setSuccess(false);
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-worker-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
          <p>Sending mail & registering...</p>
        </div>
      )}
      <h2>Create Case Worker</h2>
      <form onSubmit={handleSubmit} className="worker-form">
        <input
          type="text"
          name="caseWorkerName"
          value={formData.caseWorkerName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="caseWorkerEmailId"
          value={formData.caseWorkerEmailId}
          onChange={handleChange}
          placeholder="Email ID"
          required
        />
        <input
          type="tel"
          name="caseWorkerMobileNumber"
          value={formData.caseWorkerMobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          pattern="[0-9]{10}"
          required
        />
        <select
          name="caseWorkerGender"
          value={formData.caseWorkerGender}
          onChange={handleChange}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
        <input
          type="date"
          name="caseWorkerDateOfBirth"
          value={formData.caseWorkerDateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="ssn"
          value={formData.ssn}
          onChange={handleChange}
          placeholder="SSN"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Register Case Worker"}
        </button>
        {message && (
          <div
            className={`form-message ${success ? "success-msg" : "error-msg"}`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCaseWorker;
