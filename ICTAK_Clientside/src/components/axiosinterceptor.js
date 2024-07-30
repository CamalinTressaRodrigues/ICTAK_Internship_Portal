import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ictak-internship-portal-server.vercel.app',
  // baseURL: 'http://localhost:3000',
});

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
