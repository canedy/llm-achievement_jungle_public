import { Link, routes, navigate, back  } from "@redwoodjs/router";
import { MetaTags,useQuery, useMutation  } from "@redwoodjs/web";

import { Form, FormError, TextField, DateField, SelectField, Submit, HiddenField  } from '@redwoodjs/forms'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

import { CreateResultMutation, CreateResultMutationVariables} from 'types/graphql'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_RESULT = gql`
  mutation CreateResultMutation($input: CreateResultInput!) {
    createResult(input: $input) {
      id
      goal_id
      description
      status
      due_date
    }
  }
`;

const ResultCreatePage = ({id, goalId}) => {
  
  const [createResult, { data, error }] = useMutation(CREATE_RESULT);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const onSave= async (input) => {

    delete input.id;
    if (input.goal_id) {
      input.goal_id = parseInt(input.goal_id);
    }
    // const { id, ...rest } = input;
    
    try {
      await createResult({ variables: { input } });
      toast.success('New result created!', {duration: 6000})   
      
      navigate(routes.results({id: goalId}), { replace: true });
    } catch (err) {
      console.error("Error updating result:", err);
    }
  }

// const pages = [
//   { name: 'Goals', to: routes.goals(), current: false},
//   { name: 'Results', to: { back(), current: true }
// ]

  return (
    <>
      <MetaTags title="ResultEdit" description="Resultdit page" />
      <Toaster />

      {/* <nav className="flex pb-8" aria-label="Breadcrumb">

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
        </nav> */}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black bg-gray-100 ring-opacity-5 sm:rounded-lg">

              <div>
                <div className="border-gray-900/10 pb-12">
          
                  <Form onSubmit={onSave}>
                    <FormError
                      error={error}
                      wrapperClassName="bg-red-100 text-red-900 text-sm font-bold p-3 mb-4 rounded-md"
                      titleClassName="font-bold"
                      listClassName="mt-2 list-disc list-inside"
                    />              

                    <HiddenField name="goal_id" defaultValue={parseInt(goalId)} />
                    
                    <div className="p-4">
                      <label 
                        htmlFor="description" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Description:
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <TextField 
                          name="description" 
                          id="description"
                          className="w-full p-2 border rounded shadow-sm focus:ring focus:ring-opacity-50"
                          validation={{ required: true }}
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <label 
                        htmlFor="status" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Status:
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <SelectField 
                          name="status"
                          id="status"
                          className="block w-full p-2 border rounded shadow-sm focus:ring focus:ring-opacity-50 bg-transparent outline-none"
                        >
                          <option value="" disabled hidden>Select Status</option>
                          <option value="NotStarted">Not Started</option>
                          <option value="InProgress">In Progress</option>
                          <option value="Complete">Complete</option>
                        </SelectField>
                      </div>
                    </div>

                    <div className="p-4">
                    <label 
                        htmlFor="due_date" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Due Date:
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <DateField 
                          name="due_date"
                          id="due_date"
                          className="block w-full p-3 border rounded shadow-sm focus:ring focus:ring-opacity-50 bg-transparent outline-none"
                          validation={{ required: true }}
                        />
                      </div>
                    </div>                    



                    <div className="mt-6 mx-6 flex items-center justify-end gap-x-6">
                      <button 
                        type="button" 
                        className="text-lg font-semibold leading-6 text-gray-900"
                        onClick={() => { back() }}
                      >
                        Cancel
                      </button>
                      <Submit 
                        className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </Submit>
                    </div>

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ResultCreatePage;
