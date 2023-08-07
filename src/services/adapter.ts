import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Replace with your base API URL
const API_BASE_URL = 'https://dev-api.arsonex.market/v1/';
const API_BASE_DEV_URL = 'http://localhost:3000/v1/';

// Create and configure the Axios instance
const request = axios.create({
  baseURL: API_BASE_URL,
  // You can add more default configurations here, like headers, timeouts, etc.
});

// Optional: You can intercept requests or responses to handle common scenarios like authentication
request.interceptors.request.use(
  (config: any) => {
    // Add your logic for request interception, e.g., adding authentication tokens
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Add your logic for successful response interception
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors, e.g., displaying a notification for specific error status codes
    return Promise.reject(error);
  }
);

export default request;
