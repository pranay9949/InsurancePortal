

import { useState, useContext } from "react";
import axios from "axios";
import { CaseContext } from "../../context/CaseContext";
import "./createcase.css"; // You'll create this CSS
import { useNavigate } from "react-router-dom"; // ✅ add this


const CreateCase = () => {
  const { caseNumber, setCaseNumber } = useContext(CaseContext);
  const [appId, setAppId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleCheckApp = async () => {
    if (!appId.trim()) {
      setErrorMessage("Please enter Application ID.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:7004/api/data-collection/get/${appId}`);
      const returnedCaseNumber = res.data;
          console.log(res.data)
      if (returnedCaseNumber) {
        setCaseNumber(returnedCaseNumber);
        setErrorMessage("");
        alert(`Case Number: ${returnedCaseNumber} assigned!`);
         navigate("/plan-selection");
      } else {
        setErrorMessage("Application exists but no Case Number returned.");
      }
    } catch (error) {
      console.error(error);
      let msg = "Something went wrong.";
      if (error.response && error.response.data) {
        if (error.response.data["Error Message"]) {
          msg = error.response.data["Error Message"];
        } else if (error.response.data.message) {
          msg = error.response.data.message;
        }
      }
      setErrorMessage(msg);
    }
  };

  return (
    <div className="create-case-container">
      <h2>Assign Case Number</h2>

      <div className="input-group">
        <label>Enter Application ID</label>
        <input
          type="text"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          placeholder="e.g., 12"
        />
      </div>

      <button onClick={handleCheckApp}>Check & Assign Case</button>

      {errorMessage && <div className="error-box">{errorMessage}</div>}

      {caseNumber && (
        <div className="case-display">
          ✅ Current Case Number: <strong>{caseNumber}</strong>
        </div>
      )}
    </div>
  );
};

export default CreateCase;
