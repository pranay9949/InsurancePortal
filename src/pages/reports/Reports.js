import { useEffect, useState } from "react";
import axios from "axios";
import "./reports.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState({
    planName: null,
    planStatus: null,
    planStartDate: null,
    planEndDate: null,
  });
  const [planNames, setPlanNames] = useState([]);
  const [planStatuses, setPlanStatuses] = useState([]);
  const [downloadToken, setDownloadToken] = useState(null);

  const fetchReports = async (searchParams) => {
    try {
      const res = await axios.post(
        "http://localhost:7001/api/reports/searchreports",
        searchParams,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setReports(res.data);

      const token = res.headers["x-download-token"];
      if (token) {
        setDownloadToken(token);
        console.log("Token set:", token);
      } else {
        console.warn("No token received");
      }
    } catch (err) {
      console.log(err, "Failed to fetch reports");
    }
  };

  useEffect(() => {
    const fetchPlanNames = async () => {
      try {
        const response = await axios.get("http://localhost:7001/api/reports/planNames");
        setPlanNames(response.data);
      } catch (err) {
        console.log("Error Fetching ", err);
      }
    };

    const fetchStatus = async () => {
      try {
        const response = await axios.get("http://localhost:7001/api/reports/planStatus");
        setPlanStatuses(response.data);
      } catch (err) {
        console.log("Failed fetching ", err);
      }
    };

    fetchPlanNames();
    fetchStatus();
    fetchReports({
      planName: null,
      planStatus: null,
      planStartDate: null,
      planEndDate: null,
    });
  }, []);

  const handleDownloadExcel = () => {
    if (downloadToken) {
      window.location.href = `http://localhost:7001/api/reports/excel/${downloadToken}`;
    } else {
      alert("No download token available. Please try again.");
    }
  };

  const handleDownloadPDF = () => {
    if (downloadToken) {
      window.location.href = `http://localhost:7001/api/reports/pdf/${downloadToken}`;
    } else {
      alert("No download token available. Please try again.");
    }
  };

  const handleSearchChange = (field, value) => {
    const updatedSearch = { ...search, [field]: value };
    setSearch(updatedSearch);
    fetchReports(updatedSearch);
  };

  return (
    <div className="cont">
      <form>
        <select onChange={(e) => handleSearchChange("planName", e.target.value)}>
          <option value="">-- Select Plan --</option>
          {planNames.map((item) => (
            <option key={item.planName} value={item.planName}>
              {item.planName}
            </option>
          ))}
        </select>

        <select onChange={(e) => handleSearchChange("planStatus", e.target.value)}>
          <option value="">-- Select Status --</option>
          {planStatuses.map((item) => (
            <option key={item.planStatus} value={item.planStatus}>
              {item.planStatus}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={search.planStartDate || ""}
          onChange={(e) => handleSearchChange("planStartDate", e.target.value)}
        />
        <input
          type="date"
          value={search.planEndDate || ""}
          onChange={(e) => handleSearchChange("planEndDate", e.target.value)}
        />
      </form>

      <table border={1} className="cells">
        <thead>
          <tr>
            <th colSpan={9}>Reports Module</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Gender</th>
            <th>SSN</th>
            <th>Plan Name</th>
            <th>Plan Status</th>
            <th>Plan Start Date</th>
            <th>Plan End Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.mobileNo}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.ssn}</td>
              <td>{item.planName}</td>
              <td>{item.planStatus}</td>
              <td>{item.planStartDate}</td>
              <td>{item.planEndDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className="download-buttons">
  <button onClick={handleDownloadExcel}>⬇ Excel</button>
  <button onClick={handleDownloadPDF}>⬇ PDF</button>
</div>

    </div>
  );
};

export default Reports;