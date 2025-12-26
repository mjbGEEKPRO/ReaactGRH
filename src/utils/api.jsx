import axios from "axios";
console.log("arriver");

const api = axios.create({
  baseURL: window.location.origin,
  //baseURL: "http://localhost",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});
export default api;
