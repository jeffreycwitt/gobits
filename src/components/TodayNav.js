import React from 'react'
import moment from 'moment'

export default class TodayNav extends React.Component {
  handleChangeFocusDate = (e) => {
    e.preventDefault();
    const date = this.props.focusedDate ? this.props.focusedDate : moment();
    this.props.handleChangeFocusDate(moment(date).add(1, "d").format("YYYY-MM-DD"));
  };
  handleTodayDate = (e) => {
    e.preventDefault();
    this.props.handleChangeFocusDate(moment().format("YYYY-MM-DD"));
  };
  handleNextDate = (e) => {
    e.preventDefault();
    const date = this.props.focusedDate ? this.props.focusedDate : moment();
    this.props.handleChangeFocusDate(moment(date).add(1, "d").format("YYYY-MM-DD"));
  };
  handlePreviousDate = (e) => {
    e.preventDefault();
    const date = this.props.focusedDate ? this.props.focusedDate : moment();
    this.props.handleChangeFocusDate(moment(date).subtract(1, "d").format("YYYY-MM-DD"));
  };
  handleChangeGoalsFilter = (e) => {
    e.preventDefault();
    let goal = e.target.value;
    if (goal === "all"){
      goal = undefined
    }

    this.props.changeFocusedGoal(goal);
  };
  render(){
    const goals = this.props.goals.map((goal) => {
      const categoryTitle = this.props.categories.filter(c => c.id === goal.category)[0].title
      return(
        <option key={goal.id} value={goal.id}>{categoryTitle} - {goal.abbrevCode}::{goal.title}</option>
      )
    });
    return(
      <div>
        <h2><a onClick={this.handlePreviousDate}>Previous</a> | <a onClick={this.handleNextDate}>Next</a> | <a onClick={this.handleTodayDate}>Today</a> </h2>
        <div className="goal-filter">
          <select name="goals" onChange={this.handleChangeGoalsFilter} defaultValue={this.props.focusedGoal}>
            <option key="all" value="all">All</option>
            {goals}
          </select>
        </div>
      </div>
    )
  }
}
