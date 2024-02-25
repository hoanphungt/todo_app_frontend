import { gql } from "@apollo/client";

// Mutation to create a task
export const CREATE_TASK = gql`
  mutation CreateTask($text: String!, $dueDate: Date) {
    createTask(text: $text, dueDate: $dueDate) {
      id
      text
      status
      dueDate
    }
  }
`;

// Mutation to update a task
export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $text: String
    $status: Boolean
    $dueDate: Date
  ) {
    updateTask(id: $id, text: $text, status: $status, dueDate: $dueDate) {
      id
      text
      status
      dueDate
    }
  }
`;

// Mutation to delete a task
export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      text
      status
      dueDate
    }
  }
`;
