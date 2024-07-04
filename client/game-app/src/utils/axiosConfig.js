import axios from 'axios';

/**
 * Create an instance of axios with a base URL
 * set to the environment variable VITE_API_URL.
 * This instance is used to make HTTP requests.
 */
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

/**
 * Add a request interceptor to the axios instance.
 * This interceptor checks if there is a token
 * stored in the local storage. If there is, it
 * adds the token to the authorization header of
 * each request.
 */
instance.interceptors.request.use(
    (config) => {
        // Check if there is a token in the local storage
        const token = localStorage.getItem('token');
        if (token) {
            // Add the token to the authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // If there is an error, reject the promise with the error
    (error) => Promise.reject(error)
);

// Export the axios instance
export default instance;
