import { useState } from "react";
import "../../styles/dashboard.css";

export default function TicketPaymentSection({
  payments,
  refreshPayments,
}) {
  const [confirmingPurchase, setConfirmingPurchase] = useState(null);

  const handleConfirmPayment = async (purchaseId) => {
    try {
      setConfirmingPurchase(purchaseId);

      const res = await fetch(
        "https://fan-platform-backend.onrender.com/api/v1/tickets/confirm",
        {
          method: "PATCH",
            headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
          body: JSON.stringify({
            purchaseId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      refreshPayments();

    } catch (error) {

      console.error(error);
      alert(error.message);

    } finally {

      setConfirmingPurchase(null);

    }
  };

  return (
    <section className="payment-section">

      <div className="payment-section-header">

        <div>

          <h2>Ticket Payments</h2>

          <p>
            Pending ticket purchases awaiting
            manual verification.
          </p>

        </div>

        <span className="payment-count">
          {payments.length}
        </span>

      </div>

      {payments.length === 0 ? (

        <div className="payment-empty">
          No pending ticket payments.
        </div>

      ) : (

        <div className="payment-grid">

          {payments.map((payment) => {

            const ticket = payment.tickets[0];

            return (

              <div
                className="ticket-payment-card"
                key={payment.purchaseId}
              >

                <div className="ticket-payment-top">

                  <div>

                    <h3>
                      {ticket.title}
                    </h3>

                    <span>
                      Purchase ID
                    </span>

                    <p>
                      {payment.purchaseId}
                    </p>

                  </div>

                  <div className="payment-method">
                    {ticket.paymentType}
                  </div>

                </div>

                <div className="ticket-payment-body">

                  <div>

                    <span>Email</span>

                    <p>{ticket.email}</p>

                  </div>

                  <div>

                    <span>Amount</span>

                    <p>${ticket.amount}</p>

                  </div>

                  <div>

                    <span>Tickets</span>

                    <p>{payment.tickets.length}</p>

                  </div>

                  <div>

                    <span>Date</span>

                    <p>
                      {new Date(
                        ticket.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <button
                  className="confirm-payment-btn"
                  disabled={
                    confirmingPurchase === payment.purchaseId
                  }
                  onClick={() =>
                    handleConfirmPayment(
                      payment.purchaseId
                    )
                  }
                >
                  {confirmingPurchase === payment.purchaseId
                    ? "Confirming..."
                    : "Confirm Payment"}
                </button>

              </div>

            );

          })}

        </div>

      )}

    </section>
  );
}