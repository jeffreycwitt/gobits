import React from 'react'

import Task from './Task'
import AddTask from './AddTask';


export default class Today extends React.Component {

  render(){
    const displayTasks = () => {
      if (this.props.tasks){
        const tasks = this.props.tasks.map((t, i) => {
          return(
            <div>
              <Task
              key={t.id}
              task={t}
              goalId={undefined}
              handleCheck={this.props.handleCheck}
              handleDeleteTask={this.props.handleDeleteTask}
              handleThumbsDown={this.props.handleThumbsDown}
              handleFocusTask={this.props.handleFocusTask}
              display={this.props.display}
            />
          </div>
          );
      });
      return tasks
    }
  };
    const className = this.props.current ? "week-highlighted" : ""
    return (
      <div className="today">
        <p className={className}>{this.props.focusedDate}</p>
        {displayTasks()}
        <AddTask
          goalId={this.props.focusedGoal}
          handleAddTask={this.props.handleAddTask}
          display={this.props.display}
          focusedDate={this.props.focusedDate}
          goals={this.props.goals}
          categories={this.props.categories}
        />
      </div>
    );
  }
}
