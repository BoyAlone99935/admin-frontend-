import "../../styles/dashboard.css";

export default function MeetPurchaseSection({
  requests,
}) {
  return (
    <section className="payment-section">

      <div className="payment-section-header">

        <div>

          <h2>
            Meet & Greet Purchases
          </h2>

          <p>
            All completed meet & greet bookings.
          </p>

        </div>

        <span className="payment-count">
          {requests.length}
        </span>

      </div>

      {requests.length === 0 ? (

        <div className="payment-empty">
          No meet & greet purchases found.
        </div>

      ) : (

        <div className="payment-grid">

          {requests.map((request) => (

            <div
              className="ticket-payment-card"
              key={request._id}
            >

              <div className="ticket-payment-top">

                <div>

                  <h3>
                    {request.user?.username}
                  </h3>

                  <span>
                    {request.celebrity?.name}
                  </span>

                </div>

                <div className="payment-method">
                  Meet & Greet
                </div>

              </div>

              <div className="ticket-payment-body">

                <div>

                  <span>Email</span>

                  <p>
                    {request.user?.email}
                  </p>

                </div>

                <div>

                  <span>Amount Paid</span>

                  <p>
                    ${request.offer?.price}
                  </p>

                </div>

                <div>

                  <span>Meeting Date</span>

                  <p>

                    {
                      request.offer?.date
                        ? new Date(
                            request.offer.date
                          ).toLocaleDateString()
                        : "Not Set"
                    }

                  </p>

                </div>

                <div>

                  <span>Location</span>

                  <p>

                    {request.offer?.location?.city},{" "}
                    {request.offer?.location?.country}

                  </p>

                </div>

                <div>

                  <span>Purchased On</span>

                  <p>

                    {new Date(
                      request.updatedAt
                    ).toLocaleDateString()}

                  </p>

                </div>

                <div>

                  <span>Status</span>

                  <p>
                    Paid
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}