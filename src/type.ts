export interface Task {
  id: string;
  status: boolean;
  text: string;
  dueDate: string | null;
}

export type GetTasksData = {
  allTasks: Task[];
};
