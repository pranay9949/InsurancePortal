import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaseContext } from "../../context/CaseContext";
import "./incomedetails.css"; // Create this for styling

const IncomeDetails = () => {
  const { caseNumber } = useContext(CaseContext);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [rentalIncome, setRentalIncome] = useState("");
  const [propertyIncome, setPropertyIncome] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!monthlyIncome || !rentalIncome || !propertyIncome) {
      setErrorMessage("Please fill in all income fields.");
      return;
    }

    try {
      const payload = {
        monthlyIncome: parseFloat(monthlyIncome),
        rentalIncome: parseFloat(rentalIncome),
        propertyIncome: parseFloat(propertyIncome),
        caseNumber: caseNumber,
      };

      const res = await axios.post(
        "http://localhost:7004/api/income/addincome",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data);
      setErrorMessage("");
      setSuccessMessage("Income details submitted successfully!");

      // ✅ Navigate to Education Details after 1 sec
      setTimeout(() => {
        navigate("/education-details");
      }, 1000);

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
    <div className="income-details-container">
      <h2>Income Details</h2>

      <form onSubmit={handleSubmit} className="income-form">
        <div className="form-group">
          <label>Case Number</label>
          <input type="text" value={caseNumber || ""} disabled />
        </div>

        <div className="form-group">
          <label>Monthly Income</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="Enter Monthly Income"
            required
          />
        </div>

        <div className="form-group">
          <label>Rental Income</label>
          <input
            type="number"
            value={rentalIncome}
            onChange={(e) => setRentalIncome(e.target.value)}
            placeholder="Enter Rental Income"
            required
          />
        </div>

        <div className="form-group">
          <label>Property Income</label>
          <input
            type="number"
            value={propertyIncome}
            onChange={(e) => setPropertyIncome(e.target.value)}
            placeholder="Enter Property Income"
            required
          />
        </div>

        <button type="submit">Submit Income</button>
      </form>

      {errorMessage && <div className="error-box">{errorMessage}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}
    </div>
  );
};

export default IncomeDetails;
