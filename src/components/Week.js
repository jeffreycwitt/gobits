import React from 'react';
import Today from './Today';
import AddTask from './AddTask';
import TodayNav from './TodayNav';
import moment from 'moment'

export default class Week extends React.Component {
  filteredTodaysTasks = (date, tasks) => {
    if (!date){
      date = ""
    }
    const todaysTasks = tasks.filter((t,i) => {
      if (t.date === date){
        return t
        }
      });
    return todaysTasks;
  };
  // handleChangeGoalsFilter = (goalid, tasks) => {
  //   const filteredTasks = tasks.filter((t,i) => {
  //     if (goalid === undefined){
  //       return t
  //     }
  //     else if (t.goal === goalid){
  //       return t
  //       }
  //     });
  //   return filteredTasks;
  // }
  render(){
    const displayTodays = () => {
      let dayComponents = [];
      let i;
      for (i=0; i < 3; i++){
        let currentDate = moment(this.props.focusedDate).add(i-3, "days").format("YYYY-MM-DD");
        dayComponents.push(
          <div key={i}>
          <Today
            tasks={this.props.handleChangeGoalsFilter(this.props.focusedGoal, this.filteredTodaysTasks(currentDate, this.props.tasks))}
            goalId={this.props.focusedGoal}
            handleCheck={this.props.handleCheck}
            handleDeleteTask={this.props.handleDeleteTask}
            handleThumbsDown={this.props.handleThumbsDown}
            handleChangeFocusDate={this.props.handleChangeFocusDate}
            focusedDate={currentDate}
            handleFocusTask={this.props.handleFocusTask}
            handleAddTask={this.props.handleAddTask}
            handleUpdateTask={this.props.handleUpdateTask}
            display={this.props.display}
            goals={this.props.goals}
            categories={this.props.categories}
            getTaskColor={this.props.getTaskColor}
          />

          </div>
        )
      }
      dayComponents.push(
        <div key="today">
        <Today
          tasks={this.props.handleChangeGoalsFilter(this.props.focusedGoal, this.filteredTodaysTasks(this.props.focusedDate, this.props.tasks))}
          goalId={this.props.focusedGoal}
          handleCheck={this.props.handleCheck}
          handleDeleteTask={this.props.handleDeleteTask}
          handleThumbsDown={this.props.handleThumbsDown}
          handleChangeFocusDate={this.props.handleChangeFocusDate}
          focusedDate={this.props.focusedDate}
          handleFocusTask={this.props.handleFocusTask}
          handleUpdateTask={this.props.handleUpdateTask}
          current={true}
          handleAddTask={this.props.handleAddTask}
          display={this.props.display}
          goals={this.props.goals}
          categories={this.props.categories}
          getTaskColor={this.props.getTaskColor}
        />
        </div>
      )
      i = 4
      for (i=4; i < 7; i++){
        let currentDate = moment(this.props.focusedDate).add(i-3, "days").format("YYYY-MM-DD");
        dayComponents.push(
          <div key={i}>
          <Today
            tasks={this.props.handleChangeGoalsFilter(this.props.focusedGoal, this.filteredTodaysTasks(currentDate, this.props.tasks))}
            goalId={this.props.focusedGoal}
            handleCheck={this.props.handleCheck}
            handleDeleteTask={this.props.handleDeleteTask}
            handleThumbsDown={this.props.handleThumbsDown}
            handleChangeFocusDate={this.props.handleChangeFocusDate}
            focusedDate={currentDate}
            handleFocusTask={this.props.handleFocusTask}
            handleAddTask={this.props.handleAddTask}
            display={this.props.display}
            goals={this.props.goals}
            categories={this.props.categories}
            getTaskColor={this.props.getTaskColor}
          />
        </div>
        )
      }
      dayComponents.push(
        <div key="uncategorized">
        <Today
          tasks={this.props.handleChangeGoalsFilter(this.props.focusedGoal, this.filteredTodaysTasks("", this.props.tasks))}
          goalId={this.props.focusedGoal}
          handleCheck={this.props.handleCheck}
          handleDeleteTask={this.props.handleDeleteTask}
          handleThumbsDown={this.props.handleThumbsDown}
          handleChangeFocusDate={this.props.handleChangeFocusDate}
          focusedDate={""}
          handleFocusTask={this.props.handleFocusTask}
          handleUpdateTask={this.props.handleUpdateTask}
          handleAddTask={this.props.handleAddTask}
          display={this.props.display}
          goals={this.props.goals}
          categories={this.props.categories}
          getTaskColor={this.props.getTaskColor}
        />
        </div>
      )
      return dayComponents

    }
    return (
      <div className="week">
        <div className="week-header-wrapper">
        <h2>Week</h2>
          <TodayNav
            focusedDate={this.props.focusedDate}
            handleChangeFocusDate={this.props.handleChangeFocusDate}
            goals={this.props.goals}
            categories={this.props.categories}
            changeFocusedGoal={this.props.changeFocusedGoal}
            focusedGoal={this.props.focusedGoal}
          />
        </div>
        <div className="week-wrapper">
        {displayTodays()}
        </div>


      </div>
    )
  }
};
