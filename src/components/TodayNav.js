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
  render(){
    return(
      <div>
        <h2><a onClick={this.handlePreviousDate}>Previous</a> | <a onClick={this.handleNextDate}>Next</a> | <a onClick={this.handleTodayDate}>Today</a> </h2>
      </div>
    )
  }
}
