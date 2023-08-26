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
      <MetaTags title="Dashboard" description="Dashboard Page" />

      <h2 className="className text-2xl md:text-4xl font-bold text-center mb-4">Empower Your Path to Excellence</h2>
      <p className="text-center text-gray-500 text-sm md:text-base">Platform that helps you achieve your goals and become the best version of yourself.</p>
    </>
  );
};

export default DashboardPage;
