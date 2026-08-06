import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../../AuthContext";
import "../../styles/dashboard.css";
const StatCard = () => {
  const { count } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="stat-card-container">

      {/* HEADER SECTION */}
      <div className="celeb-header">
        <div>
          <h2>Celebrities</h2>
          <p>Manage all celebrities</p>
        </div>

        <button className="add-btn" onClick={() => navigate("/admin/create-celebrity")}>
          + Add Celebrity
        </button>
      </div>

      {/* STATS SECTION */}
      {/*
      <div className="stats-container">
        <div className="stat-card">
          <h3>All Celebrities</h3>
          <p>{count}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>8</p>
        </div>

        <div className="stat-card">
          <h3>Total Purchases</h3>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h3>Uncomfirmed Purchases</h3>
          <p>12</p>
        </div>
      </div>*/}
    </div>
  );
};

export default StatCard;