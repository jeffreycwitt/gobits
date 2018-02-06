import React from 'react'

export default class AddTask extends React.Component {
  constructor(props){
    super(props)
    this.handleAddTask = this.handleAddTask.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddTask(e){
    e.preventDefault()
    const date = this.props.display === "today" ? "today" : e.target.elements.date.value;
    const task = e.target.elements.task.value.trim();
    const error = this.props.handleAddTask(task, date, this.props.goalIndex);
    this.setState(() => {
      return { error };
    });
    if (!error){
      e.target.elements.task.value = '';
    };
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddTask}>
        <input type="text" name="task"/>
        {this.props.display !== "today"  && <input type="date" name="date"/>}
        <button><span className="fa fa-plus"/></button>
      </form>
      </div>
    );
  }
}
