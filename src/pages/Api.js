import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: "https://fan-platform-backend.onrender.com/api",
  withCredentials: true,
});

// AUTHENTICATION API CALLS 
export const loginAdmin = (data) => {
  return api.post("/auth/login", data);
};


export const getCelebrities = () => {
  return api.get("/celebrities");
}




export default api;