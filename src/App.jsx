import {Routes , Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Spinner from "./Spinner";
import CreateCelebrity from "./pages/dashboard/CreateCelebrity";
import Celebrity from "./pages/dashboard/Celebrity";
import CreateEvent from "./pages/dashboard/CreateEvent";
import Event from "./pages/dashboard/Event";
import CreateTicket from "./pages/dashboard/CreateTicket";
import Requests from "./pages/dashboard/Requests";
import Payments from "./pages/dashboard/Payments";
import Purchases from "./pages/dashboard/Purchases";
import PaymentMethod from "./pages/dashboard/PaymentMethod";
import CreateMeet from "./pages/components/CreateMeet";
import ManageMeet from "./pages/dashboard/ManageMeet";
import '../src/App.css'
function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return  <Spinner/>;
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/create-celebrity" element={<ProtectedRoute><CreateCelebrity /></ProtectedRoute>} />
      <Route path="/admin/celebrity/:id" element={<ProtectedRoute><Celebrity /></ProtectedRoute>} />
      <Route path="/admin/create-event/:id" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
      <Route path="/admin/event/:id" element={<ProtectedRoute><Event /></ProtectedRoute>} />
      <Route path="/admin/create-ticket/:id" element={<ProtectedRoute><CreateTicket /></ProtectedRoute>} />
      <Route path="/admin/requests" element={<ProtectedRoute><Requests/></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute><Payments/></ProtectedRoute>} />
      <Route path="/admin/purchases" element={<ProtectedRoute><Purchases/></ProtectedRoute>} />
      <Route path="/admin/payment-method" element={<ProtectedRoute><PaymentMethod/></ProtectedRoute>} />
      <Route path="/admin/create-meet/:id" element={<ProtectedRoute><CreateMeet/></ProtectedRoute>} />
       <Route path="/admin/manage-meet/:id" element={<ProtectedRoute><ManageMeet/></ProtectedRoute>} />
    </Routes>
  )
}

export default App
