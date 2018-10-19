import React from 'react'
const Header = (props) =>{

  return (
    <div className="header">
      <p id="headliner">{props.title}</p>
      <p id="tagliner">{props.subtitle}</p>

    </div>
  );
}
export default Header
