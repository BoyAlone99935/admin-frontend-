import "../../styles/dashboard.css";

export default function PaymentSummary({
  ticketCount,
  meetCount,
}) {
  return (
    <section className="payment-summary">

      <div className="payment-summary-card">

        <div className="summary-label">
          Pending Ticket Payments
        </div>

        <h2>{ticketCount}</h2>

        <p>
          Purchases awaiting manual verification.
        </p>

      </div>

      <div className="payment-summary-card">

        <div className="summary-label">
          Meet & Greet Payments
        </div>

        <h2>{meetCount}</h2>

        <p>
          Accepted offers waiting to be confirmed.
        </p>

      </div>

    </section>
  );
}