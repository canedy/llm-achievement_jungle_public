import type {
  FindGoalBigThreeQuery,
  FindGoalBigThreeQueryVariables,
  getAiBigThreeQuery,
} from "types/graphql";
import { type CellSuccessProps, type CellFailureProps, useQuery } from "@redwoodjs/web";

// import GoalBigThreeCell from ".";
import GoalBigThreeCellExt from "src/components/GoalBigThreeExtCell/";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const QUERY = gql`
  query FindGoalBigThreeQuery {
    goals: goals {
      id
      description
      results: results {
        id
        description
        actions: actions {
          id
          description
          note
        }
      }
    }
  }
`;

// const GET_AI_BIG_THREE = gql`
//   query getAiBigThreeQuery( $prompt: JSON! ) {
//     getAiBigThree: getAiBigThree(input: { prompt: $prompt }) {
//       result
//     }
//   }
// `;

export const Loading = () => (
  <>
    <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">Getting your current goals, results, and actions.</p>
          </div>
        </div>
      </div>
  </>

)

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindGoalBigThreeQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({ goals }: CellSuccessProps<FindGoalBigThreeQuery, FindGoalBigThreeQueryVariables>) => {
  // const xxx = JSON.stringify(goals);
  console.log(goals);

  // const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_AI_BIG_THREE, { variables: { prompt: goals }});
  
  // if (queryLoading) return <div>Loading...</div>;

  // if (queryError) return <div>Error: {queryError.message}</div>;

  // if (queryData) {
  // const { result } = queryData;
  // const data = JSON.parse(result);
  // const { goalsData } = data;
  
  // return <div>no data</div>;
  // }

 

  return (
  
    <>
    {/* <div>{JSON.stringify(goals)}</div> */}
    <GoalBigThreeCellExt prompt={JSON.stringify(goals)} />
        {/* <div className="p-5 bg-white shadow-lg rounded-md max-w-xl mx-auto">
            {goalsData.map((goal, idx) => (
                <div key={idx} className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{goal.description}</h2>
                    {goal.results.map((result, idx) => (
                        <div key={idx} className="ml-4 mb-3">
                            <h3 className="text-lg font-medium mb-1">{result.description}</h3>
                            <ul className="list-disc ml-5">
                                {result.actions.map((action, idx) => (
                                    <li key={idx}>{action.description}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div> */}
    </>
  )
};
