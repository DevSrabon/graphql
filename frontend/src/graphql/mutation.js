import { gql } from "@apollo/client";

export const SIGN_USER = gql`
  mutation UserMutation($newUser: UserInput!) {
    createUser(newUser: $newUser) {
      name
      email
      password
      role
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String) {
    user: signinUser(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($newTodo: TodoInput!) {
    createTodo(newTodo: $newTodo) {
      title
      description
      user {
        _id
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation Mutation($id: ID!) {
    deleteTodo(_id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodoMutation($id: ID!, $newTodo: TodoInput!) {
    updateTodo(_id: $id, newTodo: $newTodo) {
      title
      description
    }
  }
`;
