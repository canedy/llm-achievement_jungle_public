import React, { useState } from 'react';
import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import Chat from 'src/components/Chat/Chat'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const DashboardPage = () => {
  // Define an array of prompt objects
  const prompts = [
    { id: 1, text: "What was your biggest accomplishment this week?" },
    { id: 2, text: "What did you learn today?" },
    { id: 3, text: "What are you most proud of?" },
    { id: 4, text: "What challenges did you overcome this month?" },
    { id: 5, text: "What are your goals for the next 3 months?" },
  ];

  // Select 3 random prompts from the array
  const selectedPrompts = prompts
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

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
    
    <>
      {/* Objective Prompts */}
      {/* <div className="mb-2 bg-gray-200 p-2 rounded-t-md">
          <h2 className="font-semibold text-sm">Objective Prompts:</h2>
          <p className="text-sm mt-1">Remember to discuss your MBOs, achievements, and progress!</p>
      </div> */}
      {/* Chat Content */}
      <div className="overflow-y-auto h-auto border-b-2">
          {messages.map((message, index) => (
              <div key={index} className={`my-2 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                  <span className={`px-3 py-2 rounded-lg inline-block ${message.sender === 'bot' ? 'bg-gray-300' : 'bg-blue-400 text-white'}`}>
                      {message.content}
                  </span>
              </div>
          ))}
      </div>
      
      {/* Objective Prompts */}
      <div className="flex justify-between mt-4">
        {selectedPrompts.map((prompt) => (
          <div key={prompt.id} className="w-1/3 p-4 mx-6 bg-blue-500 rounded-md">
            <p className=" text-white">{prompt.text}</p>
          </div>
        ))}
      </div>

      {/* Chat Content */}
      <div className="flex mt-2 border-t pt-2">
          <input
              className="flex-grow p-2 border-t border-b border-l rounded-l-md"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
          />
          <button
              className="flex-shrink bg-blue-500 text-white p-2 border-t border-b border-r rounded-r-md"
              onClick={handleSend}
          >
              <ArrowRightIcon className="w-6 h-6" />
          </button>
      </div>
    </>
  );
};

export default DashboardPage;
