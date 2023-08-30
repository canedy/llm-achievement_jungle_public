export const schema = gql`
  type Result {
    id: Int!
    goal_id: Int!
    description: String!
    status: Status!
    due_date: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    actions: [Action]!
    goal: Goal!
  }

  enum Status {
    NotStarted
    InProgress
    Complete
  }

  type Query {
    results: [Result!]! @requireAuth
    result(id: Int!): Result @requireAuth
  }

  input CreateResultInput {
    goal_id: Int!
    description: String!
    status: Status!
    due_date: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
  }

  input UpdateResultInput {
    goal_id: Int
    description: String
    status: Status
    due_date: DateTime
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createResult(input: CreateResultInput!): Result! @requireAuth
    updateResult(id: Int!, input: UpdateResultInput!): Result! @requireAuth
    deleteResult(id: Int!): Result! @requireAuth
  }
`;
