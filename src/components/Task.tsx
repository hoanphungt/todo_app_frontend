import { useMutation } from "@apollo/client";
import { useState } from "react";

import { Task } from "../type";
import { GET_TASKS } from "../queries";
import { DELETE_TASK, UPDATE_TASK } from "../mutations";

import styles from "./Task.module.css";

export function TaskRow({ task }: { task: Task }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(task.text);

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  const onDelete = () => deleteTask({ variables: { id: task.id } });

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => setEdit(false),
    refetchQueries: [{ query: GET_TASKS }],
  });
  const onUpdate = (status: boolean) =>
    updateTask({ variables: { id: task.id, status } });

  return (
    <div className={styles.TaskRow}>
      <input
        type="checkbox"
        checked={task.status}
        onChange={(e) => onUpdate(e.target.checked)}
      />
      {edit ? (
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={styles.Button}
            onClick={() => updateTask({ variables: { id: task.id, text } })}
          >
            Confirm
          </button>
          <button
            className={styles.Button}
            onClick={() => {
              setEdit(false);
              setText(task.text);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <span
          style={{
            color: task.status ? "lightgray" : "black",
            textDecoration: task.status ? "line-through" : "none",
          }}
        >
          {task.text}
        </span>
      )}
      <span
        style={{
          color: task.status ? "lightgray" : "black",
          textDecoration: task.status ? "line-through" : "none",
        }}
      >
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}
      </span>
      <div>
        <button className={styles.Button} onClick={() => setEdit(!edit)}>
          Edit
        </button>
        <button className={styles.Button} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
