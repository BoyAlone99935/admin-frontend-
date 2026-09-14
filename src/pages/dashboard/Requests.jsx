import { useEffect, useState } from "react";
import RequestFilters from "../components/RequestFilters";
import RequestCard from "../components/RequestCard";
import RequestDrawer from "../components/RequestDrawer";
import "../../styles/dashboard.css";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://fan-platform-backend.onrender.com/api/v1/booking/getAllRequests",
        {
            headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setRequests(data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRequest = (request) => {
    setSelectedRequest(request);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRequest(null);
  };

  const filteredRequests = requests
    .filter((request) => {
      const matchesStatus =
        statusFilter === "all" ||
        request.status === statusFilter;

      const matchesSearch =
        request.user?.username
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        request.celebrity?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

  const pendingCount = requests.filter(
    (r) => r.status === "pending"
  ).length;

  const offeredCount = requests.filter(
    (r) => r.status === "offered"
  ).length;

  return (
    <div className="requests-page">

      <div className="requests-header">

        <div>
          <h1>Meet & Greet Requests</h1>

          <p>
            Review fan requests, send offers,
            and manage approvals.
          </p>
        </div>

        <div className="requests-summary">

          <div className="summary-card">
            <span>Total</span>
            <h2>{requests.length}</h2>
          </div>

          <div className="summary-card">
            <span>Pending</span>
            <h2>{pendingCount}</h2>
          </div>

          <div className="summary-card">
            <span>Offered</span>
            <h2>{offeredCount}</h2>
          </div>

        </div>

      </div>

      <RequestFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="loading-state">
          Loading requests...
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="empty-state">
          <h2>No requests found</h2>

          <p>
            Try changing the filters or wait
            for new fan requests.
          </p>
        </div>
      ) : (
        <div className="requests-grid">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onOpen={handleOpenRequest}
            />
          ))}
        </div>
      )}

      <RequestDrawer
        open={drawerOpen}
        request={selectedRequest}
        onClose={handleCloseDrawer}
        refreshRequests={fetchRequests}
      />

    </div>
  );
}