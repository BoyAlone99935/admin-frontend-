import { useState } from "react";
import EventInformation from "../components/EventInformation";
import LocationSection from "../components/LocationSection";
import BannerSection from "../components/BannerSection";
import TicketTypeSection from "../components/TicketTypeSection";
import "../../styles/dashboard.css";
import {useParams} from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateEvent() {
  const {setLoading} = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate()
  console.log("Celebrity ID:", id); // Log the celebrity ID to the console
  
  const [event, setEvent] = useState({
    celebrity: id,
    title: "",
    description: "",
    venue: "",
    eventDate: "",
    location: {
      name: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [arenaOverview, setArenaOverview] = useState(null);

  const [ticketTypes, setTicketTypes] = useState([
    {
      name: "",
      price: "",
      section: "",
      rows: [],
      seatsPerRow: "",
      cartegory: "vip",
      ticketType: "Reserved",
      image: null,
    },
  ]);


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    const formData = new FormData();

    // Event Details
    formData.append("celebrity", event.celebrity);
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("venue", event.venue);
    formData.append("eventDate", event.eventDate);

    // Nested Object
    formData.append(
      "location",
      JSON.stringify(event.location)
    );

    // Event Images
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    if (arenaOverview) {
      formData.append("arenaOverview", arenaOverview);
    }

    // Remove File objects before stringifying
    const tickets = ticketTypes.map((ticket) => ({
      name: ticket.name,
      price: ticket.price,
      section: ticket.section,
      rows: ticket.rows,
      seatsPerRow: ticket.seatsPerRow,
      cartegory: ticket.cartegory,
      ticketType: ticket.ticketType,
    }));

    formData.append(
      "ticketTypes",
      JSON.stringify(tickets)
    );

    // Upload ticket images
    ticketTypes.forEach((ticket) => {
      if (ticket.image) {
        formData.append(
          "ticketImages",
          ticket.image
        );
      }
    });

    const response = await fetch(
      "https://fan-platform-backend.onrender.com/api/v1/events/create-event",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.message);
    }
    setLoading(false)
    alert("Event created successfully!")
    navigate(`/admin/celebrity/${id}`)
  } catch (error) {
    setLoading(false)
    console.error(error);
  }
};

  return (
    <div className="create-event-page">
      <form onSubmit={handleSubmit} className="create-event-form">

        <EventInformation
          event={event}
          setEvent={setEvent}
        />

        <LocationSection
          event={event}
          setEvent={setEvent}
        />

        <BannerSection
            bannerImage={bannerImage}
            setBannerImage={setBannerImage}
            arenaOverview={arenaOverview}
            setArenaOverview={setArenaOverview}
        />

        <TicketTypeSection
          ticketTypes={ticketTypes}
          setTicketTypes={setTicketTypes}
        />

        <button type="submit" className="create-event-btn" onClick={handleSubmit}>
          Create Event
        </button>

      </form>
    </div>
  );
}