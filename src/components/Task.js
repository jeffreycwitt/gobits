import React from 'react';

const Task = (props) => {

  return (
    <li className={!props.task.completedAt ? "notCompleted" : "completed"}>{props.task.title} by {props.task.date}
      <input
        type='checkbox'
        onChange={(e) => {
          props.handleCheck(props.task.id, props.goalIndex)
        }}
      >
      </input>
      <span className="fa fa-trash"
        onClick={(e) => {
          props.handleDeleteTask(props.task.id, props.goalIndex);
        }}
      />
    </li>
  );
};

export default Task;
