import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000', // Backend base URL
});

// Add the token to request headers if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');//get token
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
