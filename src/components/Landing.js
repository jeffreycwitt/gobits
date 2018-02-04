import React from 'react'

export default class Landing extends React.Component {
  constructor(props){
    super(props)
    this.getNewIndex = this.getNewIndex.bind(this);
    this.state = {
      goals: [
        "be a gobit!",
        "run a 10k.",
        "call mom more.",
        "get a promotion.",
        "buy a house."
      ],
      currentGoalIndex: 0
    };

  }
  getNewIndex(){
    const randomNum = Math.floor(Math.random() * this.state.goals.length)
    return randomNum
  }
  componentDidMount(){
    setInterval(() => {
      this.setState({currentGoalIndex: this.getNewIndex()})
      console.log(this.state)
    }, 2000)
  }
  render(){
    return (
        <div className="goalBox">
          <p>
            <span className="goalStagnant">my goal is to</span>
            <span id="goalHop">{this.state.goals[this.state.currentGoalIndex]}</span>
          </p>
          <div className="center-btn">
            <a className="lets-gobit-btn" href="/me">let's gobit!</a>
          </div>
        </div>

    );
  }
}
