import { GoalQuery } from "types/graphql";
import { CellSuccessProps, CellFailureProps, useMutation } from "@redwoodjs/web";
import { useEffect, useState } from "react";
import { Link, Redirect, navigate, routes } from "@redwoodjs/router";
import { toast, Toaster } from '@redwoodjs/web/toast'
import { DeleteResultMutation, DeleteResultMutationVariables } from 'types/graphql'

export const QUERY = gql`
  query GoalQuery($id: Int!) {
    goal: goal(id: $id) {
      id
      description,
      result: result {
        id
        description
        status
        due_date
      }
    }
  }
`;

const DELETE_AI_RESULT = gql`
  mutation DeleteResultMutation($id: Int!) {
    deleteResult: deleteResult(id: $id) {
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

export const Success = ({ goal }: CellSuccessProps<GoalQuery>) => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(goal.result);
  }, [goal.result]);
  
  const getStatusClasses = (status: string) => {
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
  
  const getReadableStatus = (status: string) => statusMapping[status] || status;
  
  const [deleteResult , { loading, error }] = useMutation<DeleteResultMutation, DeleteResultMutationVariables>(
    DELETE_AI_RESULT, {
      onCompleted: () => {
        toast.success('Result deleted!', {duration: 6000})       
      }
    }
  )

  // const onDelete = async (id) => {
  //   deleteResult({ variables: { id: id } })
  // }

  const onDelete = async (id) => {
    await deleteResult({ variables: { id: id } });
    setResults(prevResults => prevResults.filter(res => res.id !== id));
  } 

  return (
    <>
      <Toaster />
    
      <div className="my-8">
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Goal</h2>
        <span className="text-2xl text-gray-600 font-semibold">{goal.description}</span>
      </div>

      <div className="space-y-4 mt-4">

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>

                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Results
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Due Date
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      
                      {results.map((res) => (
                        <tr key={res.id}>

                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <Link
                              to={routes.actions({id: res.id})}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {res.description}<span className="sr-only">, {}</span>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusClasses(res.status).background} ${getStatusClasses(res.status).text} ring-1 ring-inset ${getStatusClasses(res.status).ring}`}>
                            {getReadableStatus(res.status)}
                          </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{res.due_date}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link 
                              to={routes.resultEdit({id: res.id, goalId: goal.id})}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                          </Link>

                            <span> | </span>
                            {/* <Link 
                              to={routes.results({id: goal.id})} 
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => onDelete(res.id)}
                            >
                              Delete
                            </Link> */}
                            <button
                              type="button"
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => onDelete(res.id)}
                            >
                                Delete
                            </button>
                          </td>
                          </tr>
                   
                      ))}
                    </tbody>
                  </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
