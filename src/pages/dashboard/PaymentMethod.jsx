import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import PaymentMethodsCard from "../components/PaymentMethodsCard";
import CreatePaymentModal from "../components/CreatePaymentMethod";

export default function PaymentMethods() {

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [selectedMethod, setSelectedMethod] =
    useState(null);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "https://fan-platform-backend.onrender.com/api/v1/payment-methods",
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

      setPaymentMethods(
        data.paymentMethods || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleEdit = (method) => {

    setSelectedMethod(method);

    setShowCreateModal(true);

  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Delete this payment method?"
    );

    if (!confirmed) return;

    try {

      const res = await fetch(
        `https://fan-platform-backend.onrender.com/api/v1/payment-methods/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      fetchPaymentMethods();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  };

  const closeModal = () => {

    setShowCreateModal(false);

    setSelectedMethod(null);

  };

  return (

    <div className="payment-methods-page">

      <div className="page-header">

        <div>

          <h1>
            Payment Methods
          </h1>

          <p>
            Manage every payment destination
            available to customers.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={() => {

            setSelectedMethod(null);

            setShowCreateModal(true);

          }}
        >
          + Add Payment Method
        </button>

      </div>

      {loading ? (

        <div className="loading-state">
          Loading payment methods...
        </div>

      ) : paymentMethods.length === 0 ? (

        <div className="empty-state">

          <h2>
            No payment methods
          </h2>

          <p>
            Create your first payment
            destination.
          </p>

        </div>

      ) : (

        <div className="payment-methods-grid">

          {paymentMethods.map((method) => (

            <PaymentMethodsCard

              key={method._id}

              method={method}

              onEdit={handleEdit}

              onDelete={handleDelete}

            />

          ))}

        </div>

      )}

      <CreatePaymentModal

        open={showCreateModal}

        onClose={closeModal}

        method={selectedMethod}

        refreshMethods={fetchPaymentMethods}

      />

    </div>

  );

}