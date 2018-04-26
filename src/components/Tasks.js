import React from 'react'
import Task from './Task'

export default class Tasks extends React.Component {
  render(){
    const displayTasks = () => {
      if (this.props.tasks){
        const tasks = this.props.tasks.map((t, i) => {
          return(
              <Task
              key={t.id}
              task={t}
              goalId={this.props.goalId}
              handleCheck={this.props.handleCheck}
              handleDeleteTask={this.props.handleDeleteTask}
              handleThumbsDown={this.props.handleThumbsDown}
              handleFocusTask={this.props.handleFocusTask}
              handleUpdateTask={this.props.handleUpdateTask}
              display={this.props.display}
            />
          );
      });
      return tasks
    }
  };

    return (
      <div>
        <h2>(Ha)bits</h2>
        {displayTasks()}
      </div>
    );
  }
}
