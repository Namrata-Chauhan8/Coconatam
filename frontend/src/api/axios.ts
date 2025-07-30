import axios from "axios";

const apiClient = axios.create();

// No refreshToken function needed

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // No refresh logic, just reject
    return Promise.reject(error);
  }
);

export default apiClient;
