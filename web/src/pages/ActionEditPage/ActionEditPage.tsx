import { Link, routes, navigate, back  } from "@redwoodjs/router";
import { MetaTags,useQuery, useMutation  } from "@redwoodjs/web";

import { Form, FormError, TextField, DateField, SelectField, Submit, HiddenField, TextAreaField  } from '@redwoodjs/forms'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

import { GetActionQuery, UpdateActionMutation, UpdateActionMutationVariables} from 'types/graphql'

const GET_ACTION = gql`
query GetActionQuery($id: Int!) {
  action(id: $id) {
    id
    result_id
    description
    note
    status
    date_achieved
  }
}
`;

const UPDATE_ACTION = gql`
  mutation UpdateActionMutation($id: Int!, $input: UpdateActionInput!) {
    updateAction(id: $id, input: $input) {
      id
      result_id
      description
      note
      status
      date_achieved
    }
  }
`;

const ActionEditPage = ({id, resultId}) => {
    const { data, loading, error } = useQuery(GET_ACTION, { variables: { id } });
    const [updateAction, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_ACTION);

    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    
    const onSave= async (input) => {
      const { id, ...rest } = input;
      console.log("input", { ...input });
      
      try {
        await updateAction({ variables: { id: parseInt(id), input: rest } });
        navigate(routes.actions({id: resultId}));
      } catch (err) {
        console.error("Error updating Action:", err);
      }
  }

  console.log(resultId)

  const pages = [
    { name: 'Goals', to: routes.goals(), current: false},
    { name: 'Actions', to: routes.actions({id: resultId}), current: true }
    
  ]

  return (
    <>
      <MetaTags title="ActionEdit" description="ActionEdit page" />

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

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black bg-gray-100 ring-opacity-5 sm:rounded-lg">

              <div>
                <div className="border-gray-900/10 pb-12">
          
                  <Form onSubmit={onSave}>
                    <FormError
                      error={mutationError || mutationData?.updateAction?.errors}
                    />     

                    <HiddenField name="id" defaultValue={data.action.id} />                  

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
                          defaultValue={data.action.description}
                          className="w-full p-2 border rounded shadow-sm focus:ring focus:ring-opacity-50"
                          validation={{ required: true }}
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <label 
                        htmlFor="note" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Notes:
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <TextAreaField 
                          name="note" 
                          id="note"
                          defaultValue={data.action.note}
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
                          defaultValue = {data.action.status}
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
                        htmlFor="date_achieved" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Date Achieved:
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <DateField 
                          name="date_achieved"
                          id="date_achieved"
                          defaultValue = {data?.action?.date_achieved ? new Date(data.action.date_achieved).toISOString().slice(0, 10) : ""}
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

export default ActionEditPage;
