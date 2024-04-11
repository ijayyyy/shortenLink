import axios from "axios";
import { handleRefreshToken } from "./authServices";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: "https://scissor-app-jdpp.onrender.com/api"
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the access token from local storage
    let accessToken = localStorage.getItem("accessToken");

    // Set the authorization header with the access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response directly if successful
    return response;
  },
  async (error) => {
    // Check if the error status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the tokens
        await handleRefreshToken();

        // Retry the original request
        return axios(error.config);
      } catch (refreshError) {
        // Handle token refresh error
        console.error("Error refreshing token:", refreshError);
        // Optionally, redirect the user to the login page or display an error message
        // For example:
        // window.location.href = "/login"; // Redirect to login page
        // Or display a notification to the user
        // alert("Session expired. Please log in again.");
      }
    }

    // For other errors, return the original error
    return Promise.reject(error);
  }
);
export default axiosInstance;
