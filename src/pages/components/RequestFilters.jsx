import "../../styles/dashboard.css";
export default function RequestFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sort,
  setSort,
}) {
  return (
    <section className="request-filter">

      <div className="request-search">
        <input
          type="text"
          placeholder="Search user or celebrity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="request-filter-controls">

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="offered">Offered</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

      </div>

    </section>
  );
}