import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";

import { GET_TASKS } from "../queries";
import { CREATE_TASK } from "../mutations";

import styles from "./NewTask.module.css";

export function NewTask() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      setTask("");
      setDueDate("");
    },
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask({ variables: { text: task, dueDate: dueDate || null } });
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.Input}>
        <label htmlFor="task">Task: </label>
        <input
          id="task"
          type="text"
          placeholder="What do you need to do?"
          className={styles.InputField}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className={styles.Input}>
        <label htmlFor="dueDate">Due date: </label>
        <input
          id="dueDate"
          type="date"
          className={styles.InputField}
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button className={styles.Button} type="submit" disabled={loading}>
        ADD
      </button>
      {error && <p className={styles.Error}>Error: {error.message}</p>}
    </form>
  );
}
