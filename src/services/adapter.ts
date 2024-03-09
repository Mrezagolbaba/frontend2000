import axios, { AxiosResponse, AxiosError, AxiosInstance } from "axios";

// Create and configure the Axios instance
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // You can add more default configurations here, like headers, timeouts, etc.
});
const accessTokenExpires =
  typeof window !== "undefined"
    ? window.localStorage.getItem("accessTokenExpires")
    : null;

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await axios.post("/refresh-token", {
        refreshToken: refreshToken,
      });
      const newAccessToken = response.data.access_token;
      // Update the access token in local storage
      localStorage.setItem("token", newAccessToken);
    } catch (error) {
      // Handle refresh token error (e.g., log out the user)
    }
  }
};
// Function to check if the access token has expired
const isTokenExpired = () => {
  const expirationDate = new Date(accessTokenExpires as string);
  const currentTime = new Date();
  return currentTime >= expirationDate;
};
// Optional: You can intercept requests or responses to handle common scenarios like authentication
request.interceptors.request.use(
  async (config: any) => {
    // Add your logic for request interception, e.g., adding authentication tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (!token || isTokenExpired()) {
      await refreshAccessToken();
      config.headers["Authorization"] =
        `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Add your logic for successful response interception
    return response;
  },
  async (error: AxiosError) => {
    // Handle response errors, e.g., displaying a notification for specific error status codes
    const { response } = error;

    if (response) {
      // Response received with an error status code
      const { status } = response;

      if (status === 401 || status === 500) {
        // Unauthorized or Internal Server Error
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        window.location.replace("/login");
      }

      // You can add more specific error handling logic here if needed
    }

    return Promise.reject(error);
  },
);

export default request;
