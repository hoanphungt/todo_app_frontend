export interface Task {
  id: string;
  status: boolean;
  text: string;
  dueDate: string;
}

export type GetTasksData = {
  allTasks: Task[];
};
