export const schema = gql`
    type AiResult {
        result: String
    }

    input CreateAiResultInput {
        prompt: String!
        goalId: Int!
        goalContent: String!
    }

type Mutation {
    createAiResult(input: CreateAiResultInput): AiResult! @skipAuth
}
`