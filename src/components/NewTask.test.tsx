import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { CREATE_TASK } from "../mutations";
import { GET_TASKS } from "../queries";
import { NewTask } from "./NewTask";

const mocks = [
  {
    // delay: 300,
    request: {
      query: CREATE_TASK,
      variables: { text: "New task", dueDate: "2024-12-31" },
    },
    result: {
      data: {
        createTask: {
          id: "1",
          text: "New task",
          dueDate: "2024-12-31",
          status: false,
        },
      },
    },
  },
  {
    request: {
      query: GET_TASKS,
    },
    result: {
      data: {
        allTasks: [],
      },
    },
  },
];

it("should create a new task", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewTask />
    </MockedProvider>
  );

  const taskInput = screen.getByLabelText("Task:");
  const dueDateInput = screen.getByLabelText("Due date:");
  const addButton = screen.getByText("ADD");

  fireEvent.change(taskInput, { target: { value: "New task" } });
  fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });
  fireEvent.click(addButton);

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
});
