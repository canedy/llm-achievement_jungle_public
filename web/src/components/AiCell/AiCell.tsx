import type { FindAiQuery, FindAiQueryVariables } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useState } from "react";
import { Link, routes } from "@redwoodjs/router";

export const QUERY = gql`
  query GetAiQuery($prompt: String!) {
    ai: getAi(prompt: $prompt) {
      result
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps<FindAiQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({ai}: CellSuccessProps<FindAiQuery, FindAiQueryVariables>) => {
  const [messages, setMessages] = useState([])

  const newMessage = [...messages, JSON.parse(ai.result)]

  const obj = JSON.parse(ai.result);

  // setMessages((current) => ([...current, ai.result]))
  const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]
  
  return (
    <>
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
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Start Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      End Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Select</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {newMessage.map((person, v) => (
                    <tr key={v}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <Link
                          to={routes.keyResults()}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {person.description}<span className="sr-only">, {}</span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              In Progress
                            </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.startDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.endDate}</td>
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
    </>
  )
};
