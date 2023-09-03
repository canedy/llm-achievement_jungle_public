import React, { Fragment, useRef, useState } from 'react';
import { Link, routes } from "@redwoodjs/router";
import { Form, FieldError, FormError, InputField, Label, TextField, PasswordField, Submit, ButtonField, } from '@redwoodjs/forms'
import { MetaTags, useMutation } from "@redwoodjs/web";
import { ChevronRightIcon, HomeIcon} from '@heroicons/react/20/solid'
import GoalsCell from 'src/components/GoalsCell'
import { Dialog, Transition } from '@headlessui/react'
import AiCell from 'src/components/AiCell';
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
  CreateAiMutation,
  CreateAiMutationVariables
} from 'types/graphql'

const CREATE_AI_GOAL = gql`
  mutation CreateAiMutation($prompt: String!) {
    createAi: createAi(prompt: $prompt) {
      result
    }
  }
`;

const GoalsPage = () => {

  const [open, setOpen] = useState(false)

  const pages = [
    { name: 'Goals', to: routes.goals(), current: true }
  ]

  const [messages, setMessages] = useState("")

  const [create, { loading, error }] = useMutation<CreateAiMutation, CreateAiMutationVariables>(
    CREATE_AI_GOAL, {
      onCompleted: () => {
        toast.success('Thank you for your submission!', {duration: 6000})
      }
    }
  )

  const onSubmit = async (data: { prompt: string; }) => {
    create({ variables: { prompt: data.prompt } })
    setOpen(false)
  }

  const addGoal = () => {
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

          <Link 
            to={routes.goalCreate()}                              
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Create Manual Goal
          </Link>


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
                        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 text-xl">
                          Let me know your goal. Adding a deadline and the results you looking to achieve will help me to create a plan for you.
                        </div>

                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                          <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }} error={error}>
                            <FormError error={error} wrapperClassName="form-error" />

                            <TextField
                              name="prompt"
                              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 mb-6"
                              errorClassName="error"
                              placeholder="Add your goal prompt"
                              validation={{
                                required: true,
                              }}
                            />
                            <FieldError name="prompt" className="error my-11" />

                            <Submit className="col-span-12 lg:col-span-2 w-full
                            rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
                            text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                            ">Add Goal</Submit>

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
      
        <Toaster />
        
        {loading && toast('Whipping up your custom plan. Brace yourself for some goal-setting magic! Notification incoming when done!',
         { icon: '🚀', duration: 8000,})
        }
        
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
   
       {addGoal()}

       <GoalsCell />

      </div>   
    </>
  );
};

export default GoalsPage;
