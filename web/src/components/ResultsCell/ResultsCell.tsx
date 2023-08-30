import type { ResultsQuery } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useState } from "react";
import { Link, routes } from "@redwoodjs/router";

export const QUERY = gql`
  query ResultsQuery {
    results {
      id
      goal_id
      description
      status
      due_date
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

export const Success = ({ results }: CellSuccessProps<ResultsQuery>) => {
  return (
    <>
      <div className="space-y-4 mt-4">

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>

                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Description
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
                      {results.map((result) => (
                        <tr key={result.id}>

                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <Link
                              to={routes.actions()}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {result.description}<span className="sr-only">, {}</span>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {result.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{result.due_date}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            View<span className="sr-only">, {}</span>
                          </a>
                          <span> | </span>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Edit<span className="sr-only">, {}</span>
                            </a>

                            <span> | </span>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Delete<span className="sr-only">, {}</span>
                            </a>
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
