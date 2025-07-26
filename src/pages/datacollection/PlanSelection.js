import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CaseContext } from "../../context/CaseContext";
import "./planselection.css"; // You can style this
import { Navigate, useNavigate } from "react-router-dom";

const PlanSelection = () => {
  const { caseNumber } = useContext(CaseContext);
  const [plans, setPlans] = useState({});
  const [selectedPlan, setSelectedPlan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch available plans on load
  useEffect(() => {
    axios
      .get("http://localhost:7004/api/plan/allplans")
      .then((res) => {
        setPlans(res.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to fetch plans.");
      });
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedPlan) {
    setErrorMessage("Please select a plan.");
    return;
  }

  try {
    const payload = {
      planName: selectedPlan,
      caseNumber: caseNumber,
    };
    const res = await axios.post(
      "http://localhost:7004/api/plan/addplan",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    setSuccessMessage("Plan added successfully!");
    setErrorMessage("");
    navigate("/income-details")
  } catch (error) {
    console.error(error);
    let message = "Something went wrong.";
    if (error.response && error.response.data) {
      if (error.response.data["Error Message"]) {
        message = error.response.data["Error Message"];
      } else if (error.response.data.message) {
        message = error.response.data.message;
      }
    }
    setErrorMessage(message);
    setSuccessMessage("");
  }
};

  return (
    <div className="plan-selection-container">
      <h2>Plan Selection</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Case Number</label>
          <input
            type="text"
            value={caseNumber || ""}
            disabled
            className="disabled-input"
          />
        </div>

        <div className="form-group">
          <label>Select a Plan</label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            required
          >
            <option value="">-- Select Plan --</option>
            {Object.entries(plans).map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Plan</button>
      </form>

      {errorMessage && <div className="error-box">{errorMessage}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}
    </div>
  );
};

export default PlanSelection;
