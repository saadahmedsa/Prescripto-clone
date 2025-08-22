import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials : "true" // your backend API base URL
});


export default api