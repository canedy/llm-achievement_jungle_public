export const schema = gql`
    type AiResult {
        result: String
    }

    input AiResultInput {
        prompt: JSON!
    }

    type Query {
        getAiBigThree(input: AiResultInput): AiResult @skipAuth
    }
`