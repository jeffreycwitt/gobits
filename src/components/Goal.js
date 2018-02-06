import React from 'react'

export default class Goal extends React.Component {
  constructor(props){
    super(props)
    this.changeFocusedGoal = this.changeFocusedGoal.bind(this)
  }
  changeFocusedGoal(){
    this.props.changeFocusedGoal(this.props.goal.id)
  }
  addClassNames(){
    let classNameArray = []
    classNameArray.push(!this.props.goal.completedAt ? "notCompleted" : "completed");
    classNameArray.push(this.props.goal.id === this.props.focusedGoal ? "selected" : null);
    return classNameArray.join(' ');
  }
  render(){
    return (
      <li className={this.addClassNames()}>
        <a onClick={this.changeFocusedGoal}>{this.props.goal.title} by {this.props.goal.date}</a>
      {this.props.goal.id !== 'uncategorized' && <span className="fa fa-trash"
        onClick={(e) => {
          this.props.handleDeleteGoal(this.props.goal.id);
        }}
      />}
      </li>
    );
  }
}
