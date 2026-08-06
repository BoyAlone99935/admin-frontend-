import "../../styles/dashboard.css";

export default function PurchaseFilters({
  search,
  setSearch,
}) {
  return (
    <section className="purchase-filter">

      <div className="purchase-search">

        <input
          type="text"
          placeholder="Search by email, username, event or celebrity..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

    </section>
  );
}