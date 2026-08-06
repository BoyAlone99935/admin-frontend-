import "../../styles/dashboard.css";
export default function PaymentMethodsCard({
  method,
  onEdit,
  onDelete,
}) {
  return (
    <div className="payment-method-card">

      <div className="payment-method-top">

        <div className="payment-provider">

          <img
            src={method.logo}
            alt={method.provider}
            className="payment-provider-logo"
          />

          <div>

            <h3>
              {method.provider}
            </h3>

            <span>
              {method.type}
            </span>

          </div>

        </div>

        <div
          className={
            method.active
              ? "payment-status active"
              : "payment-status inactive"
          }
        >
          {method.active
            ? "Active"
            : "Inactive"}
        </div>

      </div>

      <div className="payment-method-body">

        <div>

          <span>Account Name</span>

          <p>
            {method.accountName || "-"}
          </p>

        </div>

        <div>

          <span>Bank</span>

          <p>
            {method.bankName || "-"}
          </p>

        </div>

        <div>

          <span>Country</span>

          <p>
            {method.country || "-"}
          </p>

        </div>

        <div>

          <span>Currency</span>

          <p>
            {method.currency || "-"}
          </p>

        </div>

      </div>

      <div className="payment-method-footer">

        <button
          className="edit-payment-btn"
          onClick={() => onEdit(method)}
        >
          Edit
        </button>

        <button
          className="delete-payment-btn"
          onClick={() =>
            onDelete(method._id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
}