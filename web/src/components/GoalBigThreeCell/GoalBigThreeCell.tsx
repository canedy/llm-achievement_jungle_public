import type {
  FindGoalBigThreeQuery,
  FindGoalBigThreeQueryVariables,
} from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

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

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindGoalBigThreeQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({ goals }: CellSuccessProps<FindGoalBigThreeQuery, FindGoalBigThreeQueryVariables>) => {
  return <div>{JSON.stringify(goals)}</div>;
};
