import { Link } from "react-router-dom";
import "../../styles/dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CelebrityHeader = ({ ID , events }) => {
  const [celebrityData, setCelebrityData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCelebrityData = async () => {
        const response = await fetch(`https://fan-platform-backend.onrender.com/api/celebrities/${ID}`);
        const data = await response.json();
        setCelebrityData(data.celebrity);
        console.log("Fetched celebrity data:", data);
    }
    fetchCelebrityData();
  }, [ID]);

  return (
    <section className="celebrity-header">

      <Link to="/admin/dashboard" className="back-link">
        Back to Celebrities
      </Link>

      <div className="celebrity-info">

        <img src={celebrityData?.profileImage || "https://via.placeholder.com/150"} alt={celebrityData?.name || "Celebrity"} className="celebrity-profile-image" />

        <div className="celebrity-content">

          <div className="celebrity-top">

            <div>
              <h1>{celebrityData?.name || "Celebrity Name"}</h1>
              <p>
                {celebrityData?.bio || "American singer, songwriter and dancer."}
              </p>
            </div>

            <button className="create-event-btn" onClick={() => navigate(`/admin/create-event/${ID}`)}>
              Event
            </button>

            <button className="create-event-btn" onClick={() => navigate(`/admin/create-meet/${ID}`)}>
              Meet
            </button>

          </div>

          <div className="celebrity-stats">

            <div className="header-stat-card">
              <h3>Events</h3>
              <span>{events?.length || 0}</span>
            </div>

            <div className="header-stat-card">
              <h3>Meet & Greets</h3>
              <span>5</span>
            </div>

            <div className="header-stat-card">
              <h3>Merchandise</h3>
              <span>8</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CelebrityHeader;