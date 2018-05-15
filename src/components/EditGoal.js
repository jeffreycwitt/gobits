import React from 'react'
import moment from 'moment'

export default class EditTask extends React.Component {
  state = {
    error: undefined,
    selectedCategory: "uncategorized",
    selectedGoal: "uncategorized-goal",
  }
  componentWillMount(){
    const categoryId = this.props.focusedEditGoal.category;
    this.setState((prevState) => {
      return {
        selectedCategory: categoryId
      }
    });
  }
  handleUpdateFocusedEditGoal = (e) => {
    e.preventDefault();
    const goalId = this.props.focusedEditGoal.id
    const defaultDate = this.props.focusedDate || moment().format("YYYY-MM-DD");
    const date = e.target.elements.date.value;
    const title = e.target.elements.title.value.trim();
    const color = e.target.elements.color.value.trim();
    const abbrevCode = e.target.elements.abbrevCode.value.trim();
    const category = e.target.elements.categories ? e.target.elements.categories.value : this.props.categoryId;
    console.log(category);
    const error = this.props.handleUpdateFocusedEditGoal(goalId, title, date, category, color, abbrevCode);
    this.setState(() => {
      return { error };
    });
    if (!error){
      this.props.handleClearFocusedEditGoal()
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
          <select name="categories" onChange={this.handleChangeCategory} value={this.state.selectedCategory}>
            {
              categories.length > 0 ? categories : <option value="uncategorized">Uncategorized</option>
            }
          </select>
          <label className="assign__label">Category</label>
        </div>
      )

    }
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleUpdateFocusedEditGoal}>
        <input type="text" name="title" defaultValue={this.props.focusedEditGoal.title}/>
        <input type="date" name="date" defaultValue={this.props.focusedEditGoal.date}/>
        <input type="text" name="color" defaultValue={this.props.focusedEditGoal.color}/>
        <input type="text" name="abbrevCode" defaultValue={this.props.focusedEditGoal.abbrevCode}/>
        {displayCategoriesList()}
        <button><span className="fa fa-plus"/>Update</button>
      </form>
      </div>
    );
  }
}
