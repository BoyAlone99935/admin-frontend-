import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you’ll clear cookie via backend call
    navigate("/login");
  };

  return (
    <div className="admin-nav">
      <div className="nav-left">
        <NavLink to="/admin/dashboard" end className="nav-item">
          Celebrities
        </NavLink>

        <NavLink to="/admin/requests" className="nav-item">
          Requests
        </NavLink>

        <NavLink to="/admin/payments" className="nav-item">
          Payments
        </NavLink>

        <NavLink to="/admin/purchases" className="nav-item">
          Purchases
        </NavLink>


        <NavLink to="/admin/payment-method" className="nav-item">
          Payment Methods
        </NavLink>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminNav;