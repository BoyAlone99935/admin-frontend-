import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const  protectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ wait until auth check is done
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🚫 not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in → allow access
  return children;
};

export default protectedRoute;