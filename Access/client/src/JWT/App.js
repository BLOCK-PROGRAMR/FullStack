import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Protected from './Protected';
import Home from './Home';
import Welcome from './Welcome';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        console.log("token", localStorage.getItem());
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-4 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <Link to="/" className="text-xl font-bold">
                            My App
                        </Link>
                        <nav>
                            <Link to="/" className="px-4 hover:text-gray-200">Home</Link>
                            {!isAuthenticated && (
                                <>
                                    <Link to="/login" className="px-4 hover:text-gray-200">Login</Link>
                                    <Link to="/register" className="px-4 hover:text-gray-200">Register</Link>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <Link to="/protected" className="px-4 hover:text-gray-200">Dashboard</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Routes */}
                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={<Login setIsAuthenticated={setIsAuthenticated} />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/protected"
                            element={isAuthenticated ? <Protected /> : <Navigate to="/login" />}
                        />
                        <Route path="/welcome" element={<Welcome />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="bg-blue-600 text-white py-4 text-center">
                    <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
