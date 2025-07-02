import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_FRONTEND_BASE_URI, // Replace with your backend's base URL
    withCredentials: true, // Include credentials (cookies) in requests
    headers: {
        'Accept': 'application/json', // Set default accept header for responses
        'Access-Control-Allow-Credentials': 'true', // Allow credentials in CORS requests
        // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmJlNjhiMDE2NTVmZTY2NGM3ZmIzYSIsIm5hbWUiOiJBeW8gQm9sYWppIiwiaWF0IjoxNzUwNjQzNzE1LCJleHAiOjE3NTA3MzAxMTV9.98kOyouorqbTzTXxS3WVSFrueZm_mV4YtCvWQLB6PmI ` // This will be set dynamically in the interceptor
        // Note: The token will be dynamically set in the request interceptor
    },
});
// Add a request interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (token) {
            req.headers = {
                ...req.headers, // Preserve existing headers
                Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            } // Add the token to the Authorization header
        }
        // console.log('Request headers:', req.headers); // Debug log
        return req;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

export default axiosInstance;