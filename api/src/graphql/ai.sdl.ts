export const schema = gql`
    type Ai {
        result: String
    }

type Query {
    getAi(prompt: String!): Ai @skipAuth
}

type Mutation {
    createAi(prompt: String!): Ai @skipAuth
}
`