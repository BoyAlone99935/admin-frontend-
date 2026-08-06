import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import EditEventInformation from "../components/EditEventInformation";
import EditLocationSection from "../components/EditLocationSection";
import EditBannerSection from "../components/EditBannerSection";
import EditTicketTypeSection from "../components/EditTicketTypeSection";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const { id } = useParams();
    const { loading , setLoading } = useContext(AuthContext);
    const navigate = useNavigate()
   
  

  const [event, setEvent] = useState({
    celebrity: "",
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
  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://fan-platform-backend.onrender.com/api/v1/events/${id}`
        );

        const data = await res.json();
        console.log("Fetched event data:", data.event);

        const currentEvent = data.event;

        setEvent({
          celebrity: currentEvent.celebrity,
          title: currentEvent.title,
          description: currentEvent.description,
          venue: currentEvent.venue,
          eventDate: currentEvent.eventDate.split("T")[0],
          location: currentEvent.location,
        });

        setBannerImage(currentEvent.bannerImage);
        setArenaOverview(currentEvent.arenaOverview);
        setTicketTypes(currentEvent.ticketTypes);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  const handleSaveChanges = async (e) => {
    setLoading(true)
  e.preventDefault();
  
  try {
    const formData = new FormData();

    formData.append("celebrity", event.celebrity);
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("venue", event.venue);
    formData.append("eventDate", event.eventDate);

    formData.append(
      "location",
      JSON.stringify(event.location)
    );

    formData.append(
      "ticketTypes",
      JSON.stringify(ticketTypes)
    );

    if (bannerImage instanceof File) {
      formData.append(
        "bannerImage",
        bannerImage
      );
    }

    if (arenaOverview instanceof File) {
      formData.append(
        "arenaOverview",
        arenaOverview
      );
    }

    const res = await fetch(
      `https://fan-platform-backend.onrender.com/api/v1/events/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      throw new Error(data.message);
    }
    setLoading(false)
    alert("Event updated successfully.");
  } catch (error) {
    console.error(error);
    setLoading(false)
  }
};

 const handleDeleteEvent = async () => {
  const confirmDelete = window.confirm(
    "Delete this event permanently?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `https://fan-platform-backend.onrender.com/api/v1/events/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      throw new Error(data.message);
    }

    alert("Event deleted successfully.");

    navigate(-1);
  } catch (error) {
    console.error(error);
  }
};



  return (
    <div className="create-event-page">
      <form className="create-event-form">

        <EditEventInformation
          event={event}
          setEvent={setEvent}
        />

        <EditLocationSection
          event={event}
          setEvent={setEvent}
        />

        <EditBannerSection
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
          arenaOverview={arenaOverview}
          setArenaOverview={setArenaOverview}
        />

        <EditTicketTypeSection
          ticketTypes={ticketTypes}
          setTicketTypes={setTicketTypes}
        />

        <button type="submit" className="create-event-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>

        <button
          type="button"
          className="delete-event-btn"
          onClick={handleDeleteEvent}
        >
          Delete Event
        </button>

      </form>
    </div>
  );
}