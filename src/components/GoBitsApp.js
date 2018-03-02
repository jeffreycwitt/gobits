import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import uuidv4 from 'uuid/v4'

import Gold from './Gold'
import User from './User'
import AddTask from './AddTask'
import Tasks from './Tasks'
import AddCategory from './AddCategory'
import Categories from './Categories'
import AddGoal from './AddGoal'
import Goals from './Goals'
import Header from './Header'
import Today from './Today'
import NavBar from './NavBar'
import EditTaskModal from './EditTaskModal'

export default class GoBitsApp extends React.Component {
  emptyState =  {
    subtitle: "Get your life together",
    display: "today",
    focusedDate: undefined,
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
    focusedTask: undefined,
    focusedGoal: undefined,
    focusedCategory: undefined,
    categories: [
      {
        id: "uncategorized",
        title: "Uncategorized"
      }
    ],
    goals: [
      {
        id: "uncategorized-goal",
        title: "Uncategorized",
        category: "uncategorized"
      }
    ],
    tasks: [],
    user: {
      name: "John Doe",
      email: "johndoe@example.com"
    },
    goldAmount: 0
  }


  testState =  {
    subtitle: "Get your life together",
    display: "today",
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
        completedAt: false,
        tasks: [
          {
            id: "createresume",
            title: "create resume",
            date: "today",
            completedAt: false
          },
          {
            id: "sendoutresume",
            title: "send out resume",
            date: "week",
            completedAt: false
          }
        ]
      },
      {
        id: "makenewfriend",
        title: "make new friend",
        category: "social",
        date: "May, 2016",
        completedAt: false,
        tasks: [
          {
            "id": "gotoparty",
            title: "go to party",
            date: "today",
            completedAt: false
          },
          {
            "id": "startmeetupgroup",
            title: "start meet up group",
            date: "week",
            completedAt: false
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
  state = this.emptyState;

  setSubtitle = () => {
    const randomNum = Math.floor(Math.random() * this.state.messages.length)
    const message = this.state.messages[randomNum];
    this.setState(() => {
      return {
        subtitle: message
      }
    });


  };
  changeFocusedGoal = (index) => {
    this.setState(() => {
      return {
        focusedGoal: index
      }
    });
    this.setSubtitle();
  };
  changeFocusedCategory = (index) => {
    this.setState(() => {
      return {
        focusedCategory: index,
        focusedGoal: undefined
      }
    });
    this.setSubtitle();
  };
  handleAddGoal = (goal, date, category) => {
    if (!goal){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      const goalId = uuidv4();
      return {
        goals: prevState.goals.concat(
          {
            id: goalId,
            title: goal,
            category: category,
            date: date,
            completedAt: false,
            createdAt: moment().format()
          }
        ),
        goldAmount: prevState.goldAmount + 1,
        focusedGoal: goalId
      }
    });
    this.setSubtitle();
  };
  handleAddCategory = (category) => {
    if (!category){
      return 'Enter valid value to add item';
    }
    this.setState((prevState) => {
      const categoryId = uuidv4();
      return {
        categories: prevState.categories.concat(
          {
            id: categoryId,
            title: category,
            createdAt: moment().format()
          }
        ),
        goals: prevState.goals.concat(
          {
            id: uuidv4(),
            title: "Uncategorized",
            category: categoryId,
            createdAt: moment().format()
          }
        ),
        goldAmount: prevState.goldAmount + 1,
        focusedCategory: categoryId,
        focusedGoal: undefined
      }
    });
    this.setSubtitle();
  };
  handleAddTask = (task, date, goalId, category) => {
    if (!task){
      return 'Enter valid value to add item';
    }
    if (!goalId){
      goalId = "uncategorized-goal"
    }
    if (date === "today"){
      date = moment().format("YYYY-MM-DD")
    }
    this.setState((prevState) => {
      //const updatedTasks = prevState.goals.filter(g => g.id === goalIndex)[0].tasks.concat({title: task, date: date, completed: false})
      return {
        tasks: prevState.tasks.concat(
          {
            id: uuidv4(),
            title: task,
            date: date,
            completedAt: false,
            createdAt: moment().format(),
            rejectedCount: 0,
            goal: goalId
          }
        ),
        goldAmount: prevState.goldAmount + 1,
      }
    });
    this.setSubtitle();
  };
  handleUpdateTask = (taskId, title, date, goalId) => {
    if (!taskId){
      return 'Enter valid value to add item';
    }
    if (!goalId){
      goalId = "uncategorized-goal"
    }
    if (date === "today"){
      date = moment().format("YYYY-MM-DD")
    }
    this.setState((prevState) => {
      //const updatedTasks = prevState.goals.filter(g => g.id === goalIndex)[0].tasks.concat({title: task, date: date, completed: false})
      let prevStateCopy = prevState
      prevStateCopy.tasks.filter(t => t.id === taskId)[0].title = title;
      prevStateCopy.tasks.filter(t => t.id === taskId)[0].date = date;
      prevStateCopy.tasks.filter(t => t.id === taskId)[0].goal = goalId;

      return {
        tasks: prevStateCopy.tasks,
        goldAmount: prevState.goldAmount + 1,
      }
    });
    this.setSubtitle();
  };
  setGoalStatus = (goal) => {
    //start with assumption that goal is completed
    let goalStatus = moment().format();
    let goalsPerTask = 0;
    // check to see if there are any completed tasks for this goal
    this.state.tasks.forEach((t) =>{
      if (t.goal === goal.id){
        goalsPerTask++;
        if (t.completedAt === false){
          goalStatus = false;
        }
      }
    });
    //check to see if there are any tasks for this goal
    if (goalsPerTask === 0) {
      goalStatus = false
    }
    return goalStatus
  };
  handleCheck = (taskId, goalId) => {

    this.setState((prevState) => {
      if (!goalId){
        goalId = prevState.tasks.filter(t => t.id === taskId)[0].goal
      }
      const currentValue = prevState.tasks.filter(t => t.id === taskId)[0].completedAt
      const prevStateCopy = prevState
      prevStateCopy.tasks.filter(t => t.id === taskId)[0].completedAt = !currentValue ? moment().format() : false;
      const goalStatus = this.setGoalStatus(prevStateCopy.goals.filter(g => g.id === goalId)[0]);
      prevStateCopy.goals.filter(g => g.id === goalId)[0].completedAt = goalStatus;

      return {
        goals: prevStateCopy.goals,
        tasks: prevStateCopy.tasks,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  };

  // findGoalIndexFromTask = (taskId, prevState) => {
  //   let goalId = prevState.goals.filter((g) =>{
  //     let goalid = "";
  //     g.tasks.forEach((t) => {
  //       if (t.id === taskIndex){
  //         console.log(g)
  //         goalid = g.id
  //       }
  //     });
  //     return goalid
  //   });
  //   goalIndex = goalIndex[0].id
  //   console.log(goalIndex);
  //   return goalIndex;
  // }

  handleThumbsDown = (taskId, goalId) => {
    this.setState((prevState) => {
      if (!goalId){
        goalId = prevState.tasks.filter(t => t.id === taskId)[0].goal;
      }

      const currentValue = prevState.tasks.filter(t => t.id === taskId)[0].rejectedCount;
      const prevStateCopy = prevState;
      prevStateCopy.tasks.filter(t => t.id === taskId)[0].rejectedCount = currentValue + 1;

      const goalStatus = this.setGoalStatus(prevStateCopy.goals.filter(g => g.id === goalId)[0]);
      prevStateCopy.goals.filter(g => g.id === goalId)[0].completedAt = goalStatus;

      return {
        goals: prevStateCopy.goals,
        tasks: prevStateCopy.tasks,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  };
  handleDeleteTask = (taskId, goalId) => {
    this.setState((prevState) => {
      if (!goalId){
        goalId = prevState.tasks.filter(t => t.id === taskId)[0].goal;
      }
      const prevStateCopy = prevState
      let taskDeleteIndex = prevStateCopy.tasks.findIndex((t, i) => {
        if (t.id === taskId){
          return true
        }
      });
      prevStateCopy.tasks.splice(taskDeleteIndex, 1);
      // set goal status

      const goalStatus = this.setGoalStatus(prevStateCopy.goals.filter(g => g.id === goalId)[0])
      prevStateCopy.goals.filter(g => g.id === goalId)[0].completedAt = goalStatus;

      return {
        goals: prevStateCopy.goals,
        tasks: prevStateCopy.tasks,
        goldAmount: prevState.goldAmount + 1

      }
    });
    this.setSubtitle();
  };
  handleDeleteGoal = (goalId) => {

    if (this.state.focusedGoal === goalId){
      this.setState(() => {
      return {
        focusedGoal: undefined
      }
    });
  }

    this.setState((prevState) => {

      const prevStateCopy = prevState

      let goalDeleteIndex = prevStateCopy.goals.findIndex((g, i) => {
        if (g.id === goalIndex){
          return true
        }
      });
      prevStateCopy.goals.splice(goalDeleteIndex, 1);
      return {
        goals: prevStateCopy.goals,
        goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();

  };
  handleDeleteCategory = (categoryId) => {

    if (this.state.focusedCategory === categoryId){
      this.setState(() => {
      return {
        focusedCategory: undefined
        }
      });
    }

    this.setState((prevState) => {

    const prevStateCopy = prevState

    let categoryDeleteIndex = prevStateCopy.categories.findIndex((c, i) => {
      if (c.id === categoryId){
        return true
      }
    });
    prevStateCopy.categories.splice(categoryDeleteIndex, 1);
    return {
      categories: prevStateCopy.categories,
      goldAmount: prevState.goldAmount + 1
      }
    });
    this.setSubtitle();
  };

  handleClearFocusedTask = () => {
    this.setState(() => {
      return {
        focusedTask: undefined
      }
    });
  };
  handleFocusTask = (taskId) => {
    this.setState(() => {
      return {
        focusedTask: taskId
      }
    });
  };

  filteredGoals = () => {
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
  };
  filteredTasks = () => {
    if (this.state.focusedGoal){
      const tasks = this.state.tasks.filter((t, i) => {
        if (t.goal === this.state.focusedGoal){
          return t
        }
      });
      return tasks;
    }
    else{
      return this.state.tasks;
    }
  };
  filteredTodaysTasks = (date) => {
    if (!date){
      date = moment().format("YYYY-MM-DD")
    }

    const todaysTasks = this.state.tasks.filter((t,i) => {
      if (t.date === date){
        return t
        }
      });
    return todaysTasks;
  };
  displayTasks = () => {
    if (this.state.focusedGoal){
      return(
        <div>
            <Tasks
              tasks={this.filteredTasks()}
              goalId={this.state.focusedGoal}
              handleCheck={this.handleCheck}
              handleDeleteTask={this.handleDeleteTask}
              handleThumbsDown={this.handleThumbsDown}
              handleFocusTask={this.handleFocusTask}
            />
            <AddTask
              goalId={this.state.focusedGoal} handleAddTask={this.handleAddTask}/>
        </div>
      )
    }
  };
  displayGoals = () => {
    if (this.state.focusedCategory){
      return (
        <div>
          <Goals
            goals={this.filteredGoals()}
            focusedGoal={this.state.focusedGoal}
            category={this.state.focusedCategory}
            changeFocusedGoal={this.changeFocusedGoal}
            handleDeleteGoal={this.handleDeleteGoal}/>
          <AddGoal
            category={this.state.focusedCategory}
            handleAddGoal={this.handleAddGoal} />
        </div>
      )
    }
  };
  displayDashboard = () => {
    return(
      <div className="dashboard row">
        <div className="col-sm-4">
          <Categories
            focusedCategory={this.state.focusedCategory}
            categories={this.state.categories}
            changeFocusedCategory={this.changeFocusedCategory}
            handleDeleteCategory={this.handleDeleteCategory}/>
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
    )
  };
  handleChangeFocusDate = (date) => {
    this.setState(() => {
      return{focusedDate: date}
    });
  };
  displayToday = (date) => {
    return(
      <div className="today">
        <Today
          tasks={this.filteredTodaysTasks(this.state.focusedDate)}
          goalId={this.state.focusedGoal}
          handleCheck={this.handleCheck}
          handleDeleteTask={this.handleDeleteTask}
          handleThumbsDown={this.handleThumbsDown}
          handleChangeFocusDate={this.handleChangeFocusDate}
          focusedDate={this.state.focusedDate}
          handleFocusTask={this.handleFocusTask}
        />
          <AddTask
            goalId={this.state.focusedGoal}
            handleAddTask={this.handleAddTask}
            display={this.state.display}
            focusedDate={this.state.focusedDate}
            goals={this.state.goals}
            categories={this.state.categories}
          />
      </div>


    )
  };
  handleChangeView = () => {
    if (this.state.display === "dashboard"){
      this.setState(() => {
        return{display: "today"}
        });
      }
    else {
      this.setState(() => {
        return{display: "dashboard"}
      });
    };
  };
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
  render(){
    const title = "Gobits";
    console.log("state at render", this.state)
    return (
      <div>
        <Header title={title} subtitle={this.state.subtitle} />
        <hr/>
        <User user={this.state.user}/>
        <NavBar currentView={this.state.display} changeView={this.handleChangeView}/>
        <hr/>
        {this.state.display === "dashboard" ? this.displayDashboard() : this.displayToday()}
        <Gold
          goldAmount={this.state.goldAmount}/>

        <EditTaskModal
          handleClearFocusedTask={this.handleClearFocusedTask}
          editTask={this.state.tasks.filter(t => t.id === this.state.focusedTask)[0]}
          focusedTask={this.state.focusedTask}
          goalId={this.state.focusedGoal}
          handleUpdateTask={this.handleUpdateTask}
          display={this.state.display}
          focusedDate={this.state.focusedDate}
          goals={this.state.goals}
          categories={this.state.categories}
        />
      </div>
    )
  }
}
