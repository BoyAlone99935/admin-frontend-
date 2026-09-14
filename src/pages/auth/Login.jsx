import "../../styles/Login.css";
import { loginAdmin } from "../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
export default function Login() {
  const { setLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();




  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("🚀 Submit clicked");

  setLoading(true);

  try {
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);

    console.log("1️⃣ About to call loginAdmin...");

    const response = await loginAdmin({
      email,
      password,
    });

    console.log("2️⃣ Returned from loginAdmin");
    console.log("✅ Response:", response);
    console.log("✅ Response Data:", response.data);

    localStorage.setItem("adminToken", response.data.token);

    console.log("3️⃣ About to navigate...");
    navigate("/admin/dashboard");
    console.log("4️⃣ Navigate called");

  } catch (err) {
    console.error("❌ LOGIN FAILED");

    console.error("Full Error:", err);
    console.error("Message:", err.message);
    console.error("Response:", err.response);
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);

  } finally {
    console.log("🏁 Finished");
    setLoading(false);
  }
};

  return (

    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">
          Sign in to access the admin dashboard.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

