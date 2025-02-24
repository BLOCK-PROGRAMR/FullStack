import React, { useState } from 'react';
import { BrowserRouter as Navigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("fomadata", formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate login logic
        localStorage.setItem('token', 'dummy-token');
        setIsAuthenticated(true);
        <Navigate to="/welcome" />
    };

    return (
        <div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
