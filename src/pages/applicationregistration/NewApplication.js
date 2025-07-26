import axios from "axios";
import "./newapplication.css";
import { useState } from "react";

const NewApplication = () => {
  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    ssn: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user edits
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:7003/api/registration/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);

      // Clear any error
      setErrorMessage("");

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("API error:", error);

      if (error.response && error.response.data) {
        let message = "Unknown error";

        if (error.response.data["Error Message"]) {
          message = error.response.data["Error Message"];
        }

        console.log("Extracted:", message);
        setErrorMessage(message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Create Application</h2>

      {errorMessage && (
        <div className="error-box">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="grid-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="1234567890"
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="form-group gender-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>DOB</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>SSN</label>
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            placeholder="123-45-6789"
            required
          />
        </div>

        <div className="form-group full-width">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewApplication;
