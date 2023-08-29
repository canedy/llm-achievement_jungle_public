export const schema = gql`
  type Goal {
    goal_id: Int!
    user_id: Int!
    type: ObjectiveType!
    description: String!
    status: Status!
    start_date: DateTime!
    end_date: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    result: [Result]!
  }

  enum ObjectiveType {
    Company
    Development
    Training
    Networking
    Personal
  }

  enum Status {
    NotStarted
    InProgress
    Complete
  }

  type Query {
    goals: [Goal!]! @requireAuth
    goal(id: Int!): Goal @requireAuth
  }

  input CreateGoalInput {
    goal_id: Int!
    user_id: Int!
    type: ObjectiveType!
    description: String!
    status: Status!
    start_date: DateTime!
    end_date: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
  }

  input UpdateGoalInput {
    goal_id: Int
    user_id: Int
    type: ObjectiveType
    description: String
    status: Status
    start_date: DateTime
    end_date: DateTime
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createGoal(input: CreateGoalInput!): Goal! @requireAuth
    updateGoal(id: Int!, input: UpdateGoalInput!): Goal! @requireAuth
    deleteGoal(id: Int!): Goal! @requireAuth
  }
`;
