import {Routes , Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

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
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/create-celebrity" element={<CreateCelebrity />} />
      <Route path="/admin/celebrity/:id" element={<Celebrity />} />
      <Route path="/admin/create-event/:id" element={<CreateEvent />} />
      <Route path="/admin/event/:id" element={<Event />} />
      <Route path="/admin/create-ticket/:id" element={<CreateTicket />} />
      <Route path="/admin/requests" element={<Requests/>} />
      <Route path="/admin/payments" element={<Payments/>} />
      <Route path="/admin/purchases" element={<Purchases/>} />
      <Route path="/admin/payment-method" element={<PaymentMethod/>} />
      <Route path="/admin/create-meet/:id" element={<CreateMeet/>} />
       <Route path="/admin/manage-meet/:id" element={<ManageMeet/>} />
    </Routes>
  )
}

export default App
