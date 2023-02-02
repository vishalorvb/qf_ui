import axios from "axios";
const BASE_URL = "http://10.11.12.240";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
