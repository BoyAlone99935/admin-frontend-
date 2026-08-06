import { useNavigate } from "react-router-dom";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const MeetAndGreetCard = ({ meetAndGreet }) => {
  const navigate = useNavigate();

  const {
    _id,
    title,
    type,
    price,
    capacity,
    bookedCount,
    date,
    location,
    images,
    isActive,
  } = meetAndGreet;

  const coverImage = images?.[0] || "https://via.placeholder.com/400x260";
  const spotsLeft = capacity - (bookedCount || 0);
  const isFull = spotsLeft <= 0;

  return (
    <div className="mg-card">

      <div
        className="mg-card-image"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <span className={`mg-type-badge ${type === "vip" ? "vip" : ""}`}>
          {type === "vip" ? "VIP" : "Regular"}
        </span>

        {!isActive && <span className="mg-inactive-badge">Inactive</span>}
        {isActive && isFull && <span className="mg-full-badge">Full</span>}
      </div>

      <div className="mg-card-body">

        <h3 className="mg-card-title">{title}</h3>

        <div className="mg-card-meta">
          <span>{formatDate(date)}</span>
          <span className="mg-meta-dot">•</span>
          <span>{formatTime(date)}</span>
        </div>

        <p className="mg-card-location">
          {location?.name}{location?.city ? `, ${location.city}` : ""}
        </p>

        <div className="mg-card-footer">
          <div className="mg-card-price">
            <span className="mg-price-value">${price}</span>
            <span className="mg-price-label">per fan</span>
          </div>

          <div className="mg-card-capacity">
            {isFull ? "Sold out" : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
          </div>
        </div>

        <button
          type="button"
          className="mg-manage-btn"
          onClick={() => navigate(`/admin/manage-meet/${_id}`)}
        >
          Manage
        </button>

      </div>

    </div>
  );
};

export default MeetAndGreetCard;