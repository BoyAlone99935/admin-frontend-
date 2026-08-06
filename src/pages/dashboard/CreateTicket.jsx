import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
export default function CreateTicket() {
  const {setLoading} = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    name: "",
    price: "",
    section: "",
    rows: "",
    seatsPerRow: "",
    cartegory: "Regular",
    ticketType: "Reserved",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();

      formData.append("name", ticket.name);
      formData.append("price", ticket.price);
      formData.append("section", ticket.section);
      formData.append(
        "rows",
        JSON.stringify(
          ticket.rows
            .split(",")
            .map((row) => row.trim())
            .filter(Boolean)
        )
      );
      formData.append(
        "seatsPerRow",
        ticket.seatsPerRow
      );
      formData.append(
        "cartegory",
        ticket.cartegory
      );
      formData.append(
        "ticketType",
        ticket.ticketType
      );

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        `https://fan-platform-backend.onrender.com/api/v1/events/${id}/ticket-types`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      console.log(data);
      setLoading(false)
      alert("Ticket created successfully.");
      navigate(`/admin/event/${id}`)

      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-event-page">
      <form
        className="create-event-form"
        onSubmit={handleSubmit}
      >
        <div className="event-card">
          <div className="event-card-header">
            <h2>Create Ticket</h2>
            <p>
              Add a new ticket type for this event.
            </p>
          </div>

          <div className="event-grid">
            <div className="form-group">
              <label>Ticket Name</label>
              <input
                name="name"
                value={ticket.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={ticket.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Section</label>
              <input
                name="section"
                value={ticket.section}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Rows</label>
              <input
                name="rows"
                placeholder="A, B, C"
                value={ticket.rows}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Seats Per Row</label>
              <input
                type="number"
                name="seatsPerRow"
                value={ticket.seatsPerRow}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="cartegory"
                value={ticket.cartegory}
                onChange={handleChange}
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
                name="ticketType"
                value={ticket.ticketType}
                onChange={handleChange}
              >
                <option value="Reserved">
                  Reserved
                </option>
                <option value="General Admission">
                  General Admission
                </option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Ticket Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="create-event-btn"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
}