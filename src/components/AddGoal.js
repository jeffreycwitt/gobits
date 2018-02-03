import React from 'react'

export default class AddGoal extends React.Component {
  constructor(props){
    super(props)
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddGoal(e){
    e.preventDefault()
    const date = e.target.elements.date.value
    const goal = e.target.elements.goal.value.trim();
    const error = this.props.handleAddGoal(goal, date, this.props.category);
    this.setState(() => {
      return { error };
    });
    if (!error){
      e.target.elements.goal.value = '';
    };
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddGoal}>
        <input type="text" name="goal"/>
        <input type="date" name="date"/>
        <button><span className="fa fa-plus"/></button>
      </form>
      </div>
    );
  }
}
