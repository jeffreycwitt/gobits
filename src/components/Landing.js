import React from 'react'

export default class Landing extends React.Component {
  state = {
    goals: [
      "be a gobit!",
      "run a 10k.",
      "call mom more.",
      "get a promotion.",
      "buy a house."
    ],
    currentGoalIndex: 0
  };
  timer = () => {
    this.setState({currentGoalIndex: this.getNewIndex()});
  };
  getNewIndex = () => {
    const randomNum = Math.floor(Math.random() * this.state.goals.length)
    return randomNum
  };
  componentDidMount(){
    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  }
  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }
  render(){
    return (
        <div className="goalBox">
          <p>
            <span className="goalStagnant">my goal is to</span>
            <span id="goalHop">{this.state.goals[this.state.currentGoalIndex]}</span>
          </p>
          <div className="center-btn">
            <a className="lets-gobit-btn" href="#me">let's gobit!</a>
          </div>
        </div>

    );
  }
}
