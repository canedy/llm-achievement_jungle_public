import React, { useState } from 'react';
import { Link, routes } from "@redwoodjs/router";
import { Form, InputField, Label, TextField, PasswordField, FieldError, Submit, ButtonField, } from '@redwoodjs/forms'
import { MetaTags } from "@redwoodjs/web";
import Chat from 'src/components/Chat/Chat'
import { ArrowRightIcon, ChatBubbleLeftRightIcon} from '@heroicons/react/20/solid'
import Heading from 'src/components/Heading/Heading';
import AiCell from 'src/components/AiCell'

const ChatConversationPage = () => {



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

  //   const [messages, setMessages] = useState([
  //     { sender: 'bot', content: 'Hello! How can I assist you today?' }
  // ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setInputValue(event.target.value);
  };

  const handleSend = () => {
      // if (inputValue.trim()) {
      //     setMessages([...messages, { sender: 'user', content: inputValue.trim() }]);
      //     setInputValue('');

      //     setTimeout(() => {
      //         setMessages([...messages, { sender: 'user', content: inputValue.trim() }, { sender: 'bot', content: 'Thank you for your message!' }]);
      //     }, 1000);
      // }
  };

  const [messages, setMessages] = useState("")

  const onSubmit = async (data) => {
    
    // setMessages((current) => ([...current, data.prompt]))
    setMessages(data.prompt)
    
  }

  return (
    <>
      <MetaTags title="Chat Conversation" description="Chat Conversation page" />


      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">AI Chat</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Let's talk about your MBOs and OKRs. We are here to help you.
          </p>
        </div>
      </div>


{/* Chat Content */}

<div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14">
<Form onSubmit={onSubmit}>

<InputField
  name="prompt"
  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 mb-6"
  errorClassName="input error"
  placeholder="What was your biggest accomplishment this week?"
  validation={{
    required: true,
  }}
/>

<Submit className="col-span-12 lg:col-span-2 w-full
rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
">Add Objective</Submit>

</Form>
</div>

  
      {/* Objective Prompts */}
      {/* <div className="flex justify-between my-4">
        {selectedPrompts.map((prompt) => (
          <div key={prompt.id} className="w-1/3 p-4 mx-6 bg-blue-500 rounded-md">
            <p className=" text-white">{prompt.text}</p>
          </div>
        ))}
      </div> */}



      {/* <div className="flex mt-2 pt-2">
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
      </div> */}

      <div className="overflow-y-auto h-auto border-b-2">
          {/* {messages.map((message, index) => (
              <div key={index} className={`my-2 ${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                  <span className={`px-3 py-2 rounded-lg inline-block ${message.sender === 'bot' ? 'bg-gray-300' : 'bg-blue-400 text-white'}`}>
                      {message.content}
                  </span>
              </div>
          ))} */}
      </div>
      
      <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Objective</h1>
          <p className="mt-2 text-sm text-gray-700">Enter a personal or business objective to accomplish your results.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Objective
          </button>
        </div>
      </div>
      <div className="space-y-4 mt-4">
        {/* <AiCell prompt="For FY24 starting in July, Attend a workshop on a dvanced data visualization. Right now I have the following 2 actions. 1. Register for the workshop 2. Prepare a list of questions for the workshop" /> */}
          <AiCell prompt={messages} />
      </div>
    </div>


    



      
    </>
  );
};

export default ChatConversationPage;
