import type { CreateAiMutation, FindAiQueryVariables } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useState } from "react";
import { Link, routes } from "@redwoodjs/router";

export const MUTATION = gql`
  mutation CreateAiMutation($prompt: String!) {
    createAi: createAi(prompt: $prompt) {
      result
    }
  }
`;

// export const QUERY = gql`
//   query GetAiQuery($prompt: String!) {
//     ai: getAi(prompt: $prompt) {
//       result
//     }
//   }
// `;

export const Loading = () => {
  console.log("loading")

  return (
    <div>Loading...</div>
  );
};


export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps<FindAiQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({createAi}: CellSuccessProps<CreateAiMutation, FindAiQueryVariables>) => {
  const [messages, setMessages] = useState([])

  const newMessage = [...messages, JSON.parse(createAi.result)]

  const obj = JSON.parse(createAi.result);

  // setMessages((current) => ([...current, ai.result]))
  const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]
  
  return (
    <>
      console.log(createAi.result)
    </>
  )
};
