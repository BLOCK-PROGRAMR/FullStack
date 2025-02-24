import React, { useState, useEffect } from 'react';

const ExamPage = () => {
    const [answers, setAnswers] = useState(["", ""]);
    const [cheating, setCheating] = useState(false);
    const [showAdminPrompt, setShowAdminPrompt] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(180);

    // Handle answer change
    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // Start exam timer and handle auto-submit on timer expiry
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAutoSubmit();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer
    }, []);

    // Handle auto-submit answers when the timer expires
    const handleAutoSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/app/submit-answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });
            if (response.ok) {
                alert("Time is up! Answers auto-submitted.");
            } else {
                alert("Failed to auto-submit answers.");
            }
        } catch (error) {
            console.error("Error auto-submitting answers:", error);
        }
    };

    // Handle Submit Answers
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/app/submit-answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });
            if (response.ok) {
                alert("Answers submitted!");
            } else {
                alert("Failed to submit answers.");
            }
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    // Detect tab change (cheating detection)
    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.hidden) {
                setCheating(true);
                setShowAdminPrompt(true);

                // Log cheating action
                try {
                    const response = await fetch('http://localhost:5000/app/log-cheating', {
                        method: 'POST',
                    });
                    if (!response.ok) {
                        console.error("Failed to log cheating.");
                    }
                } catch (error) {
                    console.error("Error logging cheating:", error);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Verify Admin Password
    const handlePasswordSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/app/verify-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: adminPassword }),
            });
            const data = await response.json();
            if (data.success) {
                setShowAdminPrompt(false);
                setErrorMessage('');
                setCheating(false);
            } else {
                setErrorMessage('Incorrect password. Try again.');
            }
        } catch (error) {
            console.error("Error verifying password:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Online Exam</h1>

                <p className="text-center text-red-500 font-bold mb-4">
                    Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                </p>

                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Question 1: Explain MERN Stack</label>
                    <textarea
                        value={answers[0]}
                        onChange={(e) => handleAnswerChange(0, e.target.value)}
                        disabled={cheating}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="4"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Question 2: What is React?</label>
                    <textarea
                        value={answers[1]}
                        onChange={(e) => handleAnswerChange(1, e.target.value)}
                        disabled={cheating}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="4"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={cheating}
                    className={`w-full py-2 px-4 rounded-lg font-bold text-white ${cheating ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    Submit Answers
                </button>

                {showAdminPrompt && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                            <h2 className="text-xl font-bold mb-2">Admin Authorization Required</h2>
                            <p className="mb-4">Enter the admin password to continue:</p>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handlePasswordSubmit}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700"
                            >
                                Submit
                            </button>
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamPage;
