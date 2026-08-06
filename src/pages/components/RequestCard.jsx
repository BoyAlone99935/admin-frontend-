import "../../styles/dashboard.css";

export default function RequestCard({
  request,
  onOpen,
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";

      case "offered":
        return "status-offered";

      case "accepted":
        return "status-accepted";

      case "rejected":
        return "status-rejected";

      case "expired":
        return "status-expired";

      default:
        return "";
    }
  };

  const truncate = (text, length = 80) => {
    if (!text) return "No message provided.";

    return text.length > length
      ? text.slice(0, length) + "..."
      : text;
  };

  return (
    <div className="request-card">

      <div className="request-card-top">

        <div className="request-celeb">

          <h3>
            {request.celebrity?.name}
          </h3>

          <span>
            Meet & Greet Request
          </span>

        </div>

        <span
          className={`request-status ${getStatusClass(
            request.status
          )}`}
        >
          {request.status}
        </span>

      </div>

      <div className="request-user">

        <h4>
          {request.user?.username}
        </h4>

        <p>
          {request.preferredLocation?.city},{" "}
          {request.preferredLocation?.country}
        </p>

      </div>

      <p className="request-preview">
        {truncate(request.message)}
      </p>

      <button
        className="view-request-btn"
        onClick={() => onOpen(request)}
      >
        View Request
      </button>

    </div>
  );
}