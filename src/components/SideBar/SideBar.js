import "./sidebar.css";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaUserPlus,
  FaDatabase,
  FaCheckCircle,
  FaEnvelope,
  FaMedal,
  FaChartBar,
  FaUserCog,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, onClick }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSubMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="fas">
        <FaBars />
        <FaTimes size={24} onClick={onClick} className="fat" />
      </div>

      <div className="sidebar-items">
        <FaTachometerAlt size={20} className="icon" />
        <Link to="/">
       <h4>Dashboard</h4>
        </Link>
      </div>

      <div className="sidebar-items parent" onClick={() => toggleSubMenu("ApplicationRegistration")}>
        <FaUserPlus size={20} className="icon" />
        <h4>Application Registration</h4>
        {openMenu === "ApplicationRegistration" ? (
          <FaChevronUp className="chevron" />
        ) : (
          <FaChevronDown className="chevron" />
        )}
      </div>
      {openMenu === "ApplicationRegistration" && (
        <div className="submenu">
          <Link to="/createapp">
          <p className="sub-item">Create Application</p>
          </Link>
          <Link to="/viewapp">
          <p className="sub-item"> View Applications</p>
          </Link>
        </div>
      )}

      <div className="sidebar-items parent" onClick={() => toggleSubMenu("DataCollection")}>
        <FaDatabase size={20} className="icon" />
        <h4>Data Collection</h4>
        {openMenu === "DataCollection" ? (
          <FaChevronUp className="chevron" />
        ) : (
          <FaChevronDown className="chevron" />
        )}
      </div>
      {openMenu === "DataCollection" && (
        <div className="submenu">
          <Link to="/create-case"><p>Create Case</p></Link>
          <Link to="/plan-selection"><p>Plan Selection</p></Link>
          <Link to="/income-details"><p>Income Details</p></Link>
          <Link to="/education-details"><p>Education Details</p></Link>
          <Link to="/kids-details"><p>Kids Details</p></Link>
          <Link to="/summary"><p>Summary Screen</p></Link>

        </div>
      )}

      <div className="sidebar-items parent" onClick={() => toggleSubMenu("Eligibility")}>
        <FaCheckCircle size={20} className="icon" />
        <h4>Eligibility Determination</h4>
        {openMenu === "Eligibility" ? (
          <FaChevronUp className="chevron" />
        ) : (
          <FaChevronDown className="chevron" />
        )}
      </div>
      {openMenu === "Eligibility" && (
        <div className="submenu">
          <Link to="/check-eligibility"><p>Eligibility Check</p></Link>
          <Link to ="/check-results"><p>Results</p></Link>
        </div>
      )}

      <div className="sidebar-items " >
        <FaEnvelope size={20} className="icon" />
        <Link to="/correspondence"><h4>Correspondence</h4></Link>
       
        </div>
      

      <div className="sidebar-items">
        <FaMedal size={20} className="icon" />
        <Link to="/benefit"><h4>Benefit Issuance</h4></Link>
      </div>

      <div className="sidebar-items">
        <FaChartBar size={20} className="icon" />
        <h4>Reports</h4>
      </div>

      <div className="sidebar-items parent" onClick={() => toggleSubMenu("Admin")}>
        <FaUserCog size={20} className="icon" />
        <h4>Admin</h4>
        {openMenu === "Admin" ? (
          <FaChevronUp className="chevron" />
        ) : (
          <FaChevronDown className="chevron" />
        )}
      </div>
      {openMenu === "Admin" && (
        <div className="submenu">
          <Link to="/create-plan"><p>Create Plan</p></Link>
          <Link to="/view-plan"><p>View Plan</p></Link>
          <Link to="/create-caseworker"><p>Create CaseWorker</p></Link>
           <Link to="/view-caseworker"><p>View CaseWorker</p></Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
