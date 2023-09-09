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

export const Success = ({ goals }: CellSuccessProps<GoalsQuery>) => {
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

    </>
  )
};
