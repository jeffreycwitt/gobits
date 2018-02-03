import React from 'react';

const Task = (props) => {

  return (
    <li className={!props.task.completed ? "notCompleted" : "completed"}>{props.task.title} by {props.task.date}
      <input
        type='checkbox'
        onChange={(e) => {
          props.handleCheck(props.index, props.goalIndex)
        }}
      >
      </input>
      <span className="fa fa-trash"
        onClick={(e) => {
          props.handleDeleteTask(props.index, props.goalIndex);
        }}
      />
    </li>
  );
};

export default Task;
