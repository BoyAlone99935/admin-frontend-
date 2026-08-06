import Navigation from "../components/Navigation";
import StatCard from "../components/StatCard";
import {useState} from "react";
import getCelebrities from "../Api";
import { useEffect } from "react";
import api from "../Api";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [search , setSearch] = useState("");
  const [celebrities, setCelebrities] = useState([]);
  const { setCount, count } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
  const fetchCelebrities = async () => {
    try {
      const res = await api.get("https://fan-platform-backend.onrender.com/api/celebrities");
      console.log("Fetched celebrities:", res.data);
      setCelebrities(res.data.celebrities || []);
      setCount(res.data.count || 0);
    } catch (error) {
      console.error("Error fetching celebrities:", error);
    }
  };

  fetchCelebrities();
}, []);

  return (
    <div>
      <Navigation />
      <StatCard />  

      <div className="celebrities-section">
        <input
          placeholder="Search celebrities..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="celebrities-container">
          {celebrities
            .filter((celebrity) =>
              celebrity.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((celebrity) => (
              <div key={celebrity._id} className="celebrity-card" onClick={() => navigate(`/admin/celebrity/${celebrity._id}`)}>
                <img src={celebrity.profileImage} alt={celebrity.name} />
                <h3>{celebrity.name}</h3>
                <p>{celebrity.category}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}