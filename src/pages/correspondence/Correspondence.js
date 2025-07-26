import "./correspondence.css";

const Correspondence = () => {
  return (
    <div className="correspondence-info">
      <h2>📨 Correspondence Module</h2>

      <div className="info-card">
        <h3>What it does</h3>
        <p>This module sends automated eligibility summary emails to users.</p>
      </div>

      <div className="info-card">
        <h3>Schedule</h3>
        <p>🕕 Runs every day between <strong>6:00 PM</strong> and <strong>11:00 PM</strong>.</p>
      </div>

      <div className="info-card">
        <h3>Behind the Scenes</h3>
        <ul>
          <li>📤 Collects eligibility details from database</li>
          <li>✉️ Generates correspondence content (like plan status)</li>
          <li>📧 Sends summary emails to all eligible users</li>
          <li>🗂️ Archives sent data in logs</li>
        </ul>
      </div>

      <div className="info-card highlight">
        <p>✅ No manual action needed. This process runs via a scheduled task (Spring Scheduler).</p>
      </div>
    </div>
  );
};

export default Correspondence;
