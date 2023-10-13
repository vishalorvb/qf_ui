import axios from "axios";
// import { baseUrl } from "../Environment";
const BASE_URL = "10.11.12.243:8083";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
