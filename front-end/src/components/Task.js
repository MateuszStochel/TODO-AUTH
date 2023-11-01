import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Task = React.memo(({ task, setTasks }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(task.description);

  const onAction = async (type) => {
    try {
      let data;

      if (type === "put") {
        data = await axios[type](`/api/v1/tasks/${task._id}`, {
          title: task.title,
          description: editText,
        });

        setEditMode(false);
      } else {
        data = await axios[type](`/api/v1/tasks/${task._id}`);
      }

      if (data) {
        const {
          data: { tasks },
        } = await axios.get("/api/v1/tasks");

        setTasks(tasks);
      }
    } catch (error) {
      //handle logic with error
      console.log(error)
    }
  };

  return (
    <Wrapper>
      <h3>{task.title}</h3>
      <InnerWrapper>
        {isEditMode && (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={() => onAction("put")}>Accept</button>
          </>
        )}
        {!isEditMode && (
          <>
            <p>{task.description}</p>
            <div className="buttons_wrapper">
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={() => onAction("delete")}>Delete</button>
              <button onClick={() => onAction("patch")}>{task.completed ? 'Completed' : 'Complete'}</button>
            </div>
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
});

export default Task;
const Wrapper = styled.div`
  h3 {
    text-align: center;
    margin-top: 20px;
  }
`
const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 100px;
  padding: 20px;
  border: 1px solid black;
  background: var(--primary-100);


  .buttons_wrapper {
    display: flex;
    align-items: center;
  }

  button {
    margin: 10px;
    width: 140px;
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    padding: 10px 16px;
    box-shadow: var(--shadow-1);
    text-transform: capitalize;
    display: inline-block;
  }
`;
