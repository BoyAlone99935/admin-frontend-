export default function EditEventInformation({
  event,
  setEvent,
}) {
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
        <p>
          Update the basic details of this event.
        </p>
      </div>

      <div className="event-grid">

        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Summer Tour 2026"
          />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            name="venue"
            value={event.venue}
            onChange={handleChange}
            placeholder="Madison Square Garden"
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe the event..."
          />
        </div>

        <div className="form-group">
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