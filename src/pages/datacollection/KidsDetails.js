import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaseContext } from "../../context/CaseContext";
import "./kidsdetails.css"; // Create this for styling

const KidsDetails = () => {
  const { caseNumber } = useContext(CaseContext);
  const [hasChildren, setHasChildren] = useState(false);
  const [children, setChildren] = useState([
    { childName: "", childAge: "", childSsn: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddChild = () => {
    setChildren([
      ...children,
      { childName: "", childAge: "", childSsn: "" },
    ]);
  };

  const handleChildChange = (index, field, value) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      caseNumber,
      childrenRequests: hasChildren
        ? children.map((c) => ({
            childName: c.childName,
            childAge: parseInt(c.childAge),
            childSsn: parseInt(c.childSsn),
          }))
        : [],
    };

    try {
      const res = await axios.post(
        "http://localhost:7004/api/children/addchildren",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      setSuccessMessage("Children details submitted successfully!");
      setErrorMessage("");

      // Navigate to summary page
      setTimeout(() => {
        navigate("/summary");
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
    <div className="kids-details-container">
      <h2>Children Details</h2>

      <form onSubmit={handleSubmit} className="kids-form">
        <div className="form-group">
          <label>Case Number</label>
          <input type="text" value={caseNumber || ""} disabled />
        </div>

        <div className="form-group">
          <label>Do you have children?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="yes"
                checked={hasChildren}
                onChange={() => setHasChildren(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={!hasChildren}
                onChange={() => setHasChildren(false)}
              />
              No
            </label>
          </div>
        </div>

        {hasChildren &&
          children.map((child, index) => (
            <div className="child-entry" key={index}>
              <h4>Child {index + 1}</h4>

              <div className="form-group">
                <label>Child Name</label>
                <input
                  type="text"
                  value={child.childName}
                  onChange={(e) =>
                    handleChildChange(index, "childName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Child Age</label>
                <input
                  type="number"
                  value={child.childAge}
                  onChange={(e) =>
                    handleChildChange(index, "childAge", e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Child SSN</label>
                <input
                  type="number"
                  value={child.childSsn}
                  onChange={(e) =>
                    handleChildChange(index, "childSsn", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}

        {hasChildren && (
          <button
            type="button"
            className="add-child-btn"
            onClick={handleAddChild}
          >
            + Add Another Child
          </button>
        )}

        <button type="submit">Submit Children Details</button>
      </form>

      {errorMessage && <div className="error-box">{errorMessage}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}
    </div>
  );
};

export default KidsDetails;
