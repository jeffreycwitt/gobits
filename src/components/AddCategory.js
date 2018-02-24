import React from 'react'

export default class AddCategory extends React.Component {
  state = {
    error: undefined
  }
  handleAddCategory = (e) => {
    e.preventDefault()
    const category = e.target.elements.category.value.trim();
    const error = this.props.handleAddCategory(category);
    this.setState(() => {
      return { error };
    });
    if (!error){
      e.target.elements.category.value = '';
    };
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddCategory}>
        <input type="text" name="category"/>
        <button><span className="fa fa-plus"/></button>
      </form>
      </div>
    );
  }
}
