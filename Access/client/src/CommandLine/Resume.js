import React from "react";

const Resume = () => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">My Resume</h1>
            <p>Click the link below to view or download my resume:</p>
            <a
                href="https://drive.google.com/file/d/15gKXS-iNAU68rloA8FtCQe1q5ZujVBdN/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-4 block"
            >
                View My Resume
            </a>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
                Back to Home
            </button>
        </div>
    );
};

export default Resume;
