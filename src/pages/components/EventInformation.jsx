import "../../styles/dashboard.css";
export default function EventInformation({ event, setEvent }) {
  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>Event Information</h2>
        <p>Provide the basic details about the event.</p>
      </div>

      <div className="input-group">
        <label>Event Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Summer World Tour"
          value={event.title}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Tell fans about this event..."
          value={event.description}
          onChange={handleChange}
        />
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Madison Square Garden"
            value={event.venue}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={event.eventDate}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}