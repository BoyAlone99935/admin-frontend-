import { useState } from "react";
import "../../styles/dashboard.css";

export default function MeetPaymentSection({
  requests,
  refreshPayments,
}) {
  const [confirmingRequest, setConfirmingRequest] = useState(null);

  const handleConfirmPayment = async (id) => {
    try {
      setConfirmingRequest(id);

      const res = await fetch(
        `https://fan-platform-backend.onrender.com/api/v1/booking/update-payment/${id}`,
        {
          method: "PATCH",
            headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
},
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

      setConfirmingRequest(null);

    }
  };

  return (
    <section className="payment-section">

      <div className="payment-section-header">

        <div>

          <h2>
            Meet & Greet Payments
          </h2>

          <p>
            Accepted meet & greet offers awaiting
            payment verification.
          </p>

        </div>

        <span className="payment-count">
          {requests.length}
        </span>

      </div>

      {requests.length === 0 ? (

        <div className="payment-empty">
          No pending meet & greet payments.
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
                    Requested Celebrity
                  </span>

                  <p>
                    {request.celebrity?.name}
                  </p>

                </div>

                <div className="payment-method">
                  Meet & Greet
                </div>

              </div>

              <div className="ticket-payment-body">

                <div>
                  <span>Email</span>
                  <p>{request.user?.email}</p>
                </div>

                <div>
                  <span>Offer Price</span>
                  <p>${request.offer?.price}</p>
                </div>

                <div>
                  <span>Meeting Date</span>
                  <p>
                    {request.offer?.date
                      ? new Date(
                          request.offer.date
                        ).toLocaleDateString()
                      : "Not Set"}
                  </p>
                </div>

                <div>
                  <span>Location</span>
                  <p>
                    {request.offer?.location?.city},{" "}
                    {request.offer?.location?.country}
                  </p>
                </div>

              </div>

              <button
                className="confirm-payment-btn"
                disabled={confirmingRequest === request._id}
                onClick={() =>
                  handleConfirmPayment(request._id)
                }
              >
                {confirmingRequest === request._id
                  ? "Confirming..."
                  : "Confirm Payment"}
              </button>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}