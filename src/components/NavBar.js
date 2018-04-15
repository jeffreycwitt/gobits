import React from 'react'

export default class NavBar extends React.Component {
  handleChangeView = (e) => {
    const view = e.target.value;
    this.props.changeView(view)
  }
  render(){
    return (
      <div className="navbar-wrapper">
        <button className="navbar" value="dashboard" onClick={this.handleChangeView}>View Dashboard</button>
        <button className="navbar" value="today" onClick={this.handleChangeView}>View Today</button>
        <button className="navbar" value="week" onClick={this.handleChangeView}>View Week</button>
      </div>
    );
  }
}
