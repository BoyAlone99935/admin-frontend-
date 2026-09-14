import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

export default function OfferSection({
  request,
  onClose,
  refreshRequests,
}) {
  const [loading, setLoading] = useState(false);

  const [offer, setOffer] = useState({
    price: "",
    message: "",
    date: "",
    location: {
      name: "",
      address: "",
      city: "",
      country: "",
    },
    image: null,
  });

  useEffect(() => {
    if (!request) return;

    setOffer({
      price: request.offer?.price || "",
      message: request.offer?.message || "",
      date: request.offer?.date
        ? request.offer.date.substring(0, 10)
        : "",
      location: {
        name: request.offer?.location?.name || "",
        address: request.offer?.location?.address || "",
        city: request.offer?.location?.city || "",
        country: request.offer?.location?.country || "",
      },
      image: null,
    });
  }, [request]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("price", offer.price);
      formData.append("message", offer.message);
      formData.append("date", offer.date);

      formData.append(
        "location",
        JSON.stringify(offer.location)
      );

      if (offer.image) {
        formData.append("image", offer.image);
      }

      const res = await fetch(
        `https://fan-platform-backend.onrender.com/api/v1/booking/create-offer/${request._id}`,
        {
          method: "POST",
            headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Offer sent successfully.");

      refreshRequests();

      onClose();

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="offer-form"
      onSubmit={handleSubmit}
    >

      <div className="offer-grid">

        <div className="offer-field">

          <label>Price ($)</label>

          <input
            type="number"
            value={offer.price}
            onChange={(e) =>
              setOffer({
                ...offer,
                price: e.target.value,
              })
            }
          />

        </div>

        <div className="offer-field">

          <label>Meeting Date</label>

          <input
            type="date"
            value={offer.date}
            onChange={(e) =>
              setOffer({
                ...offer,
                date: e.target.value,
              })
            }
          />

        </div>

        <div className="offer-field">

          <label>Venue Name</label>

          <input
            value={offer.location.name}
            onChange={(e) =>
              setOffer({
                ...offer,
                location: {
                  ...offer.location,
                  name: e.target.value,
                },
              })
            }
          />

        </div>

        <div className="offer-field">

          <label>Address</label>

          <input
            value={offer.location.address}
            onChange={(e) =>
              setOffer({
                ...offer,
                location: {
                  ...offer.location,
                  address: e.target.value,
                },
              })
            }
          />

        </div>

        <div className="offer-field">

          <label>City</label>

          <input
            value={offer.location.city}
            onChange={(e) =>
              setOffer({
                ...offer,
                location: {
                  ...offer.location,
                  city: e.target.value,
                },
              })
            }
          />

        </div>

        <div className="offer-field">

          <label>Country</label>

          <input
            value={offer.location.country}
            onChange={(e) =>
              setOffer({
                ...offer,
                location: {
                  ...offer.location,
                  country: e.target.value,
                },
              })
            }
          />

        </div>

      </div>

      <div className="offer-field">

        <label>Offer Message</label>

        <textarea
          rows="5"
          value={offer.message}
          onChange={(e) =>
            setOffer({
              ...offer,
              message: e.target.value,
            })
          }
        />

      </div>

      <div className="offer-field">

        <label>Location Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setOffer({
              ...offer,
              image: e.target.files[0],
            })
          }
        />

      </div>

      <div className="offer-actions">

        <button
          type="button"
          className="offer-cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="offer-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : request.status === "offered"
            ? "Update Offer"
            : "Send Offer"}
        </button>

      </div>

    </form>
  );
}