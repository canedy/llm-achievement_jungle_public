import React, { Fragment, useRef, useState } from 'react';
import { GoalsQuery } from "types/graphql";

import { CellSuccessProps, CellFailureProps, useMutation } from "@redwoodjs/web";
import { Form, FieldError, FormError, InputField, Label, TextField, DateField,  PasswordField, SelectField, Submit, ButtonField, set, } from '@redwoodjs/forms'
import { Link, routes } from "@redwoodjs/router";
import { toast, Toaster } from '@redwoodjs/web/toast'
import { DeleteGoalMutation, DeleteGoalMutationVariables } from 'types/graphql'
import { Dialog, Transition } from '@headlessui/react'



export const QUERY = gql`
  query GoalsQuery {
    goals {
      id
      type
      description
      status
      start_date
      end_date   
    }
  }
`;

const DELETE_AI_GOAL = gql`
  mutation DeleteGoalMutation($id: Int!) {
    deleteGoal: deleteGoal(id: $id) {
      id
    }
  }
`;

export const Loading = () => (
  <div className="flex justify-center items-center m-44">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <style>
      {`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({ goals}: CellSuccessProps<GoalsQuery>) => {
  const [messages, setMessages] = useState([])
  const [open, setOpen] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const cancelButtonRef = useRef(null)

  const getStatusClasses = (status) => {
    switch (status) {
      case "NotStarted":
        return {
          background: "bg-gray-200",
          text: "text-gray-600",
          ring: "ring-gray-400",
        };
      case "InProgress":
        return {
          background: "bg-indigo-600", 
          text: "text-white",
          ring: "ring-blue-500", 
        };
      case "Complete":
        return {
          background: "bg-green-300",
          text: "text-green-800",
          ring: "ring-green-400",
        };
      default:
        return {};
    }
  };

  const statusMapping = {
    "NotStarted": "Not Started",
    "InProgress": "In Progress",
    "Complete": "Complete"
  };
  
  const getReadableStatus = (status) => statusMapping[status] || status;
  
  const [deleteGoal , { loading, error }] = useMutation<DeleteGoalMutation, DeleteGoalMutationVariables>(
    DELETE_AI_GOAL, {
      onCompleted: () => {
        toast.success('Goal deleted!', {duration: 6000})
      },
      refetchQueries: [{ query: QUERY}]
    }
  )

  const onDelete = async (id: number) => {
    deleteGoal({ variables: { id: id } })
  }

  // const onSave= async (data: { prompt: string; }) => {
  //   console.log(data) 
  //   setOpen(false)
  // }

  // const onSave = async (data: { description: string; status: string; type: string; start_date: string; end_date: string; }) => {
  //   console.log(data)
  //   setOpen(false)
  // }
  

  

//   const editGoal = (id: number) => {
    
//     // retrieve data using the id, e.g., someDataArray.find(item => item.id === id)
//     // const dataToEdit =  goal.findUnique({
//     //   where: { id },
//     // });
//     // setCurrentData(dataToEdit)
    
//    return (
//      <>
//        <div className="display flex">

//                   <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

//                           <Link 
//                               to={routes.goals()} 
//                               className="text-indigo-600 hover:text-indigo-900"
//                               onClick={() => setOpen(true)}
//                             >
//                               Edit
//                           </Link>

//                             <span> | </span>
                            
//                             <Link 
//                               to={routes.goals()} 
//                               className="text-indigo-600 hover:text-indigo-900"
//                               onClick={() => onDelete(id)}
//                             >
//                               Delete
//                             </Link>
                            
//                           </td>

//          <Transition.Root show={open} as={Fragment}>
//            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
//              <Transition.Child
//                as={Fragment}
//                enter="ease-out duration-300"
//                enterFrom="opacity-0"
//                enterTo="opacity-100"
//                leave="ease-in duration-200"
//                leaveFrom="opacity-100"
//                leaveTo="opacity-0"
//              >
//                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//              </Transition.Child>

//              <div className="fixed inset-0 z-10 overflow-y-auto">
//                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                  <Transition.Child
//                    as={Fragment}
//                    enter="ease-out duration-300"
//                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                    enterTo="opacity-100 translate-y-0 sm:scale-100"
//                    leave="ease-in duration-200"
//                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                  >
//                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                      <div>
//                        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 text-xl">
//                          Let me know your goal. Adding a deadline and the results you looking to achieve will help me to create a plan for you.
//                        </div> */}

//                        <div className="border-gray-900/10 pb-12">
                 
//                          <Form onSubmit={onSave} config={{ mode: 'onBlur' }} error={error}>
//                            <FormError error={error} wrapperClassName="form-error" />

//                             <div className="p-4">
//                               <label 
//                                 htmlFor="description" 
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                               >
//                                 Description:
//                               </label>
//                               <div className="mt-1 relative rounded-md shadow-sm">
//                                 <TextField 
//                                   name="description" 
//                                   id="description"
//                                   // value = {currentData.description}
//                                   className="w-full p-2 border rounded shadow-sm focus:ring focus:ring-opacity-50"
//                                   validation={{ required: true }}
//                                 />
//                               </div>
//                             </div>


//                             <div className="p-4">
//                               <label 
//                                 htmlFor="status" 
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                               >
//                                 Status:
//                               </label>
//                               <div className="mt-1 relative rounded-md shadow-sm">
//                                 <SelectField 
//                                   name="status"
//                                   id="status"
//                                   // value = {currentData.status}
//                                   className="block w-full p-2 border rounded shadow-sm focus:ring focus:ring-opacity-50 bg-transparent outline-none"
//                                   defaultValue=""
//                                 >
//                                   <option value="" disabled hidden>Select Type</option>
//                                   <option value="option1">NotStarted</option>
//                                   <option value="option2">InProgress</option>
//                                   <option value="option3">Complete</option>
//                                 </SelectField>
//                               </div>
//                             </div>

//                             <div className="p-4">
//                               <label 
//                                 htmlFor="status" 
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                               >
//                                 Status:
//                               </label>
//                               <div className="mt-1 relative rounded-md shadow-sm">
//                                 <SelectField 
//                                   name="status"
//                                   id="status"
//                                   // value = {currentData.status}
//                                   className="block w-full p-2 border rounded shadow-sm focus:ring focus:ring-opacity-50 bg-transparent outline-none"
//                                   defaultValue=""
//                                 >
//                                   <option value="" disabled hidden>Select Status</option>
//                                   <option value="Personal">Personal</option>
//                                   <option value="Professional">Professional</option>
//                                   <option value="Physical">Physical</option>
//                                   <option value="Mental_Health">Mental Health</option>
//                                   <option value="Financial">Financial</option>
//                                   <option value="relationships">Relationships</option>
//                                   <option value="Spiritual">Spiritual</option>
//                                   <option value="Social">Social</option>
//                                   <option value="Other">Other</option>
//                                 </SelectField>
//                               </div>
//                             </div>



//                             <div className="p-4">
//                             <label 
//                                 htmlFor="startDate" 
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                               >
//                                 Start Date:
//                               </label>
//                               <div className="mt-1 relative rounded-md shadow-sm">
//                                 <DateField 
//                                   name="startDate"
//                                   id="startDate"
//                                   // value = {currentData.start_date}
//                                   className="block w-full p-3 border rounded shadow-sm focus:ring focus:ring-opacity-50 bg-transparent outline-none"
//                                   validation={{ required: true }}
//                                 />
//                               </div>
//                             </div>

//                             <div className="p-4">
//                             <label 
//                                 htmlFor="startDate" 
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                               >
//                                 End Date:
//                               </label>
//                               <div className="mt-1 relative rounded-md shadow-sm">
//                                 <DateField 
//                                   name="startDate"
//                                   id="startDate"
//                                   // value = {currentData.start_date}
//                                   className="block w-full p-3 border rounded shadow-sm focus:ring focus:ring-opacity-50 bg-transparent outline-none"
//                                   validation={{ required: true }}
//                                 />
//                               </div>
//                             </div>                    

//                             <div className="mt-6 flex items-center justify-end gap-x-6">
//                               <button 
//                                 type="button" 
//                                 className="text-sm font-semibold leading-6 text-gray-900"
//                                 onClick={() => {
//                                   // Handle your cancel logic here.
//                                   console.log('Cancelled');
//                                 }}
//                               >
//                                 Cancel
//                               </button>
//                               <Submit 
//                                 className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                               >
//                                 Save
//                               </Submit>
//                             </div>
                            

//                            {/* <TextField
//                              name="username"
//                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                              errorClassName="error"
//                              placeholder="janesmith"
//                              validation={{
//                                required: true,
//                              }}
//                            />
//                            <FieldError name="username" className="error my-11" />

//                            <Submit className="col-span-12 lg:col-span-2 w-full
//                            rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold
//                            text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
//                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
//                            ">Add Goal</Submit> */}

//                          </Form>
//                        </div>
//                      </div>
                     
//                    </Dialog.Panel>
//                  </Transition.Child>
//                </div>
//              </div>
//            </Dialog>
//          </Transition.Root>
//        </div>
//      </>    
//    )
//  }
  
  return (
    <>
      <Toaster />
      
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type of Goal
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Start Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      End Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Controls</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {goals.map((goal) => (
                    <tr key={goal.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <Link
                          to={routes.results({id: goal.id})}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {goal.description}<span className="sr-only">, {}</span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{goal.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusClasses(goal.status).background} ${getStatusClasses(goal.status).text} ring-1 ring-inset ${getStatusClasses(goal.status).ring}`}>
                        {getReadableStatus(goal.status)}
                      </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{goal.start_date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{goal.end_date}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                          <Link 
                              to={routes.goalEdit({id: goal.id})}                              
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                          </Link>

                            <span> | </span>
                            
                            <Link 
                              to={routes.goals()} 
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => onDelete(goal.id)}
                            >
                              Delete
                            </Link>
                            
                          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* {editGoal(18)} */}
    </>
  )
};
