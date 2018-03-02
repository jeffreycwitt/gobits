import React from 'react'
import moment from 'moment'

export default class EditTask extends React.Component {
  state = {
    error: undefined,
    selectedCategory: "uncategorized"
  }
  handleUpdateTask = (e) => {
    e.preventDefault()
    const taskId = this.props.editTask.id
    const defaultDate = this.props.focusedDate || moment().format("YYYY-MM-DD");
    const date = this.props.display === "today" ? defaultDate : e.target.elements.date.value;
    const title = e.target.elements.task.value.trim();
    const goal = e.target.elements.goals ? e.target.elements.goals.value : this.props.goalId;
    const error = this.props.handleUpdateTask(taskId, title, date, goal);
    this.setState(() => {
      return { error };
    });
    if (!error){
      e.target.elements.task.value = '';
    };
    this.props.handleClearFocusedTask()
  }
  handleChangeCategory = (e) => {
    const category = e.target.value;
    this.setState(() => ({selectedCategory: category}))
  }
  render(){

    const displayCategoriesList = () => {
      let defaultGoal = this.props.editTask.goal
      let taskCategory = this.props.goals.filter((g) => {
        if (g.id === defaultGoal){
          return g.category
        }
      });
      taskCategory = taskCategory[0];

      const categories = this.props.categories.map((category) => {
        return(
          <option key={category.id} value={category.id}>{category.title}</option>
        )
      });
      return (
        <div className="assign">
          <select name="categories" onChange={this.handleChangeCategory} defaultValue={taskCategory}>
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
      const defaultGoal = this.props.editTask.goal
      return (
        <div className="assign">

          <select name="goals" defaultValue={defaultGoal}>
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
      <form onSubmit={this.handleUpdateTask}>
        <input type="text" name="task" defaultValue={this.props.editTask.title}/>
        <input type="date" name="date" defaultValue={this.props.editTask.date}/>
        {displayCategoriesList()}
        {displayGoalsList()}
        <button><span className="fa fa-plus"/>Update</button>
      </form>
      </div>
    );
  }
}
