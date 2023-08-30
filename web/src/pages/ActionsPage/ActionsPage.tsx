import { Fragment, useRef, useState } from 'react';
import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";


import { Form, InputField, Label, TextField, PasswordField, FieldError, Submit, ButtonField, } from '@redwoodjs/forms'

import Chat from 'src/components/Chat/Chat'
import { CheckIcon, ArrowRightIcon, ChatBubbleLeftRightIcon,  ChevronLeftIcon, ChevronRightIcon, HomeIcon} from '@heroicons/react/20/solid'
import Heading from 'src/components/Heading/Heading';
import AiCell from 'src/components/AiCell'
import ActionsCell from 'src/components/ActionsCell'
import { Dialog, Transition } from '@headlessui/react'

const ActionsPage = () => {
  const pages = [
    { name: 'Goals', href: '#', current: false },
    { name: 'Results', href: '#', current: true },
    { name: 'Actions', href: '#', current: true },
  ]

  const [messages, setMessages] = useState("")
  const [open, setOpen] = useState(false)

  const onSubmit = async (data) => {
    // setMessages((current) => ([...current, data.prompt]))
    setMessages(data.prompt)
    setOpen(false)
  }

  const addKeyResult = () => {
    // const [showModal, setShowModal] = useState(false);

    const cancelButtonRef = useRef(null)

  
      
  
      return (
        <>
          <div className="display flex">
  
  
  
            <button
              type="button"
              className="block mr-5 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"        
            >
              Create Action with AI
            </button>
  
            <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                
                onClick={() => setOpen(true)}
              >
                Create Manual Action
            </button>
  
              {/* {showModal && ( */}
              <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
  
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                          <div>
                            {/* Chat Content */}
  
                            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14">
                            <Form onSubmit={onSubmit}>
  
                            <InputField
                              name="prompt"
                              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 mb-6"
                              errorClassName="input error"
                              placeholder="What is your Key Results?"
                              validation={{
                                required: true,
                              }}
                            />
  
                            <Submit className="col-span-12 lg:col-span-2 w-full
                            rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
                            text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                            ">Add Key Results</Submit>
  
                            </Form>
                            </div>
                          </div>
                          {/* <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                              onClick={() => setOpen(false)}
                            >
                              Deactivate
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div> */}
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            {/* )} */}
          </div>
        </>    
      )
    }
      
    return (
      <>
        <MetaTags title="KeyResults" description="KeyResults page" />
  
  
  
        <div className="px-4 sm:px-6 lg:px-8">
  
  
        {/* <div>
        <div>
          <nav className="sm:hidden" aria-label="Back">
            <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Back
            </a>
          </nav>
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                    Objectives
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Goals
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <a href="#" aria-current="page" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Back End Developer
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Goals
            </h2>
            
            <p className="text-lg text-gray-700">Create personal or business goals to meet your objective.</p>
          </div>
          <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Generate AI Goal
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Generate Manual Goal
            </button>
          </div>
        </div>
      </div> */}
  
  
  
        <nav className="flex pb-8" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <a
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
  
      <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</h2>
          <span className="text-2xl text-gray-600 font-semibold">Write and submit a research proposal on a topic related to Artificial Intelligence or Machine Learning</span>
        </div>
          
        {/* <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
          
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">Goals</h1>
            <p className="mt-2 text-lg text-gray-700">Create personal or business goals to meet your objective.</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
  
            
            {addKeyResult()}
          </div>
        </div> */}
  
        {addKeyResult()}
  
        <ActionsCell />
      </div>
  
      </>
    );
};

export default ActionsPage;
