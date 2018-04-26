import React from 'react'
import moment from 'moment'

export default class AddTask extends React.Component {
  state = {
    error: undefined,
    selectedCategory: "uncategorized"
  }
  handleAddTask = (e) => {
    e.preventDefault()
    const defaultDate = this.props.focusedDate
    //|| moment().format("YYYY-MM-DD");
    //const date = (this.props.display === "today" || this.props.display === "week") ? defaultDate : "";
    const date = defaultDate;
    
    const task = e.target.elements.task.value.trim();
    const goal = e.target.elements.goals ? e.target.elements.goals.value : this.props.goalId;
    const error = this.props.handleAddTask(task, date, goal);
    this.setState(() => {
      return { error };
    });
    if (!error){
      e.target.elements.task.value = '';
    };
  }
  handleChangeCategory = (e) => {
    const category = e.target.value;
    this.setState(() => ({selectedCategory: category}))
  }
  render(){
    const displayCategoriesList = () => {

      const categories = this.props.categories.map((category) => {
        return(
         <option key={category.id} value={category.id}>{category.title}</option>
       )
      });
      return (
        <div className="assign">
          <select name="categories" onChange={this.handleChangeCategory}>
            {
              categories.length > 0 ? categories : <option value="uncategorized">Uncategorized</option>
            }
          </select>
          <label className="assign__label">Category</label>
        </div>
      )

    }
    const displayGoalsList = () => {

      const category = this.state.selectedCategory;
      const goals = this.props.goals.map((goal) => {
        if (goal.category === category)
        return(
         <option key={goal.id} value={goal.id}>{goal.title}</option>
       )
      });
      return (
        <div className="assign">

          <select name="goals">
            {
              goals.length > 0 ? goals : <option value="uncategorized-goal">Uncategorized</option>
            }

          </select>
          <label className="assign__label">Goal</label>
        </div>
      )

    }
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddTask}>
        <input type="text" name="task"/>
        <button><span className="fa fa-plus"/></button>
      </form>
      </div>
    );
  }
}
