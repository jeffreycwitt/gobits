import React from 'react'
const Header = (props) =>{

  return (
    <div id="header">
      <div className="header-wrapper">
        <p id="headliner">{props.title}</p>
        <p id="tagliner">{props.subtitle}</p>
      </div>
      <div className="header-wrapper">
        <p id="user">{props.user.name}</p>
      </div>

    </div>
  );
}
export default Header
