import React from 'react';

const Task = (props) => {
  const thumbsUpClassNames = ["fa", "fa-thumbs-up", !props.task.completedAt ? "notCompletedThumbsUp" : "completedThumbsUp"].join(" ")
  const thumbsDownClassNames = ["fa", "fa-thumbs-down", !props.task.completedAt ? "notCompletedThumbsDown" : "completedThumbsDown"].join(" ")
  const goalIndex = props.goalIndex ? props.goalIndex : undefined;

  return (
    <li className={!props.task.completedAt ? "notCompleted" : "completed"}>{props.task.title} {props.task.date}
      <span className={thumbsUpClassNames}
        onClick={(e) => {
          props.handleCheck(props.task.id, goalIndex)
        }}
      />
      <span className={thumbsDownClassNames}
        onClick={(e) => {
          props.handleThumbsDown(props.task.id, goalIndex)
        }}
      >{props.task.rejectedCount}</span>

      <span className="fa fa-trash"
        onClick={(e) => {
          props.handleDeleteTask(props.task.id, goalIndex);
        }}
      />
    </li>
  );
};

export default Task;
