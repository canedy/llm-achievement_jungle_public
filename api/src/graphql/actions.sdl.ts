export const schema = gql`
  type Action {
    id: Int!
    result_id: Int
    description: String!
    note: String
    status: Status!
    date_achieved: DateTime
    created_at: DateTime!
    updated_at: DateTime!
    results: Result
  }

  enum Status {
    NotStarted
    InProgress
    Complete
  }

  type Query {
    actions: [Action!]! @requireAuth
    action(id: Int!): Action @requireAuth
  }

  input CreateActionInput {
    result_id: Int
    description: String!
    note: String
    status: Status!
    date_achieved: DateTime
  }

  input UpdateActionInput {
    result_id: Int
    description: String
    note: String
    status: Status
    date_achieved: DateTime
  }

  type Mutation {
    createAction(input: CreateActionInput!): Action! @requireAuth
    updateAction(id: Int!, input: UpdateActionInput!): Action! @requireAuth
    deleteAction(id: Int!): Action! @requireAuth
  }
`;
