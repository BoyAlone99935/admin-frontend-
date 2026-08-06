import CelebrityHeader from "../components/CelebrityHeader";
import EventCard from "../components/EventCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MeetAndGreetCard from "../components/MeetAndGreetCard";
import PerformanceVideos from "../components/PerformanceVideos";
export default function Celebrity() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [meetAndGreets , setMeetAndGreets] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://fan-platform-backend.onrender.com/api/v1/events/getEvents/${id}`
        );

        const data = await res.json();

        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchMeetAndGreets = async (celebrityId) => {
  const res = await fetch(
    `https://fan-platform-backend.onrender.com/api/v1/meet-and-greets/getAll/${id}`
  );
  const data = await res.json();
  console.log(data)
  setMeetAndGreets(data.meetAndGreet)
  return data.meetAndGreets;
};
    fetchMeetAndGreets()
    fetchEvents();
  }, [id]);

  return (
    <div className="celebrity-page">
      <CelebrityHeader ID={id} events={events} />

      <div className="events-section">
        <div className="events-header">
          <h2>Events</h2>
          <p>Manage all events for this celebrity.</p>
        </div>

        <div className="events-grid">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))
          ) : (
            <div className="empty-events">
              <h3>No Events Yet</h3>
              <p>Create your first event to get started.</p>
            </div>
          )}
        </div>
      </div>

      <div className="events-section">
        <div className="events-header">
          <h2>Meet &amp; Greets</h2>
          <p>Manage all meet &amp; greets for this celebrity.</p>
        </div>

        <div className="mg-grid">
          {meetAndGreets.length > 0 ? (
            meetAndGreets.map((mg) => (
              <MeetAndGreetCard
                key={mg._id}
                meetAndGreet={mg}
              />
            ))
          ) : (
            <div className="empty-events">
              <h3>No Meet &amp; Greets Yet</h3>
              <p>Create your first meet &amp; greet to get started.</p>
            </div>
          )}
        </div>

        <PerformanceVideos celebrityId={id} />

      </div>
    </div>
  );
}