
class VisibilityToggle extends React.Component {
  constructor(props){
    super(props)
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
    this.state = {visibility: false}
  }
  handleToggleVisibility(){
    this.setState((prevState) => {
        return {
          visibility: !prevState.visibility
        }
      }
    )
  }
  render(){
    const details = "Hey these are some details that you can now see."
    return(
      <div>
         <h1>Visibility Toggle</h1>
         <button onClick={this.handleToggleVisibility}>{this.state.visibility ? "Hide Details" : "Show Details"}</button>
         {this.state.visibility && <p>{details}</p>}
       </div>
     )
  }
}
ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'))
