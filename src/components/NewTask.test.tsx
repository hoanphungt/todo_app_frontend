import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { CREATE_TASK } from "../mutations";
import { GET_TASKS } from "../queries";
import { NewTask } from "./NewTask";

const mocks = [
  {
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

describe("NewTask", () => {
  it("should render a form", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewTask />
      </MockedProvider>
    );

    expect(screen.getByLabelText("Task:")).toBeInTheDocument();
    expect(screen.getByLabelText("Due date:")).toBeInTheDocument();
    expect(screen.getByText("ADD")).toBeInTheDocument();
  });

  it("should be able to input a task and due date", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <NewTask />
      </MockedProvider>
    );

    const taskInput = screen.getByLabelText("Task:");
    const dueDateInput = screen.getByLabelText("Due date:");

    fireEvent.change(taskInput, { target: { value: "New task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });

    expect(taskInput).toHaveValue("New task");
    expect(dueDateInput).toHaveValue("2024-12-31");
  });

  it("should show a loading state when submitting", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewTask />
      </MockedProvider>
    );

    const taskInput = screen.getByLabelText("Task:");
    const dueDateInput = screen.getByLabelText("Due date:");
    const addButton = screen.getByText("ADD");
    const form = screen.getByTestId("form");

    fireEvent.change(taskInput, { target: { value: "New task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it("should reset the form after submission", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewTask />
      </MockedProvider>
    );

    const taskInput = screen.getByLabelText("Task:");
    const dueDateInput = screen.getByLabelText("Due date:");
    const form = screen.getByTestId("form");

    fireEvent.change(taskInput, { target: { value: "New task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(taskInput).toHaveValue("");
      expect(dueDateInput).toHaveValue("");
    });
  });
});
