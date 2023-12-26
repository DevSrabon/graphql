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
type Token{
  token:String!
}
  type Query {
    users: [User]
    user: User
    todos: [Todo]
    
  }

  type Mutation {
      createUser(newUser:UserInput!): User
      signinUser(email: String!, password: String):Token
      updateUser(_id: ID!, newUser: UserInput!): User
      createTodo(newTodo:TodoInput!): Todo
      deleteTodo(_id: ID!): Boolean
  }

  input UserInput {
    name: String
    email: String
    password: String
    role: String   
  }
  input TodoInput {
    user: ID!
    title: String!
    description: String!
  }
`;

export default typeDefs;
