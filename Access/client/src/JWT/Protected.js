import React, { useEffect, useState } from 'react';
import API from './API';

const Protected = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await API.get('/protected');
                setMessage(response.data.message);
            } catch (err) {
                console.error(err);
                setMessage('Access denied');
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            ) : (
                <h1 className="text-xl font-bold text-center text-gray-800">{message}</h1>
            )}
        </div>
    );
};

export default Protected;
