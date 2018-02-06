import React from 'react'
import moment from 'moment'

import Task from './Task'


export default class Today extends React.Component {
  constructor(props){
    super(props)
    this.handleChangeFocusDate = this.handleChangeFocusDate.bind(this)
    this.handleNextDate = this.handleNextDate.bind(this)
    this.handleTodayDate = this.handleTodayDate.bind(this)
    this.handlePreviousDate = this.handlePreviousDate.bind(this)
  }
  handleChangeFocusDate(e){
    e.preventDefault();
    const date = this.props.focusedDate ? this.props.focusedDate : moment();
    console.log("this", this.props)
    this.props.handleChangeFocusDate(moment(date).add(1, "d").format("YYYY-MM-DD"));
  }
  handleTodayDate(e){
    e.preventDefault();
    this.props.handleChangeFocusDate(moment().format("YYYY-MM-DD"));
  }
  handleNextDate(e){
    e.preventDefault();
    const date = this.props.focusedDate ? this.props.focusedDate : moment();
    this.props.handleChangeFocusDate(moment(date).add(1, "d").format("YYYY-MM-DD"));
  }
  handlePreviousDate(e){
    e.preventDefault();
    const date = this.props.focusedDate ? this.props.focusedDate : moment();
    this.props.handleChangeFocusDate(moment(date).subtract(1, "d").format("YYYY-MM-DD"));
  }
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
        <h2><a onClick={this.handlePreviousDate}>Previous</a> | <a onClick={this.handleNextDate}>Next</a> | <a onClick={this.handleTodayDate}>Today</a> </h2>
        <h3>Current: {this.props.focusedDate}</h3>
        {displayTasks()}
      </div>
    );
  }
}