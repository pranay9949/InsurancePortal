import { useState, useContext } from "react";
import axios from "axios";
import { CaseContext } from "../../context/CaseContext";
import "./eligibilitycheck.css";

const EligibilityCheck = () => {
  const { caseNumber, setCaseNumber } = useContext(CaseContext);
  const [eligibilityData, setEligibilityData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheck = async () => {
    if (!caseNumber) {
      setErrorMessage("Please enter a Case Number.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:7005/api/eligibility/save/${caseNumber}`);
      setEligibilityData(res.data);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      if (err.response?.data["Error Message"]) {
        setErrorMessage(err.response.data["Error Message"]);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      setEligibilityData(null);
    }
  };

  return (
    <div className="eligibility-container">
      <h2>Eligibility Determination</h2>

      <div className="form-group">
        <label>Case Number</label>
        <input
          type="number"
          value={caseNumber || ""}
          onChange={(e) => setCaseNumber(e.target.value)}
          placeholder="Enter Case Number"
        />
        <button onClick={handleCheck}>Check Eligibility</button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {eligibilityData && (
        <div className="result-card">
          <h3>Eligibility Result</h3>
          <p><strong>Name:</strong> {eligibilityData.holderName}</p>
          <p><strong>SSN:</strong> {eligibilityData.holderSsn}</p>
          <p><strong>Plan:</strong> {eligibilityData.planName}</p>
          <p><strong>Status:</strong> {eligibilityData.planStatus}</p>
          {eligibilityData.planStatus === "DENIED" && (
            <p className="denial"> Reason: {eligibilityData.denialReason}</p>
          )}
          {eligibilityData.planStatus === "APPROVED" && (
            <>
              <p><strong>Start Date:</strong> {eligibilityData.planStartDate}</p>
              <p><strong>End Date:</strong> {eligibilityData.planEndDate}</p>
              <p><strong>Benefit:</strong> ₹{eligibilityData.benefitAmount}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;
