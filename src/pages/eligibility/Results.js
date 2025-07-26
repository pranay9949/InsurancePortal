import { useState } from "react";
import axios from "axios";
import "./results.css";

const Results = () => {
  const [caseNumInput, setCaseNumInput] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const getAllResults = async () => {
    try {
      const res = await axios.get("http://localhost:7005/api/eligibility/getAllbenefits");
      setResults(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch all records.");
      setResults([]);
    }
  };

  const getByCaseNumber = async () => {
    if (!caseNumInput.trim()) {
      setMessage("Please enter a case number.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:7005/api/eligibility/get/${caseNumInput}`);
      setResults([res.data]);
      setMessage("");
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.["Error Message"] || "Error fetching case details.";
      setMessage(errMsg);
      setResults([]);
    }
  };

  return (
    <div className="eligibility-results-container">
      <h2>Eligibility Results</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="Enter Case Number"
          value={caseNumInput}
          onChange={(e) => setCaseNumInput(e.target.value)}
        />
        <button onClick={getByCaseNumber}>Get by Case Number</button>
        <button onClick={getAllResults}>Get All Records</button>
      </div>

      {message && <div className="error-message">{message}</div>}

      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Case #</th>
              <th>Holder Name</th>
              <th>SSN</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Benefit</th>
              <th>Denial Reason</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, idx) => (
              <tr key={idx}>
                <td>{res.caseNumber}</td>
                <td>{res.holderName}</td>
                <td>{res.holderSsn}</td>
                <td>{res.planName}</td>
                <td>{res.planStatus}</td>
                <td>{res.planStartDate || "-"}</td>
                <td>{res.planEndDate || "-"}</td>
                <td>{res.benefitAmount != null ? `₹${res.benefitAmount}` : "-"}</td>
                <td>{res.denialReason || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
