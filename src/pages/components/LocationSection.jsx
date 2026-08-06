import "../../styles/dashboard.css";
export default function LocationSection({ event, setEvent }) {
  const handleLocationChange = (e) => {
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
        <h2>Location</h2>
        <p>Provide where the event will take place.</p>
      </div>

      <div className="input-group">
        <label>Location Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. O2 Arena"
          value={event.location.name}
          onChange={handleLocationChange}
        />
      </div>

      <div className="input-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="221B Baker Street"
          value={event.location.address}
          onChange={handleLocationChange}
        />
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="London"
            value={event.location.city}
            onChange={handleLocationChange}
          />
        </div>

        <div className="input-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="United Kingdom"
            value={event.location.country}
            onChange={handleLocationChange}
          />
        </div>
      </div>
    </div>
  );
}