import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { GET_TASKS } from "../queries";
import { DELETE_TASK, UPDATE_TASK } from "../mutations";
import { TaskRow } from "./Task";

const task = {
  id: "1",
  text: "New task",
  status: false,
  dueDate: null,
};

const mocks = [
  {
    request: {
      query: DELETE_TASK,
      variables: { id: task.id },
    },
    result: {
      data: {
        deleteTask: {
          id: task.id,
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_TASK,
      variables: { id: task.id, status: true },
    },
    result: {
      data: {
        updateTask: {
          id: task.id,
          status: true,
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
        allTasks: [task],
      },
    },
  },
];

describe("TaskRow", () => {
  it("renders task details", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskRow task={task} />
      </MockedProvider>
    );

    expect(screen.getByText("New task")).toBeInTheDocument();
  });

  it("enters edit mode when edit button is clicked", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskRow task={task} />
      </MockedProvider>
    );

    const editButton = screen.getByTitle("Edit task");
    fireEvent.click(editButton);

    const confirmButton = screen.getByTitle("Confirm");
    const cancelButton = screen.getByTitle("Cancel");

    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("cancels edit mode when cancel button is clicked", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TaskRow task={task} />
      </MockedProvider>
    );

    const editButton = screen.getByTitle("Edit task");
    fireEvent.click(editButton);

    const confirmButton = screen.getByTitle("Confirm");
    const cancelButton = screen.getByTitle("Cancel");
    fireEvent.click(cancelButton);

    expect(confirmButton).not.toBeInTheDocument();
    expect(cancelButton).not.toBeInTheDocument();
  });
});
