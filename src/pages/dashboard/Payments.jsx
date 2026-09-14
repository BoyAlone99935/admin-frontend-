import { useEffect, useMemo, useState } from "react";
import PaymentSummary from "../components/PaymentSummary";
import PaymentFilters from "../components/PaymentFilters";
import TicketPaymentSection from "../components/TicketPaymentSection";
import MeetPaymentSection from "../components/MeetPaymentSection";
import "../../styles/dashboard.css";

export default function Payments() {
  const [ticketPayments, setTicketPayments] = useState([]);
  const [meetPayments, setMeetPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const [ticketRes, meetRes] = await Promise.all([
        fetch(
          "https://fan-platform-backend.onrender.com/api/v1/tickets/unconfirmed",
          {
             headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
          }
        ),

        fetch(
          "https://fan-platform-backend.onrender.com/api/v1/booking/pending-payments",
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

      setTicketPayments(ticketData.purchases || []);
      setMeetPayments(meetData.requests || []);

    } catch (error) {
      console.error(
        "Error fetching payments:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredTicketPayments = useMemo(() => {
    return ticketPayments.filter((purchase) => {
      const firstTicket = purchase.tickets?.[0];

      return (
        firstTicket?.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        firstTicket?.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [ticketPayments, search]);

  const filteredMeetPayments = useMemo(() => {
    return meetPayments.filter(
      (request) =>
        request.user?.username
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        request.celebrity?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [meetPayments, search]);

  return (
    <div className="payments-page">

      <div className="page-header">
        <h1>Pending Payments</h1>

        <p>
          Review manual payments awaiting
          verification before granting
          access.
        </p>
      </div>

      <PaymentSummary
        ticketCount={filteredTicketPayments.length}
        meetCount={filteredMeetPayments.length}
      />

      <PaymentFilters
        search={search}
        setSearch={setSearch}
      />

      {loading ? (
        <div className="loading-state">
          Loading payments...
        </div>
      ) : (
        <>
          <TicketPaymentSection
            payments={filteredTicketPayments}
            refreshPayments={fetchPayments}
          />

          <MeetPaymentSection
            requests={filteredMeetPayments}
            refreshPayments={fetchPayments}
          />
        </>
      )}

    </div>
  );
}