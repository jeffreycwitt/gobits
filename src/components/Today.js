import React from 'react'
import Task from './Task'

export default class Today extends React.Component {
  render(){
    const displayTasks = () => {
      if (this.props.tasks){
        const tasks = this.props.tasks.map((t, i) => {
          return(
              <Task
              key={t.id}
              task={t}
              goalIndex={this.props.goalIndex}
              handleCheck={this.props.handleCheck}
              handleDeleteTask={this.props.handleDeleteTask}
              handleThumbsDown={this.props.handleThumbsDown}/>
          );
      });
      return tasks
    }
  };

    return (
      <div>
        <h2>Today</h2>
        {displayTasks()}
      </div>
    );
  }
}
