import React from 'react'

export default class Category extends React.Component {
  constructor(props){
    super(props)
    this.changeFocusedCategory = this.changeFocusedCategory.bind(this)
  }
  changeFocusedCategory(){
    this.props.changeFocusedCategory(this.props.category.id)
  }
  render(){
    return (
      <li className={this.props.category.id === this.props.focusedCategory ? "selected" : null}><a onClick={this.changeFocusedCategory}>{this.props.category.title}</a>
        {this.props.category.id !== 'uncategorized' && <span className="fa fa-trash"
          onClick={(e) => {
            this.props.handleDeleteCategory(this.props.category.id);
          }}
        />}
      </li>
    );
  }
}
