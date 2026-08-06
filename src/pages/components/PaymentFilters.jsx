import "../../styles/dashboard.css";

export default function PaymentFilters({
  search,
  setSearch,
}) {
  return (
    <section className="payment-filters">

      <div className="payment-search">

        <input
          type="text"
          placeholder="Search by user, email, celebrity or event..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

    </section>
  );
}