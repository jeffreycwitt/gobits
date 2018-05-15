import React from 'react';
import moment from 'moment'

const Task = (props) => {
  const thumbsUpClassNames = ["fa", "fa-thumbs-up", !props.task.completedAt ? "notCompletedThumbsUp" : "completedThumbsUp"].join(" ")
  const thumbsDownClassNames = ["fa", "fa-thumbs-down", !props.task.completedAt ? "notCompletedThumbsDown" : "completedThumbsDown"].join(" ")
  const goalId = props.goalId ? props.goalId : undefined;
  const newDate = moment().add(1, "days").format("YYYY-MM-DD");

  const displayBumpArrow = () => {
    if (!props.task.completedAt && moment(props.task.date) <= moment()){
      return(
        <span className="fa fa-arrow-right"
          onClick={(e) => {
            props.handleUpdateTask(props.task.id, props.task.title, newDate, props.task.goal);
          }}
        />
      )
    }
  }
  const borderColor = props.color ? props.color : "#fc846b"

  const style = {
    borderBottomColor: borderColor
  }
  return (
    <li className={!props.task.completedAt ? "notCompleted task" : "completed task"} style={style}>
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
      {displayBumpArrow()}
      </div>
    </li>
  );
};

export default Task;
