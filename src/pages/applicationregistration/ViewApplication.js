import './viewapplication.css';
import { useState } from 'react';
import axios from 'axios';

export const ViewApplication = () => {
  const [appId, setAppId] = useState('');
  const [appData, setAppData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!appId.trim()) {
      setErrorMessage('Please enter an Application ID');
      setAppData(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:7003/api/registration/get/appid/${appId}`);
      setAppData(res.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setAppData(null);
      setErrorMessage('No application found for this ID');
    }
  };

  return (
    <div className="container">
      <h2>View Application</h2>
      <form onSubmit={handleSearch} className="grid-form">
        <div className="form-group full-width">
          <label>Enter Application ID</label>
          <input
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="e.g., 11"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {appData && (
        <div className="app-details-card">
          <h3>Application Details</h3>
          <div className="detail-item">
            <span className="label">Full Name:</span>
            <span className="value">{appData.userName}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email ID:</span>
            <span className="value">{appData.emailId}</span>
          </div>
          <div className="detail-item">
            <span className="label">Date of Birth:</span>
            <span className="value">{appData.dateOfBirth}</span>
          </div>
          <div className="detail-item">
            <span className="label">SSN:</span>
            <span className="value">{appData.ssn}</span>
          </div>
        </div>
      )}
    </div>
  );
};
