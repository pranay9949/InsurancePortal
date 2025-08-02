import { useEffect } from "react";
import "./dashboard.css";
import { FaShoppingCart, FaMoneyBillAlt, FaUserTimes, FaHeart } from "react-icons/fa";
import axios from "axios";

export const Dashboard = () => {
 
  const cards = [
    {
      title: "No. of Plans Available",
      number: 5,
      date: "May - Oct 2025",
      icon: <FaShoppingCart size={32} />,
      color: "linear-gradient(135deg, #7f7fd5, #86a8e7)",
    },
    {
      title: "Citizens Approved",
      number: 85741,
      date:" May - Oct 2025",
      icon: <FaMoneyBillAlt size={32} />,
      color: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    },
    {
      title: "Citizens Denied",
      number: 4565,
      date: " May - Oct 2025",
      icon: <FaUserTimes size={32} />,
      color: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
    {
      title: "Families Benefited",
      number: 5676,
      date: " May - Oct 2025",
      icon: <FaHeart size={32} />,
      color: "linear-gradient(135deg, #00c6ff, #0072ff)",
    },
  ];
  
  return (
    <div className="dashboard-container">
      
      <div className="card-grid">
        {cards.map((card, index) => (
          <div className="card fancy-card" key={index} style={{ background: card.color }}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-number">{card.number.toLocaleString()}</div>
            <div className="card-title">{card.title}</div>
            <div className="card-date">{card.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
