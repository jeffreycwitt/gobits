"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoBitsApp = function (_React$Component) {
  _inherits(GoBitsApp, _React$Component);

  function GoBitsApp(props) {
    _classCallCheck(this, GoBitsApp);

    var _this = _possibleConstructorReturn(this, (GoBitsApp.__proto__ || Object.getPrototypeOf(GoBitsApp)).call(this, props));

    _this.changeFocusedGoal = _this.changeFocusedGoal.bind(_this);
    _this.handleAddGoal = _this.handleAddGoal.bind(_this);
    _this.handleAddTask = _this.handleAddTask.bind(_this);
    _this.handleCheck = _this.handleCheck.bind(_this);
    _this.handleDeleteTask = _this.handleDeleteTask.bind(_this);
    _this.handleDeleteGoal = _this.handleDeleteGoal.bind(_this);
    _this.setSubtitle = _this.setSubtitle.bind(_this);
    _this.state = {
      subtitle: "Get your life together",
      messages: ["Get your life together", "Aren't you better than this?", "Seriously, Aren't you better than this?", "Life really isn't that hard; why are you having so much trouble", "Other people don't need a to do list; they just do stuff", "Get it together!", "Stopping making to do lists and just do your work!", "Why are you have so much trouble getting stuff done it?"],
      focusedGoal: 0,
      goals: [{
        title: "get new job",
        category: "job",
        date: "June, 2016",
        completed: false,
        tasks: [{
          title: "create resume",
          date: "today",
          completed: false
        }, {
          title: "send out resume",
          date: "week",
          completed: false
        }]
      }, {
        title: "make new friend",
        category: "social",
        date: "May, 2016",
        completed: false,
        tasks: [{
          title: "go to party",
          date: "today",
          completed: false
        }, {
          title: "start meet up group",
          date: "week",
          completed: false
        }]
      }],
      user: {
        name: "Jeffrey C. Witt",
        email: "jeffreycwitt@gmail.com"
      },
      goldAmount: 10
    };
    return _this;
  }

  _createClass(GoBitsApp, [{
    key: "setSubtitle",
    value: function setSubtitle() {
      var randomNum = Math.floor(Math.random() * this.state.messages.length);
      var message = this.state.messages[randomNum];
      this.setState(function () {
        return {
          subtitle: message
        };
      });
    }
  }, {
    key: "changeFocusedGoal",
    value: function changeFocusedGoal(index) {
      this.setState(function () {
        return {
          focusedGoal: index
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleAddGoal",
    value: function handleAddGoal(goal) {
      if (!goal) {
        return 'Enter valid value to add item';
      }
      this.setState(function (prevState) {
        return {
          goals: prevState.goals.concat({ title: goal, completed: false, tasks: [] }),
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleAddTask",
    value: function handleAddTask(task, goalIndex) {
      var _this2 = this;

      if (!task) {
        return 'Enter valid value to add item';
      }
      this.setState(function (prevState) {
        var updatedTasks = prevState.goals[goalIndex].tasks.concat({ title: task, completed: false });
        var prevStateCopy = prevState;
        prevStateCopy.goals[goalIndex].tasks = updatedTasks;

        var goalStatus = _this2.setGoalStatus(prevStateCopy.goals[goalIndex]);
        prevStateCopy.goals[goalIndex].completed = goalStatus;

        return {
          goals: prevStateCopy.goals,
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "setGoalStatus",
    value: function setGoalStatus(goal) {
      var goalStatus = true;
      goal.tasks.forEach(function (t) {
        if (t.completed === false) {
          goalStatus = false;
        }
      });
      return goalStatus;
    }
  }, {
    key: "handleCheck",
    value: function handleCheck(taskIndex, goalIndex) {
      var _this3 = this;

      this.setState(function (prevState) {
        var currentValue = prevState.goals[goalIndex].tasks[taskIndex].completed;
        var prevStateCopy = prevState;
        prevStateCopy.goals[goalIndex].tasks[taskIndex].completed = !currentValue;

        var goalStatus = _this3.setGoalStatus(prevStateCopy.goals[goalIndex]);
        prevStateCopy.goals[goalIndex].completed = goalStatus;

        return {
          goals: prevStateCopy.goals,
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleDeleteTask",
    value: function handleDeleteTask(taskIndex, goalIndex) {
      var _this4 = this;

      this.setState(function (prevState) {
        var prevStateCopy = prevState;
        prevStateCopy.goals[goalIndex].tasks.splice(taskIndex, 1);
        var goalStatus = _this4.setGoalStatus(prevStateCopy.goals[goalIndex]);
        prevStateCopy.goals[goalIndex].completed = goalStatus;
        return {
          goals: prevStateCopy.goals,
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleDeleteGoal",
    value: function handleDeleteGoal(goalIndex) {

      this.setState(function (prevState) {
        var prevStateCopy = prevState;
        prevStateCopy.goals.splice(goalIndex, 1);
        return {
          goals: prevStateCopy.goals,
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "render",
    value: function render() {
      var title = "Gobits";

      console.log;
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: title, subtitle: this.state.subtitle }),
        React.createElement("hr", null),
        React.createElement(User, { user: this.state.user }),
        React.createElement("hr", null),
        React.createElement(Goals, {
          goals: this.state.goals, changeFocusedGoal: this.changeFocusedGoal }),
        React.createElement(AddGoal, {
          handleAddGoal: this.handleAddGoal }),
        React.createElement("hr", null),
        React.createElement(FocusedGoal, { key: this.state.goals[this.state.focusedGoal].title, goal: this.state.goals[this.state.focusedGoal] }),
        React.createElement(Tasks, {
          tasks: this.state.goals[this.state.focusedGoal].tasks,
          goalIndex: this.state.focusedGoal,
          handleCheck: this.handleCheck,
          handleDeleteTask: this.handleDeleteTask }),
        React.createElement(AddTask, {
          goalIndex: this.state.focusedGoal, handleAddTask: this.handleAddTask }),
        React.createElement("hr", null),
        React.createElement(Gold, {
          goldAmount: this.state.goldAmount })
      );
    }
  }]);

  return GoBitsApp;
}(React.Component);

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          this.props.title
        ),
        React.createElement(
          "p",
          null,
          this.props.subtitle
        )
      );
    }
  }]);

  return Header;
}(React.Component);

//options or tasks


var Goals = function (_React$Component3) {
  _inherits(Goals, _React$Component3);

  function Goals() {
    _classCallCheck(this, Goals);

    return _possibleConstructorReturn(this, (Goals.__proto__ || Object.getPrototypeOf(Goals)).apply(this, arguments));
  }

  _createClass(Goals, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Goals"
        ),
        this.props.goals.map(function (o, i) {
          return React.createElement(Goal, {
            key: i,
            index: i,
            goal: o,
            changeFocusedGoal: _this7.props.changeFocusedGoal,
            handleDeleteGoal: _this7.props.handleDeleteGoal
          });
        })
      );
    }
  }]);

  return Goals;
}(React.Component);

var Goal = function (_React$Component4) {
  _inherits(Goal, _React$Component4);

  function Goal(props) {
    _classCallCheck(this, Goal);

    var _this8 = _possibleConstructorReturn(this, (Goal.__proto__ || Object.getPrototypeOf(Goal)).call(this, props));

    _this8.changeFocusedGoal = _this8.changeFocusedGoal.bind(_this8);
    return _this8;
  }

  _createClass(Goal, [{
    key: "changeFocusedGoal",
    value: function changeFocusedGoal() {
      this.props.changeFocusedGoal(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return React.createElement(
        "li",
        { className: !this.props.goal.completed ? "notCompleted" : "completed", onClick: this.changeFocusedGoal },
        this.props.goal.title,
        " by ",
        this.props.goal.date,
        React.createElement(
          "button",
          {
            onClick: function onClick(e) {
              props.handleDeleteGoal(_this9.props.goalIndex);
            }
          },
          "remove"
        )
      );
    }
  }]);

  return Goal;
}(React.Component);

var AddGoal = function (_React$Component5) {
  _inherits(AddGoal, _React$Component5);

  function AddGoal(props) {
    _classCallCheck(this, AddGoal);

    var _this10 = _possibleConstructorReturn(this, (AddGoal.__proto__ || Object.getPrototypeOf(AddGoal)).call(this, props));

    _this10.handleAddGoal = _this10.handleAddGoal.bind(_this10);
    _this10.state = {
      error: undefined
    };
    return _this10;
  }

  _createClass(AddGoal, [{
    key: "handleAddGoal",
    value: function handleAddGoal(e) {
      e.preventDefault();
      var goal = e.target.elements.goal.value.trim();
      var error = this.props.handleAddGoal(goal);
      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.error && React.createElement(
          "p",
          null,
          this.state.error
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleAddGoal },
          React.createElement("input", { type: "text", name: "goal" }),
          React.createElement(
            "button",
            null,
            "Add Goal"
          )
        )
      );
    }
  }]);

  return AddGoal;
}(React.Component);

var FocusedGoal = function (_React$Component6) {
  _inherits(FocusedGoal, _React$Component6);

  function FocusedGoal() {
    _classCallCheck(this, FocusedGoal);

    return _possibleConstructorReturn(this, (FocusedGoal.__proto__ || Object.getPrototypeOf(FocusedGoal)).apply(this, arguments));
  }

  _createClass(FocusedGoal, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "h2",
        null,
        "Tasks for ",
        this.props.goal.title
      );
    }
  }]);

  return FocusedGoal;
}(React.Component);

var Tasks = function (_React$Component7) {
  _inherits(Tasks, _React$Component7);

  function Tasks() {
    _classCallCheck(this, Tasks);

    return _possibleConstructorReturn(this, (Tasks.__proto__ || Object.getPrototypeOf(Tasks)).apply(this, arguments));
  }

  _createClass(Tasks, [{
    key: "render",
    value: function render() {
      var _this13 = this;

      return React.createElement(
        "div",
        null,
        this.props.tasks.map(function (t, i) {
          return React.createElement(Task, {
            key: t.title,
            task: t,
            index: i,
            goalIndex: _this13.props.goalIndex,
            handleCheck: _this13.props.handleCheck,
            handleDeleteTask: _this13.props.handleDeleteTask });
        })
      );
    }
  }]);

  return Tasks;
}(React.Component);

var Task = function Task(props) {
  return React.createElement(
    "li",
    { className: !props.task.completed ? "notCompleted" : "completed" },
    props.task.title,
    " by ",
    props.task.date,
    React.createElement("input", {
      type: "checkbox",
      onChange: function onChange(e) {
        props.handleCheck(props.index, props.goalIndex);
      }
    }),
    React.createElement(
      "button",
      {
        onClick: function onClick(e) {
          props.handleDeleteTask(props.index, props.goalIndex);
        }
      },
      "remove"
    )
  );
};

var AddTask = function (_React$Component8) {
  _inherits(AddTask, _React$Component8);

  function AddTask(props) {
    _classCallCheck(this, AddTask);

    var _this14 = _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).call(this, props));

    _this14.handleAddTask = _this14.handleAddTask.bind(_this14);
    _this14.state = {
      error: undefined
    };
    return _this14;
  }

  _createClass(AddTask, [{
    key: "handleAddTask",
    value: function handleAddTask(e) {
      e.preventDefault();
      var task = e.target.elements.task.value.trim();
      var error = this.props.handleAddTask(task, this.props.goalIndex);
      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.error && React.createElement(
          "p",
          null,
          this.state.error
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleAddTask },
          React.createElement("input", { type: "text", name: "task" }),
          React.createElement(
            "button",
            null,
            "Add Task"
          )
        )
      );
    }
  }]);

  return AddTask;
}(React.Component);

var User = function (_React$Component9) {
  _inherits(User, _React$Component9);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          this.props.user.name
        ),
        React.createElement(
          "p",
          null,
          this.props.user.email
        )
      );
    }
  }]);

  return User;
}(React.Component);

var Gold = function (_React$Component10) {
  _inherits(Gold, _React$Component10);

  function Gold() {
    _classCallCheck(this, Gold);

    return _possibleConstructorReturn(this, (Gold.__proto__ || Object.getPrototypeOf(Gold)).apply(this, arguments));
  }

  _createClass(Gold, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Gold amount ",
          this.props.goldAmount
        )
      );
    }
  }]);

  return Gold;
}(React.Component);

ReactDOM.render(React.createElement(GoBitsApp, null), document.getElementById('app'));
