import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

import type {
  getAiBigThreeQuery,
  getAiBigThreeQueryVariables
} from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}
const clients = [
  {
    id: 1,
    name: 'Tuple',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const QUERY = gql`
  query getAiBigThreeQuery( $prompt: JSON! ) {
    getAiBigThree: getAiBigThree(input: { prompt: $prompt }) {
      result
    }
  }
`;


export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<getAiBigThreeQuery>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({ getAiBigThree }: CellSuccessProps<getAiBigThreeQuery, getAiBigThreeQueryVariables>) => {

  const { result } = getAiBigThree;
  const data = JSON.parse(result);
  const { goals } = data;

  return (
  
    <>

      <h2 className=" text-5xl text-gray-900 mb-8">Focus Points</h2>

      {goals.map((goal, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden mb-5">
              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">{goal.description}</h3>
              </div>
              <div className="p-5 bg-gray-100">
                  {goal.results.map((result, resultIdx) => (
                      <div key={resultIdx} className="mb-3">
                          <h4 className="text-lg font-medium mb-1">{result.description}</h4>
                          <ul className="list-disc ml-5">
                              {result.actions.map((action, actionIdx) => (
                                  <li key={actionIdx} className="ml-5">{action.description}</li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>
      ))}

    </>
  )
};
