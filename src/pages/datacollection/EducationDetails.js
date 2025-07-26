import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaseContext } from "../../context/CaseContext";
import "./educationdetails.css"; // Create this for styling

const EducationDetails = () => {
  const { caseNumber } = useContext(CaseContext);
  const [highestDegree, setHighestDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!highestDegree || !graduationYear || !universityName) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        highestDegree,
        graduationYear: parseInt(graduationYear),
        universityName,
        caseNumber,
      };

      const res = await axios.post(
        "http://localhost:7004/api/education/addeducation",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      setSuccessMessage("Education details submitted successfully!");
      setErrorMessage("");

      // Navigate to Kids Details after a short delay
      setTimeout(() => {
        navigate("/kids-details");
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
    <div className="education-details-container">
      <h2>Education Details</h2>

      <form onSubmit={handleSubmit} className="education-form">
        <div className="form-group">
          <label>Case Number</label>
          <input type="text" value={caseNumber || ""} disabled />
        </div>

        <div className="form-group">
          <label>Highest Degree</label>
          <input
            type="text"
            value={highestDegree}
            onChange={(e) => setHighestDegree(e.target.value)}
            placeholder="e.g., Bachelor of Science"
            required
          />
        </div>

        <div className="form-group">
          <label>Graduation Year</label>
          <input
            type="number"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            placeholder="e.g., 2026"
            required
          />
        </div>

        <div className="form-group">
          <label>University Name</label>
          <input
            type="text"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            placeholder="e.g., Professor Jayshakar Technological University"
            required
          />
        </div>

        <button type="submit">Submit Education</button>
      </form>

      {errorMessage && <div className="error-box">{errorMessage}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}
    </div>
  );
};

export default EducationDetails;
