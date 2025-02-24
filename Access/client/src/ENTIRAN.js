// // frontend/src/App.jsx
// import { useState } from 'react';

// const ENTIRAN = () => {
//     const [input, setInput] = useState('');
//     const [response, setResponse] = useState('');
//     const [loading, setLoading] = useState(false);

//     const sendMessage = async () => {
//         if (!input) return;
//         setLoading(true);
//         setResponse('Loading...');

//         try {
//             const res = await fetch('http://localhost:5000/api/chat', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ message: input }),
//             });
//             const data = await res.json();
//             console.log("data", data);
//             setResponse(data.response || 'No response received.');
//         } catch (error) {
//             setResponse('Error: ' + error.message);
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col items-center mt-10 p-5">
//             <h2 className="text-2xl font-bold mb-4">Free ChatBot</h2>
//             <input
//                 type="text"
//                 className="p-2 border rounded w-80"
//                 placeholder="Enter your question"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//             />
//             <button
//                 className="bg-green-500 text-white px-4 py-2 mt-3 rounded"
//                 onClick={sendMessage}
//                 disabled={loading}
//             >
//                 {loading ? 'Loading...' : 'Ask!'}
//             </button>
//             <div className="mt-4 p-3 border w-80 bg-gray-100">{response}</div>
//         </div>
//     );
// }

// export default ENTIRAN;



import { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const ENTIRAN = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, { type: 'bot', content: data.response || 'No response received.' }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', content: `Error: ${error.message}` }]);
        }
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 p-4 flex items-center gap-2">
                    <Bot className="text-white h-6 w-6" />
                    <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
                </div>

                {/* Chat Container */}
                <div className="h-[600px] flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-8">
                                <Bot className="h-12 w-12 mx-auto mb-2 text-indigo-600" />
                                <p>Start a conversation with the AI Assistant!</p>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-2.5 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
                                    }`}>
                                    {message.type === 'user' ?
                                        <User className="h-5 w-5 text-indigo-600" /> :
                                        <Bot className="h-5 w-5 text-gray-600" />
                                    }
                                </div>
                                <div className={`max-w-[80%] rounded-lg p-3 ${message.type === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                                    }`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Bot className="h-5 w-5 text-gray-600" />
                                </div>
                                <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
                                    <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                            <button
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${loading || !input.trim()
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Send className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Press Enter to send, Shift + Enter for new line
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ENTIRAN;