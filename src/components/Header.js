import React from 'react'
const Header = (props) =>{
  return (
    <div>
      <h1 id="headliner">{props.title}</h1>
      <p id="tagliner">{props.subtitle}</p>
    </div>
  );
}
export default Header
