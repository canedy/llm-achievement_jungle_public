import React, { Fragment, useRef, useState } from 'react';
import { Link, routes } from "@redwoodjs/router";
import { Form, InputField, Label, TextField, PasswordField, FieldError, Submit, ButtonField, } from '@redwoodjs/forms'
import { MetaTags } from "@redwoodjs/web";
import { ChevronRightIcon, HomeIcon} from '@heroicons/react/20/solid'
import GoalsCell from 'src/components/GoalsCell'
import { Dialog, Transition } from '@headlessui/react'

const GoalsPage = () => {

  const [open, setOpen] = useState(false)

  const pages = [
    { name: 'Goals', to: routes.goals(), current: true }
  ]

  const [messages, setMessages] = useState("")

  const onSubmit = async (data) => {
    setMessages(data.prompt)
    setOpen(false)
  }

  const addObjective = () => {
     const cancelButtonRef = useRef(null)
    return (
      <>
        <div className="display flex">

          <button
            type="button"
            className="block mr-5 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpen(true)}
          >
              Create Goal with AI
          </button>

          <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Create Manual Goal
          </button>

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
                          placeholder="What is your objective?"
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
                      </div>
                      
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </>    
    )
  }

  return (
    <>
      <MetaTags title="Goals" description="Goals page" />
      
      <div className="px-4 sm:px-6 lg:px-8">
      

        <nav className="flex pb-8" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
              <Link 
                  to={routes.dashboard()} className="text-gray-400 hover:text-gray-500">
                  <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </Link>
              </div>
            </li>
            {pages.map((page) => (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <Link
                    key={page.name} 
                    to={page.to}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {page.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
    
       {addObjective()}

       <GoalsCell />
      </div>   
    </>
  );
};

export default GoalsPage;
