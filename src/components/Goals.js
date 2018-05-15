import React from 'react'
import Goal from './Goal'

export default class Goals extends React.Component {
  render(){
    return (
      <div>
        <h2>Go(als)</h2>
        {this.props.goals.map((o,i) => { return <Goal
          key={o.id}
          goal={o}
          focusedGoal={this.props.focusedGoal}
          changeFocusedGoal={this.props.changeFocusedGoal}
          handleDeleteGoal={this.props.handleDeleteGoal}
          handleFocusEditGoal={this.props.handleFocusEditGoal}
        />})}
      </div>
    );
  }
}
