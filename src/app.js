class GoBitsApp extends React.Component {
  constructor(props){
    super(props)
    this.changeFocusedGoal = this.changeFocusedGoal.bind(this);
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.setSubtitle = this.setSubtitle.bind(this);
    this.state = {
      subtitle: "Get your life together",
      messages: [
        "Get your life together",
        "Aren't you better than this?",
        "Seriously, Aren't you better than this?",
        "Life really isn't that hard; why are you having so much trouble",
        "Other people don't need a to do list; they just do stuff",
        "Get it together!",
        "Stopping making to do lists and just do your work!",
        "Why are you have so much trouble getting stuff done it?",
      ],
      focusedGoal: 0,
      goals: [
        {
          title: "get new job",
          category: "job",
          date: "June, 2016",
          completed: false,
          tasks: [
            {
              title: "create resume",
              date: "today",
              completed: false
            },
            {
              title: "send out resume",
              date: "week",
              completed: false
            }
          ]
        },
        {
          title: "make new friend",
          category: "social",
          date: "May, 2016",
          completed: false,
          tasks: [
            {
              title: "go to party",
              date: "today",
              completed: false
            },
            {
              title: "start meet up group",
              date: "week",
              completed: false
            }
          ]
        }
      ],
      user: {
        name: "Jeffrey C. Witt",
        email: "jeffreycwitt@gmail.com"
      },
      goldAmount: 10
    }
  }
  setSubtitle(){
    const randomNum = Math.floor(Math.random() * this.state.messages.length)
    const message = this.state.messages[randomNum];
    this.setState(() => {
      return {
        subtitle: message
      }
    });


  }
  changeFocusedGoal(index){
    this.setState(() => {
      return {
        focusedGoal: index
      }
    });
    this.setSubtitle();
  }
  handleAddGoal(goal){
    if (!goal){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      return {
        goals: prevState.goals.concat({title: goal, completed: false, tasks: []}),
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  }
  handleAddTask(task, goalIndex){
    if (!task){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      const updatedTasks = prevState.goals[goalIndex].tasks.concat({title: task, completed: false})
      const prevStateCopy = prevState
      prevStateCopy.goals[goalIndex].tasks = updatedTasks

      const goalStatus = this.setGoalStatus(prevStateCopy.goals[goalIndex])
      prevStateCopy.goals[goalIndex].completed = goalStatus;

      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  }
  setGoalStatus(goal){
    let goalStatus = true
    goal.tasks.forEach((t) =>{
      if (t.completed === false){
        goalStatus = false
      }
    });
    return goalStatus
  }
  handleCheck(taskIndex, goalIndex){

    this.setState((prevState) => {
      const currentValue = prevState.goals[goalIndex].tasks[taskIndex].completed
      const prevStateCopy = prevState
      prevStateCopy.goals[goalIndex].tasks[taskIndex].completed = !currentValue

      const goalStatus = this.setGoalStatus(prevStateCopy.goals[goalIndex])
      prevStateCopy.goals[goalIndex].completed = goalStatus;

      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  }
  handleDeleteTask(taskIndex, goalIndex){

    this.setState((prevState) => {
      const prevStateCopy = prevState
      prevStateCopy.goals[goalIndex].tasks.splice(taskIndex, 1);
      const goalStatus = this.setGoalStatus(prevStateCopy.goals[goalIndex])
      prevStateCopy.goals[goalIndex].completed = goalStatus;
      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  }
  handleDeleteGoal(goalIndex){

    this.setState((prevState) => {
      const prevStateCopy = prevState
      prevStateCopy.goals.splice(goalIndex, 1);
      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  }

render(){
    const title = "Gobits";

    console.log
    return (
      <div>
        <Header title={title} subtitle={this.state.subtitle}/>
        <hr/>
        <User user={this.state.user}/>
        <hr/>
        <Goals
          goals={this.state.goals} changeFocusedGoal={this.changeFocusedGoal}/>
        <AddGoal
          handleAddGoal={this.handleAddGoal}/>
        <hr/>
        <FocusedGoal key={this.state.goals[this.state.focusedGoal].title} goal={this.state.goals[this.state.focusedGoal]}/>
        <Tasks
          tasks={this.state.goals[this.state.focusedGoal].tasks}
          goalIndex={this.state.focusedGoal}
          handleCheck={this.handleCheck}
          handleDeleteTask={this.handleDeleteTask}/>
        <AddTask
          goalIndex={this.state.focusedGoal} handleAddTask={this.handleAddTask}/>
        <hr/>
        <Gold
          goldAmount={this.state.goldAmount}/>
      </div>
    )
  }
}

class Header extends React.Component {
  render(){
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.subtitle}</p>
      </div>
    );

  }
}

//options or tasks
class Goals extends React.Component {
  render(){
    return (
      <div>
        <h2>Goals</h2>
        {this.props.goals.map((o,i) => { return <Goal
          key={i}
          index={i}
          goal={o}
          changeFocusedGoal={this.props.changeFocusedGoal}
          handleDeleteGoal={this.props.handleDeleteGoal}
        />})}
      </div>
    );
  }
}

class Goal extends React.Component {
  constructor(props){
    super(props)
    this.changeFocusedGoal = this.changeFocusedGoal.bind(this)
  }
  changeFocusedGoal(){
    this.props.changeFocusedGoal(this.props.index)
  }
  render(){
    return (
      <li className={!this.props.goal.completed ? "notCompleted" : "completed"} onClick={this.changeFocusedGoal}>{this.props.goal.title} by {this.props.goal.date}
        <button
          onClick={(e) => {
            props.handleDeleteGoal(this.props.goalIndex);
          }}
        >
          remove
        </button>
      </li>
    );
  }
}

class AddGoal extends React.Component {
  constructor(props){
    super(props)
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddGoal(e){
    e.preventDefault()
    const goal = e.target.elements.goal.value.trim();
    const error = this.props.handleAddGoal(goal);
    this.setState(() => {
      return { error };
    });
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddGoal}>
        <input type="text" name="goal"/>
        <button>Add Goal</button>
      </form>
      </div>
    );
  }
}

class FocusedGoal extends React.Component {
  render(){
    return (
      <h2>Tasks for {this.props.goal.title}</h2>
    );
  }
}



class Tasks extends React.Component {
  render(){
    return (
      <div>
        {this.props.tasks.map((t, i) => { return <Task
          key={t.title}
          task={t}
          index={i}
          goalIndex={this.props.goalIndex}
          handleCheck={this.props.handleCheck}
          handleDeleteTask={this.props.handleDeleteTask}/>})}
      </div>
    );
  }
}

const Task = (props) => {
  return (
    <li className={!props.task.completed ? "notCompleted" : "completed"}>{props.task.title} by {props.task.date}
      <input
        type='checkbox'
        onChange={(e) => {
          props.handleCheck(props.index, props.goalIndex)
        }}
      >
      </input>
      <button
        onClick={(e) => {
          props.handleDeleteTask(props.index, props.goalIndex);
        }}
      >
        remove
      </button>
    </li>
  );
}

class AddTask extends React.Component {
  constructor(props){
    super(props)
    this.handleAddTask = this.handleAddTask.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddTask(e){
    e.preventDefault()
    const task = e.target.elements.task.value.trim();
    const error = this.props.handleAddTask(task, this.props.goalIndex);
    this.setState(() => {
      return { error };
    });
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddTask}>
        <input type="text" name="task"/>
        <button>Add Task</button>
      </form>
      </div>
    );
  }
}

class User extends React.Component {
  render(){
    return (
      <div>
        <p>{this.props.user.name}</p>
        <p>{this.props.user.email}</p>
      </div>
    );
  }
}

class Gold extends React.Component {
  render(){
    return (
      <div>
        <p>Gold amount {this.props.goldAmount}</p>
      </div>
    );
  }
}


ReactDOM.render(<GoBitsApp/>, document.getElementById('app'))
