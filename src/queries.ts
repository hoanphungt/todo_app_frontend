import { gql } from "@apollo/client";

// Query to get all tasks
export const GET_TASKS = gql`
  query GetTasks {
    allTasks {
      id
      status
      text
      dueDate
    }
  }
`;
