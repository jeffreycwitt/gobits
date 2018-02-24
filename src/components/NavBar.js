import React from 'react'

export default class NavBar extends React.Component {

  render(){
    const viewChoice = () => {
      if (this.props.currentView === "dashboard"){
        return "Today"
      }
      else {
        return "Dashboard"
      }
    };

    return (
      <button className="navbar" onClick={this.props.changeView}>View {viewChoice()}</button>
    );
  }
}
