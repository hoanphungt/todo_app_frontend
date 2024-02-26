import { useQuery } from "@apollo/client";

import { GetTasksData } from "../type";
import { GET_TASKS } from "../queries";
import { TaskRow } from "./Task";

import styles from "./Tasks.module.css";

export function Tasks() {
  const { loading, error, data } = useQuery<GetTasksData>(GET_TASKS);

  if (loading) return <p className={styles.Message}>Loading...</p>;
  if (error) return <p className={styles.Message}>Error : {error.message}</p>;
  if (!data) return <p className={styles.Message}>No data</p>;

  const finishedTasks = data.allTasks.filter((task) => task.status);
  const unfinishedTasks = data.allTasks.filter((task) => !task.status);

  return (
    <div className={styles.ListContainer}>
      {unfinishedTasks
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      {finishedTasks
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
    </div>
  );
}
