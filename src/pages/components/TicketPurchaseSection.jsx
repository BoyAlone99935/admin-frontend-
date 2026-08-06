import "../../styles/dashboard.css";

export default function TicketPurchaseSection({
  purchases,
}) {
  return (
    <section className="payment-section">

      <div className="payment-section-header">

        <div>

          <h2>
            Ticket Purchases
          </h2>

          <p>
            All completed ticket purchases.
          </p>

        </div>

        <span className="payment-count">
          {purchases.length}
        </span>

      </div>

      {purchases.length === 0 ? (

        <div className="payment-empty">
          No ticket purchases found.
        </div>

      ) : (

        <div className="payment-grid">

          {purchases.map((purchase) => {

            const ticket = purchase.tickets[0];

            return (

              <div
                className="ticket-payment-card"
                key={purchase.purchaseId}
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
                      {purchase.purchaseId}
                    </p>

                  </div>

                  <div className="payment-method">
                    {ticket.paymentType}
                  </div>

                </div>

                <div className="ticket-payment-body">

                  <div>

                    <span>Email</span>

                    <p>
                      {ticket.email}
                    </p>

                  </div>

                  <div>

                    <span>Amount</span>

                    <p>
                      ${ticket.amount}
                    </p>

                  </div>

                  <div>

                    <span>Tickets Purchased</span>

                    <p>
                      {purchase.tickets.length}
                    </p>

                  </div>

                  <div>

                    <span>Purchase Date</span>

                    <p>
                      {new Date(
                        ticket.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div>

                    <span>Payment Method</span>

                    <p>
                      {ticket.paymentType}
                    </p>

                  </div>

                  <div>

                    <span>Status</span>

                    <p>
                      {ticket.status}
                    </p>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </section>
  );
}