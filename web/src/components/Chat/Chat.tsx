import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', content: 'Hello! How can I assist you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { sender: 'user', content: inputValue.trim() }]);
            setInputValue('');

            setTimeout(() => {
                setMessages([...messages, { sender: 'user', content: inputValue.trim() }, { sender: 'bot', content: 'Thank you for your message!' }]);
            }, 1000);
        }
    };

    return (
        <div className="p-4 bg-gray-100 h-screen">
            <div className="max-w-lg mx-auto bg-white p-4 rounded-xl shadow-md">
                {/* Objective Prompts */}
                <div className="mb-2 bg-gray-200 p-2 rounded-t-md">
                    <h2 className="font-semibold text-sm">Objective Prompts:</h2>
                    <p className="text-sm mt-1">Remember to discuss your MBOs, achievements, and progress!</p>
                </div>
                {/* Chat Content */}
                <div className="overflow-y-auto h-64 border-b-2">
                    {messages.map((message, index) => (
                        <div key={index} className={`my-2 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                            <span className={`px-3 py-2 rounded-lg inline-block ${message.sender === 'bot' ? 'bg-gray-300' : 'bg-blue-400 text-white'}`}>
                                {message.content}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <input
                        className="w-4/5 p-2 border rounded-l-md"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button
                        className="w-1/5 bg-blue-500 text-white p-2 rounded-r-md"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
