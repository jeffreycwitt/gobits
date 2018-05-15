import React from 'react'

export default class Goal extends React.Component {
  changeFocusedGoal = () => {
    this.props.changeFocusedGoal(this.props.goal.id)
  };
  addClassNames = () => {
    let classNameArray = []
    classNameArray.push(!this.props.goal.completedAt ? "notCompleted" : "completed");
    classNameArray.push(this.props.goal.id === this.props.focusedGoal ? "selected" : null);
    return classNameArray.join(' ');
  };
  render(){
    const borderColor = this.props.goal.color ? this.props.goal.color : "#fc846b"

    const style = {
      borderBottomColor: borderColor
    }

    return (
      <li className={this.addClassNames()} style={style}>
        <a onClick={this.changeFocusedGoal}>{this.props.goal.abbrevCode}::{this.props.goal.title} by {this.props.goal.date}</a>
      {!this.props.goal.id.includes('uncategorized') && <span className="fa fa-trash"
        onClick={(e) => {
          this.props.handleDeleteGoal(this.props.goal.id);
        }}
      />}
      <span className="fa fa-edit"
        onClick={(e) => {
          this.props.handleFocusEditGoal(this.props.goal.id);
        }}
      />
      </li>
    );
  }
}
