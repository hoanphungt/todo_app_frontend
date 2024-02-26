import { useMutation } from "@apollo/client";
import { useState } from "react";
import { BiCheck, BiEdit, BiTrash, BiX } from "react-icons/bi";

import { Task } from "../type";
import { GET_TASKS } from "../queries";
import { DELETE_TASK, UPDATE_TASK } from "../mutations";

import styles from "./Task.module.css";

export function TaskRow({ task }: { task: Task }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(task.text);
  const [dueDate, setDueDate] = useState(task.dueDate);

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

  const textStyle = {
    color: task.status ? "lightgray" : "black",
    textDecoration: task.status ? "line-through" : "none",
  };

  return (
    <div className={styles.TaskRow}>
      <input
        type="checkbox"
        checked={task.status}
        onChange={(e) => onUpdate(e.target.checked)}
      />
      {edit ? (
        <>
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <span style={textStyle}>{task.text}</span>
          <span style={textStyle}>
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}
          </span>
        </>
      )}
      <div className={styles.Buttons}>
        {edit ? (
          <>
            <button
              className={styles.Button}
              onClick={() =>
                updateTask({ variables: { id: task.id, text, dueDate } })
              }
              title="Confirm"
            >
              <BiCheck color="green" />
            </button>
            <button
              className={styles.Button}
              onClick={() => {
                setText(task.text);
                setDueDate(task.dueDate);
                setEdit(false);
              }}
              title="Cancel"
            >
              <BiX color="red" />
            </button>
          </>
        ) : (
          <button
            className={styles.Button}
            onClick={() => setEdit(true)}
            title="Edit task"
          >
            <BiEdit color="blue" />
          </button>
        )}
        <button
          className={styles.Button}
          onClick={onDelete}
          title="Remove task"
        >
          <BiTrash color="red" />
        </button>
      </div>
    </div>
  );
}
