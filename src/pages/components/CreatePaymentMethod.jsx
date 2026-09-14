import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

const initialFormData = {
  provider: "",
  type: "bank",
  accountName: "",
  bankName: "",
  accountNumber: "",
  iban: "",
  swiftCode: "",
  routingNumber: "",
  sortCode: "",
  transitNumber: "",
  institutionNumber: "",
  bsb: "",
  email: "",
  phoneNumber: "",
  country: "",
  currency: "USD",
  instructions: "",
  active: true,
};

export default function CreatePaymentModal({
  open,
  onClose,
  method,
  refreshMethods,
}) {

  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);

  const [formData, setFormData] =
    useState(initialFormData);

  useEffect(() => {

    if (method) {

      setFormData({
        provider: method.provider || "",
        type: method.type || "bank",
        accountName: method.accountName || "",
        bankName: method.bankName || "",
        accountNumber: method.accountNumber || "",
        iban: method.iban || "",
        swiftCode: method.swiftCode || "",
        routingNumber: method.routingNumber || "",
        sortCode: method.sortCode || "",
        transitNumber: method.transitNumber || "",
        institutionNumber:
          method.institutionNumber || "",
        bsb: method.bsb || "",
        email: method.email || "",
        phoneNumber:
          method.phoneNumber || "",
        country: method.country || "",
        currency:
          method.currency || "USD",
        instructions:
          method.instructions || "",
        active: method.active ?? true,
      });

    } else {

      setFormData(initialFormData);

      setLogo(null);

    }

  }, [method, open]);

  if (!open) return null;

  const handleClose = () => {

    setFormData(initialFormData);

    setLogo(null);

    onClose();

  };

  const handleChange = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const body = new FormData();

      Object.entries(formData).forEach(
        ([key, value]) =>
          body.append(key, value)
      );

      if (logo) {
        body.append("logo", logo);
      }

      const url = method
        ? `https://fan-platform-backend.onrender.com/api/v1/payment-methods/${method._id}`
        : "https://fan-platform-backend.onrender.com/api/v1/payment-methods/create";

      const res = await fetch(url, {
        method: method ? "PATCH" : "POST",
          headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
},
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      refreshMethods();

      handleClose();

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="modal-overlay">

      <div className="payment-modal">

        <div className="payment-modal-header">

          <div>

            <h2>

              {method
                ? "Edit Payment Method"
                : "Create Payment Method"}

            </h2>

            <p>

              Configure where users should
              send manual payments.

            </p>

          </div>

          <button
            className="drawer-close"
            onClick={handleClose}
          >
            ✕
          </button>

        </div>

        <form
          className="payment-modal-body"
          onSubmit={handleSubmit}
        >

          <label>
            Provider
            <input
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Payment Type
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="bank">Bank</option>
              <option value="money_transfer">
                Money Transfer
              </option>
              <option value="digital_wallet">
                Digital Wallet
              </option>
            </select>
          </label>

          <label>
            Logo
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setLogo(e.target.files[0])
              }
            />
          </label>

          <label>
            Country
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </label>

          <label>
            Currency
            <input
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            />
          </label>

          <label>
            Account Name
            <input
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
            />
          </label>

          <label>
            Bank Name
            <input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
          </label>

          <label>
            Account Number
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </label>

          <label>
            IBAN
            <input
              name="iban"
              value={formData.iban}
              onChange={handleChange}
            />
          </label>

          <label>
            SWIFT Code
            <input
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleChange}
            />
          </label>

          <label>
            Routing Number
            <input
              name="routingNumber"
              value={formData.routingNumber}
              onChange={handleChange}
            />
          </label>

          <label>
            Sort Code
            <input
              name="sortCode"
              value={formData.sortCode}
              onChange={handleChange}
            />
          </label>

          <label>
            Transit Number
            <input
              name="transitNumber"
              value={formData.transitNumber}
              onChange={handleChange}
            />
          </label>

          <label>
            Institution Number
            <input
              name="institutionNumber"
              value={formData.institutionNumber}
              onChange={handleChange}
            />
          </label>

          <label>
            BSB
            <input
              name="bsb"
              value={formData.bsb}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone Number
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>

          <label className="full-width">
            Instructions
            <textarea
              rows="5"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
            />
          </label>

          <label className="full-width active-toggle">

            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />

            Active Payment Method

          </label>

          <div className="payment-modal-footer full-width">

            <button
              type="button"
              className="modal-cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : method
                ? "Update Method"
                : "Create Method"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}