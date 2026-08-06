import "../../styles/dashboard.css";

export default function PurchaseSummary({
  ticketCount,
  meetCount,
}) {
  return (
    <section className="purchase-summary">

      <div className="summary-card">

        <span className="summary-label">
          Total Purchases
        </span>

        <h2>
          {ticketCount + meetCount}
        </h2>

        <p>
          Completed purchases across the platform.
        </p>

      </div>

      <div className="summary-card">

        <span className="summary-label">
          Event Tickets
        </span>

        <h2>
          {ticketCount}
        </h2>

        <p>
          Confirmed ticket purchases.
        </p>

      </div>

      <div className="summary-card">

        <span className="summary-label">
          Meet & Greet
        </span>

        <h2>
          {meetCount}
        </h2>

        <p>
          Paid meet & greet bookings.
        </p>

      </div>

    </section>
  );
}