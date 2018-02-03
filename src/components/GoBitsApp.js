import React from 'react';
import ReactDOM from 'react-dom';
import Gold from './Gold'
import User from './User'
import AddTask from './AddTask'
import Tasks from './Tasks'
import AddCategory from './AddCategory'
import Categories from './Categories'
import AddGoal from './AddGoal'
import Goals from './Goals'
import Header from './Header'

export default class GoBitsApp extends React.Component {
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
  componentDidMount(){
    // try to load data from local storage
    try {
      const state = JSON.parse(localStorage.getItem("gobitsState"));
      //only load state if state is not empty
      if (state){
          this.setState(() => (state));
        }
    }
    // if local storage fails do nothing and proceed with the default state
    catch (e) {


    }

  }
  componentDidUpdate(){
    localStorage.setItem("gobitsState", JSON.stringify(this.state))

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
    if (goal.tasks.length > 0) {
      goal.tasks.forEach((t) =>{
        if (t.completed === false){
          goalStatus = false
        }
      });
    }
    else{
      goalStatus = false
    }
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
      let taskDeleteIndex = prevStateCopy.goals.filter(g => g.id === goalIndex)[0].tasks.findIndex((g, i) => {
        if (g.id === goalIndex){
          return true
        }
      });
      prevStateCopy.goals.filter(g => g.id === goalIndex)[0].tasks.splice(taskDeleteIndex, 1);
      // set goal status

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
      {
        //<FocusedGoal goal={this.state.goals.filter(g => g.id === this.state.focusedGoal)[0]}/>
      }
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
            goals={this.filteredGoals()} focusedGoal={this.state.focusedGoal} category={this.state.focusedCategory} changeFocusedGoal={this.changeFocusedGoal} handleDeleteGoal={this.handleDeleteGoal}/>
          <AddGoal
            category={this.state.focusedCategory}
            handleAddGoal={this.handleAddGoal} />
        </div>
      )
    }
  }

render(){
    const title = "Gobits";
    return (
      <div>
        <Header title={title} subtitle={this.state.subtitle}/>
        <hr/>
        <User user={this.state.user}/>
        <hr/>
        <div className="row">
          <div className="col-sm-4">
            <Categories
              focusedCategory={this.state.focusedCategory} categories={this.state.categories} changeFocusedCategory={this.changeFocusedCategory} handleDeleteCategory={this.handleDeleteCategory}/>
            <AddCategory
              handleAddCategory={this.handleAddCategory}/>
          </div>
          <div className="col-sm-4">
            {this.displayGoals()}
          </div>
          <div className="col-sm-4">
            {this.displayTasks()}
          </div>
        </div>
        <Gold
          goldAmount={this.state.goldAmount}/>
      </div>
    )
  }
}
