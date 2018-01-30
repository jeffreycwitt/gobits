class GoBitsApp extends React.Component {
  constructor(props){
    super(props)
    this.changeFocusedGoal = this.changeFocusedGoal.bind(this);
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.changeFocusedCategory = this.changeFocusedCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.setSubtitle = this.setSubtitle.bind(this);
    this.displayTasks = this.displayTasks.bind(this);
    this.filteredGoals = this.filteredGoals.bind(this);
    const emptyState =  {
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
      focusedGoal: null,
      focusedCategory: null,
      categories: [
      ],
      goals: [
      ],
      user: {
        name: "John Doe",
        email: "johndoe@example.com"
      },
      goldAmount: 0
    }


    const testState =  {
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
      focusedGoal: null,
      focusedCategory: null,
      categories: [
        {
          id: "job",
          title: "job"
        },
        {
          id: "social",
          title: "social"
        },
        {
          id: "language",
          title: "language"
        }
      ],
      goals: [
        {
          id: "learngerman",
          title: "learn german",
          category: "language",
          tasks: []
        },
        {
          id: "learnfrench",
          title: "learn french",
          category: "language",
          tasks: []
        },
        {
          id: "getnewjob",
          title: "get new job",
          category: "job",
          date: "June, 2016",
          completed: false,
          tasks: [
            {
              id: "createresume",
              title: "create resume",
              date: "today",
              completed: false
            },
            {
              id: "sendoutresume",
              title: "send out resume",
              date: "week",
              completed: false
            }
          ]
        },
        {
          id: "makenewfriend",
          title: "make new friend",
          category: "social",
          date: "May, 2016",
          completed: false,
          tasks: [
            {
              "id": "gotoparty",
              title: "go to party",
              date: "today",
              completed: false
            },
            {
              "id": "startmeetupgroup",
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
    this.state = emptyState;
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
  changeFocusedCategory(index){
    this.setState(() => {
      return {
        focusedCategory: index,
        focusedGoal: null
      }
    });
    this.setSubtitle();
  }
  handleAddGoal(goal, date, category){
    if (!goal){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      return {
        goals: prevState.goals.concat({id: goal, title: goal, category: category, date: date, completed: false, tasks: []}),
        goldAmount: prevState.goldAmount + 1,
        focusedGoal: goal
      }
    });
    this.setSubtitle();
  }
  handleAddCategory(category){
    if (!category){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      return {
        categories: prevState.categories.concat({id: category, title: category}),
        goldAmount: prevState.goldAmount + 1,
        focusedCategory: category,
        focusedGoal: null
      }
    });
    this.setSubtitle();
  }
  handleAddTask(task, date, goalIndex){
    if (!task){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      //const updatedTasks = prevState.goals.filter(g => g.id === goalIndex)[0].tasks.concat({title: task, date: date, completed: false})
      const prevStateCopy = prevState
      let goal = prevStateCopy.goals.filter(g => g.id === goalIndex)[0]
      let updatedTasks = goal.tasks.concat({id: task, title: task, date: date, completed: false})
      goal.tasks = updatedTasks

      const goalStatus = this.setGoalStatus(goal)
      goal.completed = goalStatus;

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
      const currentValue = prevState.goals.filter(g => g.id === goalIndex)[0].tasks.filter(t => t.id === taskIndex)[0].completed
      const prevStateCopy = prevState
      prevStateCopy.goals.filter(g => g.id === goalIndex)[0].tasks.filter(t => t.id === taskIndex)[0].completed = !currentValue

      const goalStatus = this.setGoalStatus(prevStateCopy.goals.filter(g => g.id === goalIndex)[0])
      prevStateCopy.goals.filter(g => g.id === goalIndex)[0].completed = goalStatus;

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
      prevStateCopy.goals.filter(g => g.id === goalIndex)[0].tasks.splice(taskIndex, 1);
      const goalStatus = this.setGoalStatus(prevStateCopy.goals.filter(g => g.id === goalIndex)[0])
      prevStateCopy.goals.filter(g => g.id === goalIndex)[0].completed = goalStatus;
      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  }
  handleDeleteGoal(goalIndex){

    if (this.state.focusedGoal === goalIndex){
      this.setState(() => {
      return {
        focusedGoal: null
      }
    });
  }

    this.setState((prevState) => {

      const prevStateCopy = prevState

      let index = prevStateCopy.goals.findIndex((g, i) => {
        if (g.id === goalIndex){
          return true
        }
      });
      console.log("index", index);
      prevStateCopy.goals.splice(index, 1);
      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();

  }
  handleDeleteCategory(categoryIndex){

    if (this.state.focusedCategory === categoryIndex){
      this.setState(() => {
      return {
        focusedCategory: null
      }
    });
  }

    this.setState((prevState) => {

      const prevStateCopy = prevState

      let index = prevStateCopy.categories.findIndex((c, i) => {
        if (c.id === categoryIndex){
          return true
        }
      });
      console.log(index)
      prevStateCopy.categories.splice(index, 1);
      return {
        categories: prevStateCopy.categories,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();

  }
  filteredGoals(){
    if (this.state.focusedCategory){

      const newGoals = this.state.goals.filter((g, i) => {
        if (g.category === this.state.focusedCategory){
          return g
        }
      });
      return newGoals
    }
    else{
      return this.state.goals
    }
  }
  displayTasks(){
    if (this.state.focusedGoal){
      const loadTasks = () => {
        if (this.state.goals.filter(g => g.id === this.state.focusedGoal)[0]){
          return(
          <Tasks
            tasks={this.state.goals.filter(g => g.id === this.state.focusedGoal)[0].tasks}
            goalIndex={this.state.focusedGoal}
            handleCheck={this.handleCheck}
            handleDeleteTask={this.handleDeleteTask}/>
            )
        }
      };
    return(
      <div>
      <FocusedGoal goal={this.state.goals.filter(g => g.id === this.state.focusedGoal)[0]}/>
      {loadTasks()}
      <AddTask
        goalIndex={this.state.focusedGoal} handleAddTask={this.handleAddTask}/>
      </div>
    )
    }
  }
  displayGoals(){
    if (this.state.focusedCategory){
      return (
        <div>
          <Goals
            goals={this.filteredGoals()} category={this.state.focusedCategory} changeFocusedGoal={this.changeFocusedGoal} handleDeleteGoal={this.handleDeleteGoal}/>
          <AddGoal
            category={this.state.focusedCategory}
            handleAddGoal={this.handleAddGoal} />
        </div>
      )
    }
  }

render(){
    const title = "Gobits";
    console.log(this.state)
    return (
      <div>
        <Header title={title} subtitle={this.state.subtitle}/>
        <hr/>
        <User user={this.state.user}/>
        <hr/>
        <Categories
          categories={this.state.categories} changeFocusedCategory={this.changeFocusedCategory} handleDeleteCategory={this.handleDeleteCategory}/>
        <AddCategory
          handleAddCategory={this.handleAddCategory}/>
        <hr/>
        {this.displayGoals()}
        <hr/>
        {this.displayTasks()}

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
        <h1 id="headliner">{this.props.title}</h1>
        <p id="tagliner">{this.props.subtitle}</p>
      </div>
    );

  }
}

//options or tasks
class Goals extends React.Component {
  render(){
    return (
      <div>
        <h2>Goals for {this.props.category}</h2>
        {this.props.goals.map((o,i) => { return <Goal
          key={i}
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
    this.props.changeFocusedGoal(this.props.goal.id)
  }
  render(){
    return (
      <li className={!this.props.goal.completed ? "notCompleted" : "completed"}>
        <a onClick={this.changeFocusedGoal}>{this.props.goal.title} by {this.props.goal.date}</a>
      <span className="fa fa-trash"
        onClick={(e) => {
          this.props.handleDeleteGoal(this.props.goal.id);
        }}
      />
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
    const date = e.target.elements.date.value
    const goal = e.target.elements.goal.value.trim();
    const error = this.props.handleAddGoal(goal, date, this.props.category);
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
        <input type="date" name="date"/>
        <button><span className="fa fa-plus"/></button>
      </form>
      </div>
    );
  }
}

//options or tasks
class Categories extends React.Component {
  render(){
    return (
      <div>
        <h2>Categories</h2>
        <ul>
        {this.props.categories.map((c,i) => { return <Category
          key={i}
          category={c}
          changeFocusedCategory={this.props.changeFocusedCategory}
          handleDeleteCategory={this.props.handleDeleteCategory}
        />})}
        </ul>
      </div>
    );
  }
}

class Category extends React.Component {
  constructor(props){
    super(props)
    this.changeFocusedCategory = this.changeFocusedCategory.bind(this)
  }
  changeFocusedCategory(){
    this.props.changeFocusedCategory(this.props.category.id)
  }
  render(){
    return (
      <li><a onClick={this.changeFocusedCategory}>{this.props.category.title}</a>
        <span className="fa fa-trash"
          onClick={(e) => {
            this.props.handleDeleteCategory(this.props.category.id);
          }}
        />
      </li>
    );
  }
}

class AddCategory extends React.Component {
  constructor(props){
    super(props)
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddCategory(e){
    e.preventDefault()
    const category = e.target.elements.category.value.trim();
    const error = this.props.handleAddCategory(category);
    this.setState(() => {
      return { error };
    });
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddCategory}>
        <input type="text" name="category"/>
        <button><span className="fa fa-plus"/></button>
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
        {this.props.tasks && this.props.tasks.map((t, i) => { return <Task
          key={t.title}
          task={t}
          index={t.id}
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
      <span className="fa fa-trash"
        onClick={(e) => {
          props.handleDeleteTask(props.index, props.goalIndex);
        }}
      />
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
    const date = e.target.elements.date.value;
    const task = e.target.elements.task.value.trim();
    const error = this.props.handleAddTask(task, date, this.props.goalIndex);
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
        <input type="date" name="date"/>
        <button><span className="fa fa-plus"/></button>
      </form>
      </div>
    );
  }
}

class User extends React.Component {
  render(){
    return (
      <div>
        <h2 id="me">Me: {this.props.user.name} {this.props.user.email}</h2>
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
