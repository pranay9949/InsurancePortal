import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CaseContext } from "../../context/CaseContext";
import "./summary.css";

const Summary = () => {
  const { caseNumber } = useContext(CaseContext);
  const [summary, setSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!caseNumber) {
      setErrorMessage("No case number found in context.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:7004/api/summary/get/${caseNumber}`)
      .then((res) => {
        console.log(res.data); // ✅ Debug check
        setSummary(res.data);
        setErrorMessage("");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to load summary. Please try again.");
        setLoading(false);
      });
  }, [caseNumber]);

  if (loading) {
    return <div className="summary-container">Loading summary...</div>;
  }

  if (errorMessage) {
    return <div className="summary-container error-box">{errorMessage}</div>;
  }

  return (
    <div className="summary-container">
      <h2>Case Summary</h2>
      <div className="case-number">
        ✅ Case Number: <strong>{caseNumber}</strong>
      </div>

      <div className="summary-section">
        <h3>Plan Details</h3>
        {summary.planRequest?.planName ? (
          <p>Selected Plan: <strong>{summary.planRequest.planName}</strong></p>
        ) : (
          <p>No plan selected.</p>
        )}
      </div>

      <div className="summary-section">
        <h3>Income Details</h3>
        {summary.incomeRequest ? (
          <>
            <p>Monthly Income: ₹ {summary.incomeRequest.monthlyIncome}</p>
            <p>Rental Income: ₹ {summary.incomeRequest.rentalIncome}</p>
            <p>Property Income: ₹ {summary.incomeRequest.propertyIncome}</p>
          </>
        ) : (
          <p>No income details provided.</p>
        )}
      </div>

      <div className="summary-section">
        <h3>Education Details</h3>
        {summary.educationRequest ? (
          <>
            <p>Highest Degree: {summary.educationRequest.highestDegree}</p>
            <p>Graduation Year: {summary.educationRequest.graduationYear}</p>
            <p>University: {summary.educationRequest.universityName}</p>
          </>
        ) : (
          <p>No education details provided.</p>
        )}
      </div>

      <div className="summary-section">
        <h3>Children Details</h3>
        {summary.childrenRequestWrapper?.childrenRequests &&
        summary.childrenRequestWrapper.childrenRequests.length > 0 ? (
          summary.childrenRequestWrapper.childrenRequests.map((child, idx) => (
            <div key={idx} className="child-item">
              <p>Child Name: {child.childName}</p>
              <p>Age: {child.childAge}</p>
              <p>SSN: {child.childSsn}</p>
            </div>
          ))
        ) : (
          <p>No children details provided.</p>
        )}
      </div>
    </div>
  );
};

export default Summary;
