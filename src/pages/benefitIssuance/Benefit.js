import { useState } from "react";
import axios from "axios";
import "./benefit.css";

const Benefit = () => {
  const [email, setEmail] = useState("panayyampalla714@gmail.com");
  const [editing, setEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateEmail = () => {
    if (newEmail.trim() !== "") {
      setEmail(newEmail);
      setEditing(false);
    }
  };

  const handleSend = async (type) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:7007/api/benefit/${type}?email=${email}`;
      await axios.get(url);
      setMessage(`✅ ${type.toUpperCase()} sent successfully!`);
    } catch (err) {
      setMessage(`❌ Failed to send ${type.toUpperCase()}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="benefit-container">
      <h2>Send Benefits Summary</h2>

      {!editing ? (
        <div className="email-box">
          <span>Admin Email: {email}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      ) : (
        <div className="edit-section">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleUpdateEmail}>Update</button>
        </div>
      )}

      <div className="button-group">
        <button onClick={() => handleSend("pdf")} disabled={loading}>
          {loading ? "Sending..." : "Send PDF"}
        </button>
        <button onClick={() => handleSend("excel")} disabled={loading}>
          {loading ? "Sending..." : "Send Excel"}
        </button>
      </div>

      {loading && <div className="spinner"></div>}

      {message && <div className="status-message">{message}</div>}
    </div>
  );
};

export default Benefit;
