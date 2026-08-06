export default function TicketTypeSection({
  ticketTypes,
  setTicketTypes,
}) {
  const handleChange = (index, e) => {
    const updated = [...ticketTypes];

    updated[index][e.target.name] = e.target.value;

    setTicketTypes(updated);
  };

  const handleImageChange = (index, field, file) => {
    const updated = [...ticketTypes];

    updated[index][field] = file;

    setTicketTypes(updated);
  };

  const addTicket = () => {
    setTicketTypes([
      ...ticketTypes,
      {
        name: "",
        price: "",
        section: "",
        rows: [],
        seatsPerRow: "",
        category: "vip",
        ticketType: "Reserved",
        image: null,
        arenaOverview: null,
      },
    ]);
  };

  const removeTicket = (index) => {
    const updated = ticketTypes.filter((_, i) => i !== index);

    setTicketTypes(updated);
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>Ticket Types</h2>
        <p>Create one or more ticket types for this event.</p>
      </div>

      {ticketTypes.map((ticket, index) => (
        <div key={index} className="ticket-card">

          <div className="ticket-header">
            <h3>Ticket #{index + 1}</h3>

            {ticketTypes.length > 1 && (
              <button
                type="button"
                className="remove-ticket"
                onClick={() => removeTicket(index)}
              >
                Remove
              </button>
            )}
          </div>

          <div className="input-row">

            <div className="input-group">
              <label>Name</label>
              <input
                name="name"
                value={ticket.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={ticket.price}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

          </div>

          <div className="input-row">

            <div className="input-group">
              <label>Section</label>
              <input
                name="section"
                value={ticket.section}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="input-group">
              <label>Seats Per Row</label>
              <input
                type="number"
                name="seatsPerRow"
                value={ticket.seatsPerRow}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

          </div>

          <div className="input-group">
            <label>Rows (comma separated)</label>

            <input
              placeholder="A,B,C,D"
              value={ticket.rows.join(",")}
              onChange={(e) => {
                const updated = [...ticketTypes];

                updated[index].rows =
                  e.target.value
                    .split(",")
                    .map((r) => r.trim());

                setTicketTypes(updated);
              }}
            />
          </div>

          <div className="input-row">

            <div className="input-group">
              <label>Category</label>

              <select
                name="category"
                value={ticket.category}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="vip">VIP</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            <div className="input-group">
              <label>Ticket Type</label>

              <select
                name="ticketType"
                value={ticket.ticketType}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="Reserved">
                  Reserved
                </option>

                <option value="General Admission">
                  General Admission
                </option>

              </select>
            </div>

          </div>

          <div className="input-row">

            <div className="input-group">
              <label>Ticket Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    index,
                    "image",
                    e.target.files[0]
                  )
                }
              />
            </div>

            

          </div>

        </div>
      ))}

      <button
        type="button"
        className="add-ticket-btn"
        onClick={addTicket}
      >
        + Add Ticket Type
      </button>

    </div>
  );
}