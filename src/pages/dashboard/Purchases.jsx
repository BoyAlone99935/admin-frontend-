import { useEffect, useMemo, useState } from "react";
import PurchaseSummary from "../components/PurchaseSummary";
import PurchaseFilters from "../components/PurchaseFilters";
import TicketPurchaseSection from "../components/TicketPurchaseSection";
import MeetPurchaseSection from "../components/MeetPurchaseSection";
import "../../styles/dashboard.css";

export default function Purchases() {
  const [ticketPurchases, setTicketPurchases] = useState([]);
  const [meetPurchases, setMeetPurchases] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const [ticketRes, meetRes] = await Promise.all([
        fetch(
          "https://fan-platform-backend.onrender.com/api/v1/tickets/all",
          {
              headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
          }
        ),

        fetch(
          "https://fan-platform-backend.onrender.com/api/v1/booking/completed-payments",
          {
              headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
          }
        ),
      ]);

      const ticketData = await ticketRes.json();
      const meetData = await meetRes.json();

      if (!ticketRes.ok) {
        throw new Error(ticketData.message);
      }

      if (!meetRes.ok) {
        throw new Error(meetData.message);
      }

      setTicketPurchases(ticketData.purchases || []);
      setMeetPurchases(meetData.requests || []);

    } catch (error) {
      console.error(
        "Error fetching purchases:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredTicketPurchases = useMemo(() => {

    return ticketPurchases.filter((purchase) => {

      const ticket = purchase.tickets?.[0];

      return (

        ticket?.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        ticket?.title
          ?.toLowerCase()
          .includes(search.toLowerCase())

      );

    });

  }, [ticketPurchases, search]);

  const filteredMeetPurchases = useMemo(() => {

    return meetPurchases.filter((request) =>

      request.user?.username
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      request.user?.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      request.celebrity?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [meetPurchases, search]);

  return (
    <div className="purchases-page" style={{padding:'1rem'}}>

      <div className="page-header">

        <h1>
          Purchases
        </h1>

        <p>
          Browse all completed ticket purchases
          and paid meet & greet bookings.
        </p>

      </div>

      <PurchaseSummary
        ticketCount={
          filteredTicketPurchases.length
        }
        meetCount={
          filteredMeetPurchases.length
        }
      />

      <PurchaseFilters
        search={search}
        setSearch={setSearch}
      />

      {loading ? (

        <div className="loading-state">
          Loading purchases...
        </div>

      ) : (

        <>

          <TicketPurchaseSection
            purchases={filteredTicketPurchases}
          />

          <MeetPurchaseSection
            requests={filteredMeetPurchases}
          />

        </>

      )}

    </div>
  );
}