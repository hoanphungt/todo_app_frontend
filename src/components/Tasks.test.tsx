import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { GET_TASKS } from "../queries";
import { Tasks } from "./Tasks";

const mocks = [
  {
    request: {
      query: GET_TASKS,
    },
    result: {
      data: {
        allTasks: [{
          id: "1",
          text: "New task",
          dueDate: "2024-12-31",
          status: false,
        }],
      },
    },
  },
];

it("renders tasks", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tasks />
    </MockedProvider>
  );
  expect(await screen.findByText("New task")).toBeInTheDocument();
});
