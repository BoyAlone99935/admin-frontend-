import OfferSection from "../dashboard/OfferSection";
import "../../styles/dashboard.css";

export default function RequestDrawer({
  open,
  request,
  onClose,
  refreshRequests,
}) {

  if (!open || !request) return null;
  console.log(request)

  return (

    <div className="drawer-overlay">

      <div className="request-drawer">


        {/* HEADER */}

        <div className="drawer-header">

          <div>

            <h2>
              Meet & Greet Request
            </h2>

            <p>
              Review request details and prepare an offer.
            </p>

          </div>


          <button
            className="drawer-close"
            onClick={onClose}
          >
            ✕
          </button>


        </div>



        {/* BODY */}

        <div className="drawer-body">


          {/* REQUEST INFORMATION */}

          <section className="drawer-section">

            <h3>
              Request Information
            </h3>


            <div className="drawer-grid">


              <div className="drawer-field">

                <label>
                  Celebrity
                </label>

                <span>
                  {request.celebrity?.name}
                </span>

              </div>



              <div className="drawer-field">

                <label>
                  Requested By
                </label>

                <span>
                  {request.user?.username}
                </span>

              </div>



              <div className="drawer-field">

                <label>
                  Email
                </label>

                <span>
                  {request.user?.email}
                </span>

              </div>



              <div className="drawer-field">

                <label>
                  Status
                </label>

                <span className="drawer-status">
                  {request.status}
                </span>

              </div>



              <div className="drawer-field">

                <label>
                  Preferred Location
                </label>

                <span>
                  {request.preferredLocation?.city},{" "}
                  {request.preferredLocation?.country}
                </span>

              </div>



              <div className="drawer-field">

                <label>
                  Preferred Date
                </label>

                <span>

                  {
                    request.preferredDate
                    ?
                    new Date(
                      request.preferredDate
                    ).toLocaleDateString()
                    :
                    "Not provided"
                  }

                </span>

              </div>


            </div>



            <div className="drawer-message">

              <label>
                Fan Message
              </label>


              <p>
                {
                  request.message ||
                  "No message provided."
                }
              </p>


            </div>


          </section>




          {/* OFFER SECTION */}

          <section className="drawer-section">


            <h3>
              Create Offer
            </h3>


            <OfferSection
              request={request}
              onClose={onClose}
              refreshRequests={refreshRequests}
            />


          </section>



        </div>


      </div>


    </div>

  );
}