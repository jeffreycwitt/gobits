import React from 'react'
import Task from './Task'

export default class Tasks extends React.Component {
  render(){
    let test = this.props.tasks.map((t, i) => {
      return(
          <Task
          key={t.title}
          task={t}
          index={t.id}
          goalIndex={this.props.goalIndex}
          handleCheck={this.props.handleCheck}
          handleDeleteTask={this.props.handleDeleteTask}/>
      );
    });
    const displayTasks = () => {
      if (this.props.tasks){
        const tasks = this.props.tasks.map((t, i) => {
          return(
              <Task
              key={t.title}
              task={t}
              index={t.id}
              goalIndex={this.props.goalIndex}
              handleCheck={this.props.handleCheck}
              handleDeleteTask={this.props.handleDeleteTask}/>
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
