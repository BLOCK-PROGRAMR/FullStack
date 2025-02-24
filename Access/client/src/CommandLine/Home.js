import React, { useState } from "react";

const Home = ({ setCommand }) => {
    const [input, setInput] = useState("");

    const handleCommand = (e) => {
        if (e.key === "Enter") {
            setCommand(input);
            setInput("");
        }
    };

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to My CLI Website</h1>
            <p>Type a command: <code>resume</code>, <code>profile</code>, etc.</p>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="mt-4 px-2 py-1 bg-gray-800 border border-gray-700 rounded focus:outline-none"
                placeholder="Type your command here..."
            />
        </div>
    );
};

export default Home;
