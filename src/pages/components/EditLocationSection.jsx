export default function EditLocationSection({
  event,
  setEvent,
}) {
  const handleChange = (e) => {
    setEvent({
      ...event,
      location: {
        ...event.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>Location Information</h2>
        <p>
          Update where the event will take place.
        </p>
      </div>

      <div className="event-grid">

        <div className="form-group">
          <label>Location Name</label>
          <input
            type="text"
            name="name"
            value={event.location.name}
            onChange={handleChange}
            placeholder="Madison Square Garden"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={event.location.address}
            onChange={handleChange}
            placeholder="4 Pennsylvania Plaza"
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={event.location.city}
            onChange={handleChange}
            placeholder="New York"
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={event.location.country}
            onChange={handleChange}
            placeholder="United States"
          />
        </div>

      </div>
    </div>
  );
}