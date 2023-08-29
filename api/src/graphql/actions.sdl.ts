export const schema = gql`
  type Action {
    action_id: Int!
    result_id: Int
    name: String!
    description: String!
    notes: String
    status: Status!
    date_achieved: DateTime
    created_at: DateTime!
    updated_at: DateTime!
    result: Result
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
    action_id: Int!
    result_id: Int
    name: String!
    description: String!
    notes: String
    status: Status!
    date_achieved: DateTime
    created_at: DateTime!
    updated_at: DateTime!
  }

  input UpdateActionInput {
    action_id: Int
    result_id: Int
    name: String
    description: String
    notes: String
    status: Status
    date_achieved: DateTime
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createAction(input: CreateActionInput!): Action! @requireAuth
    updateAction(id: Int!, input: UpdateActionInput!): Action! @requireAuth
    deleteAction(id: Int!): Action! @requireAuth
  }
`;
