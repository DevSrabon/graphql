import { gql } from "@apollo/client";

export const ME_USER = gql`
  query Query {
    user {
      name
      email
      role
      _id
    }
  }
`;

export const ALL_TODOS = gql`
  query Query {
    todos {
      title
      description
      _id
    }
  }
`;
