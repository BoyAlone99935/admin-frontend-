import {useNavigate, useParams} from "react-router-dom";
export default function EditTicketTypeSection({
  ticketTypes,
  setTicketTypes,
}) {
  const navigate = useNavigate();
    const { id } = useParams();
  const handleChange = (index, field, value) => {
    const updated = [...ticketTypes];
    updated[index][field] = value;
    setTicketTypes(updated);
  };

  const handleRowsChange = (index, value) => {
    const updated = [...ticketTypes];

    updated[index].rows = value
      .split(",")
      .map((row) => row.trim())
      .filter(Boolean);

    setTicketTypes(updated);
  };

  const deleteTicket = (index) => {
    setTicketTypes(
      ticketTypes.filter((_, i) => i !== index)
    );
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
        cartegory: "Regular",
        ticketType: "Reserved",
        image: "",
      },
    ]);
  };

  const handleDeleteTicket = async (ticketTypeId) => {
    const confirmDelete = window.confirm(
      "Delete this ticket type?"
    );
  
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(
        `https://fan-platform-backend.onrender.com/api/v1/events/${id}/ticket-types/${ticketTypeId}`,
        {
          method: "DELETE",
        }
      );
  
      const data = await res.json();
  
      console.log(data);
  
      if (!res.ok) {
        throw new Error(data.message);
      }
  
      setTicketTypes((prev) =>
        prev.filter(
          (ticket) => ticket._id !== ticketTypeId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>Ticket Types</h2>
        <p>
          Edit existing ticket types or add new ones.
        </p>
      </div>

      {ticketTypes.map((ticket, index) => (
        <div
          className="ticket-card"
          key={ticket._id || index}
        >
          <div className="ticket-header">
            <h3>Ticket {index + 1}</h3>

            <button
              type="button"
              className="delete-ticket-btn"
              onClick={() => handleDeleteTicket(ticket._id)}
            >
              Delete Ticket
            </button>
          </div>

          <div className="event-grid">

            <div className="form-group">
              <label>Name</label>
              <input
                value={ticket.name}
                onChange={(e) =>
                  handleChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={ticket.price}
                onChange={(e) =>
                  handleChange(
                    index,
                    "price",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Section</label>
              <input
                value={ticket.section}
                onChange={(e) =>
                  handleChange(
                    index,
                    "section",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Rows</label>
              <input
                value={ticket.rows.join(", ")}
                onChange={(e) =>
                  handleRowsChange(
                    index,
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Seats Per Row</label>
              <input
                type="number"
                value={ticket.seatsPerRow}
                onChange={(e) =>
                  handleChange(
                    index,
                    "seatsPerRow",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={ticket.cartegory}
                onChange={(e) =>
                  handleChange(
                    index,
                    "cartegory",
                    e.target.value
                  )
                }
              >
                <option value="vip">VIP</option>
                <option value="Regular">
                  Regular
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Ticket Type</label>
              <select
                value={ticket.ticketType}
                onChange={(e) =>
                  handleChange(
                    index,
                    "ticketType",
                    e.target.value
                  )
                }
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
        </div>
      ))}

      <button
        type="button"
        onClick={() => navigate(`/admin/create-ticket/${id}`)}
    >
        + Add Ticket
    </button>
    </div>
  );
}