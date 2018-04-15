import React from 'react';

const Task = (props) => {
  const thumbsUpClassNames = ["fa", "fa-thumbs-up", !props.task.completedAt ? "notCompletedThumbsUp" : "completedThumbsUp"].join(" ")
  const thumbsDownClassNames = ["fa", "fa-thumbs-down", !props.task.completedAt ? "notCompletedThumbsDown" : "completedThumbsDown"].join(" ")
  const goalId = props.goalId ? props.goalId : undefined;

  return (
    <li className={!props.task.completedAt ? "notCompleted task" : "completed task"}>
      <div>
        {props.task.title}
        {props.display === "dashboard" && props.task.date}
      </div>
      <div>
      <span className={thumbsUpClassNames}
        onClick={(e) => {
          props.handleCheck(props.task.id, goalId)
        }}
      />
      <span className={thumbsDownClassNames}
        onClick={(e) => {
          props.handleThumbsDown(props.task.id, goalId)
        }}
      >{props.task.rejectedCount}</span>

      <span className="fa fa-trash"
        onClick={(e) => {
          props.handleDeleteTask(props.task.id, goalId);
        }}
      />
      <span className="fa fa-edit"
        onClick={(e) => {
          props.handleFocusTask(props.task.id);
        }}
      />
      </div>
    </li>
  );
};

export default Task;
