import React from 'react'
import Category from './Category'
export default class Categories extends React.Component {
  render(){
    return (
      <div>
        <h2>Categories</h2>
        <ul>
        {this.props.categories.map((c,i) => { return <Category
          key={c.id}
          category={c}
          focusedCategory={this.props.focusedCategory}
          changeFocusedCategory={this.props.changeFocusedCategory}
          handleDeleteCategory={this.props.handleDeleteCategory}
        />})}
        </ul>
      </div>
    );
  }
}
