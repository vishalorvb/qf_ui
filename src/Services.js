import axios from "axios";

const api = axios.create({
  baseURL: "http://10.11.12.243:8083", // Set your API base URL
  headers: {
    "Content-Type": "application/json",
    // You can set your JWT token here if available
    // 'Authorization': `Bearer ${yourJWTToken}`,
  },
});

// Add a response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP error codes (e.g., 401 Unauthorized)
      if (error.response.status === 401) {
        // Handle unauthorized access here (e.g., logout user)
      }

      // Handle other HTTP error codes as needed
    } else if (error.request) {
      // Handle network request errors (e.g., server not reachable)
    } else {
      // Handle other errors (e.g., request setup issues)
    }

    // Return a Promise with the error to propagate it to the calling component
    return Promise.reject(error);
  }
);

// Define API endpoint functions
export const apiEndpoints = {
  // Example API endpoint with a GET request and query parameters
  getUsers: (queryParams) => api.get("/users", { params: queryParams }),

  // Example API endpoint with a POST request and request data
  createUser: (userData) => api.post("/users", userData),

  // Add more API endpoints here...
};

export default api;
