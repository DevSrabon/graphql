const typeDefs = `#graphql

  type User{
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    todos: [Todo]
  }
type Todo {
    _id: ID
    title: String   
    description: String
    user: User
}
  type Query {
    users: [User]
    user(_id: ID!): User
  }
  type Mutation {
      createUser(newUser:UserInput!): User
      createTodo(newTodo:TodoInput!): Todo
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    role: String!    
  }
  input TodoInput {
    user: ID!
    title: String!
    description: String!
  }
`;

export default typeDefs;
