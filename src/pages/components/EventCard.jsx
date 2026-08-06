import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <img
        src={event.bannerImage}
        alt={event.title}
        className="event-image"
      />

      <div className="event-content">
        <h3>{event.title}</h3>

        <p className="event-location">
          📍 {event.location.city}, {event.location.country}
        </p>

        <p className="event-date">
          {new Date(event.eventDate).toLocaleDateString()}
        </p>

        <div className="event-footer">
          <span>
            {event.ticketTypes.length} Ticket Types
          </span>

          <button
            onClick={() =>
              navigate(`/admin/event/${event._id}`)
            }
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}