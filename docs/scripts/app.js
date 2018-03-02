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
    _this.changeFocusedCategory = _this.changeFocusedCategory.bind(_this);
    _this.handleAddCategory = _this.handleAddCategory.bind(_this);
    _this.handleDeleteCategory = _this.handleDeleteCategory.bind(_this);
    _this.handleAddTask = _this.handleAddTask.bind(_this);
    _this.handleCheck = _this.handleCheck.bind(_this);
    _this.handleDeleteTask = _this.handleDeleteTask.bind(_this);
    _this.handleDeleteGoal = _this.handleDeleteGoal.bind(_this);
    _this.setSubtitle = _this.setSubtitle.bind(_this);
    _this.displayTasks = _this.displayTasks.bind(_this);
    _this.filteredGoals = _this.filteredGoals.bind(_this);
    var emptyState = {
      subtitle: "Get your life together",
      messages: ["Get your life together", "Aren't you better than this?", "Seriously, Aren't you better than this?", "Life really isn't that hard; why are you having so much trouble", "Other people don't need a to do list; they just do stuff", "Get it together!", "Stopping making to do lists and just do your work!", "Why are you have so much trouble getting stuff done it?"],
      focusedGoal: null,
      focusedCategory: null,
      categories: [],
      goals: [],
      user: {
        name: "John Doe",
        email: "johndoe@example.com"
      },
      goldAmount: 0
    };

    var testState = {
      subtitle: "Get your life together",
      messages: ["Get your life together", "Aren't you better than this?", "Seriously, Aren't you better than this?", "Life really isn't that hard; why are you having so much trouble", "Other people don't need a to do list; they just do stuff", "Get it together!", "Stopping making to do lists and just do your work!", "Why are you have so much trouble getting stuff done it?"],
      focusedGoal: null,
      focusedCategory: null,
      categories: [{
        id: "job",
        title: "job"
      }, {
        id: "social",
        title: "social"
      }, {
        id: "language",
        title: "language"
      }],
      goals: [{
        id: "learngerman",
        title: "learn german",
        category: "language",
        tasks: []
      }, {
        id: "learnfrench",
        title: "learn french",
        category: "language",
        tasks: []
      }, {
        id: "getnewjob",
        title: "get new job",
        category: "job",
        date: "June, 2016",
        completed: false,
        tasks: [{
          id: "createresume",
          title: "create resume",
          date: "today",
          completed: false
        }, {
          id: "sendoutresume",
          title: "send out resume",
          date: "week",
          completed: false
        }]
      }, {
        id: "makenewfriend",
        title: "make new friend",
        category: "social",
        date: "May, 2016",
        completed: false,
        tasks: [{
          "id": "gotoparty",
          title: "go to party",
          date: "today",
          completed: false
        }, {
          "id": "startmeetupgroup",
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
    _this.state = emptyState;
    return _this;
  }

  _createClass(GoBitsApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // try to load data from local storage
      try {
        var state = JSON.parse(localStorage.getItem("gobitsState"));
        //only load state if state is not empty
        if (state) {
          this.setState(function () {
            return state;
          });
        }
      }
      // if local storage fails do nothing and proceed with the default state
      catch (e) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      localStorage.setItem("gobitsState", JSON.stringify(this.state));
    }
  }, {
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
    key: "changeFocusedCategory",
    value: function changeFocusedCategory(index) {
      this.setState(function () {
        return {
          focusedCategory: index,
          focusedGoal: null
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleAddGoal",
    value: function handleAddGoal(goal, date, category) {
      if (!goal) {
        return 'Enter valid value to add item';
      }
      this.setState(function (prevState) {
        return {
          goals: prevState.goals.concat({ id: goal, title: goal, category: category, date: date, completed: false, tasks: [] }),
          goldAmount: prevState.goldAmount + 1,
          focusedGoal: goal
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleAddCategory",
    value: function handleAddCategory(category) {
      if (!category) {
        return 'Enter valid value to add item';
      }
      this.setState(function (prevState) {
        return {
          categories: prevState.categories.concat({ id: category, title: category }),
          goldAmount: prevState.goldAmount + 1,
          focusedCategory: category,
          focusedGoal: null
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleAddTask",
    value: function handleAddTask(task, date, goalIndex) {
      var _this2 = this;

      if (!task) {
        return 'Enter valid value to add item';
      }
      this.setState(function (prevState) {
        //const updatedTasks = prevState.goals.filter(g => g.id === goalIndex)[0].tasks.concat({title: task, date: date, completed: false})
        var prevStateCopy = prevState;
        var goal = prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0];
        var updatedTasks = goal.tasks.concat({ id: task, title: task, date: date, completed: false });
        goal.tasks = updatedTasks;

        var goalStatus = _this2.setGoalStatus(goal);
        goal.completed = goalStatus;

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
        var currentValue = prevState.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0].tasks.filter(function (t) {
          return t.id === taskIndex;
        })[0].completed;
        var prevStateCopy = prevState;
        prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0].tasks.filter(function (t) {
          return t.id === taskIndex;
        })[0].completed = !currentValue;

        var goalStatus = _this3.setGoalStatus(prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0]);
        prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0].completed = goalStatus;

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
        prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0].tasks.splice(taskIndex, 1);
        var goalStatus = _this4.setGoalStatus(prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0]);
        prevStateCopy.goals.filter(function (g) {
          return g.id === goalIndex;
        })[0].completed = goalStatus;
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

      if (this.state.focusedGoal === goalIndex) {
        this.setState(function () {
          return {
            focusedGoal: null
          };
        });
      }

      this.setState(function (prevState) {

        var prevStateCopy = prevState;

        var index = prevStateCopy.goals.findIndex(function (g, i) {
          if (g.id === goalIndex) {
            return true;
          }
        });
        prevStateCopy.goals.splice(index, 1);
        return {
          goals: prevStateCopy.goals,
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "handleDeleteCategory",
    value: function handleDeleteCategory(categoryIndex) {

      if (this.state.focusedCategory === categoryIndex) {
        this.setState(function () {
          return {
            focusedCategory: null
          };
        });
      }

      this.setState(function (prevState) {

        var prevStateCopy = prevState;

        var index = prevStateCopy.categories.findIndex(function (c, i) {
          if (c.id === categoryIndex) {
            return true;
          }
        });
        prevStateCopy.categories.splice(index, 1);
        return {
          categories: prevStateCopy.categories,
          goldAmount: prevState.goldAmount + 1
        };
      });
      this.setSubtitle();
    }
  }, {
    key: "filteredGoals",
    value: function filteredGoals() {
      var _this5 = this;

      if (this.state.focusedCategory) {

        var newGoals = this.state.goals.filter(function (g, i) {
          if (g.category === _this5.state.focusedCategory) {
            return g;
          }
        });
        return newGoals;
      } else {
        return this.state.goals;
      }
    }
  }, {
    key: "displayTasks",
    value: function displayTasks() {
      var _this6 = this;

      if (this.state.focusedGoal) {
        var loadTasks = function loadTasks() {
          if (_this6.state.goals.filter(function (g) {
            return g.id === _this6.state.focusedGoal;
          })[0]) {
            return React.createElement(Tasks, {
              tasks: _this6.state.goals.filter(function (g) {
                return g.id === _this6.state.focusedGoal;
              })[0].tasks,
              goalIndex: _this6.state.focusedGoal,
              handleCheck: _this6.handleCheck,
              handleDeleteTask: _this6.handleDeleteTask });
          }
        };
        return React.createElement(
          "div",
          null,
          loadTasks(),
          React.createElement(AddTask, {
            goalIndex: this.state.focusedGoal, handleAddTask: this.handleAddTask })
        );
      }
    }
  }, {
    key: "displayGoals",
    value: function displayGoals() {
      if (this.state.focusedCategory) {
        return React.createElement(
          "div",
          null,
          React.createElement(Goals, {
            goals: this.filteredGoals(), focusedGoal: this.state.focusedGoal, category: this.state.focusedCategory, changeFocusedGoal: this.changeFocusedGoal, handleDeleteGoal: this.handleDeleteGoal }),
          React.createElement(AddGoal, {
            category: this.state.focusedCategory,
            handleAddGoal: this.handleAddGoal })
        );
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = "Gobits";
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: title, subtitle: this.state.subtitle }),
        React.createElement("hr", null),
        React.createElement(User, { user: this.state.user }),
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-sm-4" },
            React.createElement(Categories, {
              focusedCategory: this.state.focusedCategory, categories: this.state.categories, changeFocusedCategory: this.changeFocusedCategory, handleDeleteCategory: this.handleDeleteCategory }),
            React.createElement(AddCategory, {
              handleAddCategory: this.handleAddCategory })
          ),
          React.createElement(
            "div",
            { className: "col-sm-4" },
            this.displayGoals()
          ),
          React.createElement(
            "div",
            { className: "col-sm-4" },
            this.displayTasks()
          )
        ),
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
          { id: "headliner" },
          this.props.title
        ),
        React.createElement(
          "p",
          { id: "tagliner" },
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
      var _this9 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Go(als)"
        ),
        this.props.goals.map(function (o, i) {
          return React.createElement(Goal, {
            key: i,
            goal: o,
            focusedGoal: _this9.props.focusedGoal,
            changeFocusedGoal: _this9.props.changeFocusedGoal,
            handleDeleteGoal: _this9.props.handleDeleteGoal
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

    var _this10 = _possibleConstructorReturn(this, (Goal.__proto__ || Object.getPrototypeOf(Goal)).call(this, props));

    _this10.changeFocusedGoal = _this10.changeFocusedGoal.bind(_this10);
    return _this10;
  }

  _createClass(Goal, [{
    key: "changeFocusedGoal",
    value: function changeFocusedGoal() {
      this.props.changeFocusedGoal(this.props.goal.id);
    }
  }, {
    key: "addClassNames",
    value: function addClassNames() {
      var classNameArray = [];
      classNameArray.push(!this.props.goal.completed ? "notCompleted" : "completed");
      classNameArray.push(this.props.goal.id === this.props.focusedGoal ? "selected" : null);
      return classNameArray.join(' ');
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      return React.createElement(
        "li",
        { className: this.addClassNames() },
        React.createElement(
          "a",
          { onClick: this.changeFocusedGoal },
          this.props.goal.title,
          " by ",
          this.props.goal.date
        ),
        React.createElement("span", { className: "fa fa-trash",
          onClick: function onClick(e) {
            _this11.props.handleDeleteGoal(_this11.props.goal.id);
          }
        })
      );
    }
  }]);

  return Goal;
}(React.Component);

var AddGoal = function (_React$Component5) {
  _inherits(AddGoal, _React$Component5);

  function AddGoal(props) {
    _classCallCheck(this, AddGoal);

    var _this12 = _possibleConstructorReturn(this, (AddGoal.__proto__ || Object.getPrototypeOf(AddGoal)).call(this, props));

    _this12.handleAddGoal = _this12.handleAddGoal.bind(_this12);
    _this12.state = {
      error: undefined
    };
    return _this12;
  }

  _createClass(AddGoal, [{
    key: "handleAddGoal",
    value: function handleAddGoal(e) {
      e.preventDefault();
      var date = e.target.elements.date.value;
      var goal = e.target.elements.goal.value.trim();
      var error = this.props.handleAddGoal(goal, date, this.props.category);
      this.setState(function () {
        return { error: error };
      });
      if (!error) {
        e.target.elements.goal.value = '';
      };
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
          React.createElement("input", { type: "date", name: "date" }),
          React.createElement(
            "button",
            null,
            React.createElement("span", { className: "fa fa-plus" })
          )
        )
      );
    }
  }]);

  return AddGoal;
}(React.Component);

//options or tasks


var Categories = function (_React$Component6) {
  _inherits(Categories, _React$Component6);

  function Categories() {
    _classCallCheck(this, Categories);

    return _possibleConstructorReturn(this, (Categories.__proto__ || Object.getPrototypeOf(Categories)).apply(this, arguments));
  }

  _createClass(Categories, [{
    key: "render",
    value: function render() {
      var _this14 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Categories"
        ),
        React.createElement(
          "ul",
          null,
          this.props.categories.map(function (c, i) {
            return React.createElement(Category, {
              key: i,
              category: c,
              focusedCategory: _this14.props.focusedCategory,
              changeFocusedCategory: _this14.props.changeFocusedCategory,
              handleDeleteCategory: _this14.props.handleDeleteCategory
            });
          })
        )
      );
    }
  }]);

  return Categories;
}(React.Component);

var Category = function (_React$Component7) {
  _inherits(Category, _React$Component7);

  function Category(props) {
    _classCallCheck(this, Category);

    var _this15 = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this, props));

    _this15.changeFocusedCategory = _this15.changeFocusedCategory.bind(_this15);
    return _this15;
  }

  _createClass(Category, [{
    key: "changeFocusedCategory",
    value: function changeFocusedCategory() {
      this.props.changeFocusedCategory(this.props.category.id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this16 = this;

      return React.createElement(
        "li",
        { className: this.props.category.id === this.props.focusedCategory ? "selected" : null },
        React.createElement(
          "a",
          { onClick: this.changeFocusedCategory },
          this.props.category.title
        ),
        React.createElement("span", { className: "fa fa-trash",
          onClick: function onClick(e) {
            _this16.props.handleDeleteCategory(_this16.props.category.id);
          }
        })
      );
    }
  }]);

  return Category;
}(React.Component);

var AddCategory = function (_React$Component8) {
  _inherits(AddCategory, _React$Component8);

  function AddCategory(props) {
    _classCallCheck(this, AddCategory);

    var _this17 = _possibleConstructorReturn(this, (AddCategory.__proto__ || Object.getPrototypeOf(AddCategory)).call(this, props));

    _this17.handleAddCategory = _this17.handleAddCategory.bind(_this17);
    _this17.state = {
      error: undefined
    };
    return _this17;
  }

  _createClass(AddCategory, [{
    key: "handleAddCategory",
    value: function handleAddCategory(e) {
      e.preventDefault();
      var category = e.target.elements.category.value.trim();
      var error = this.props.handleAddCategory(category);
      this.setState(function () {
        return { error: error };
      });
      if (!error) {
        e.target.elements.category.value = '';
      };
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
          { onSubmit: this.handleAddCategory },
          React.createElement("input", { type: "text", name: "category" }),
          React.createElement(
            "button",
            null,
            React.createElement("span", { className: "fa fa-plus" })
          )
        )
      );
    }
  }]);

  return AddCategory;
}(React.Component);

// class FocusedGoal extends React.Component {
//   render(){
//     return (
//       <h2>(Ha)bits for {this.props.goal.title}</h2>
//     );
//   }
// }


var Tasks = function (_React$Component9) {
  _inherits(Tasks, _React$Component9);

  function Tasks() {
    _classCallCheck(this, Tasks);

    return _possibleConstructorReturn(this, (Tasks.__proto__ || Object.getPrototypeOf(Tasks)).apply(this, arguments));
  }

  _createClass(Tasks, [{
    key: "render",
    value: function render() {
      var _this19 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "(Ha)bits"
        ),
        this.props.tasks && this.props.tasks.map(function (t, i) {
          return React.createElement(Task, {
            key: t.title,
            task: t,
            index: t.id,
            goalIndex: _this19.props.goalIndex,
            handleCheck: _this19.props.handleCheck,
            handleDeleteTask: _this19.props.handleDeleteTask });
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
    React.createElement("span", { className: "fa fa-trash",
      onClick: function onClick(e) {
        props.handleDeleteTask(props.index, props.goalIndex);
      }
    })
  );
};

var AddTask = function (_React$Component10) {
  _inherits(AddTask, _React$Component10);

  function AddTask(props) {
    _classCallCheck(this, AddTask);

    var _this20 = _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).call(this, props));

    _this20.handleAddTask = _this20.handleAddTask.bind(_this20);
    _this20.state = {
      error: undefined
    };
    return _this20;
  }

  _createClass(AddTask, [{
    key: "handleAddTask",
    value: function handleAddTask(e) {
      e.preventDefault();
      var date = e.target.elements.date.value;
      var task = e.target.elements.task.value.trim();
      var error = this.props.handleAddTask(task, date, this.props.goalIndex);
      this.setState(function () {
        return { error: error };
      });
      if (!error) {
        e.target.elements.task.value = '';
      };
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
          React.createElement("input", { type: "date", name: "date" }),
          React.createElement(
            "button",
            null,
            React.createElement("span", { className: "fa fa-plus" })
          )
        )
      );
    }
  }]);

  return AddTask;
}(React.Component);

var User = function (_React$Component11) {
  _inherits(User, _React$Component11);

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
          "h2",
          { id: "me" },
          "Me: ",
          this.props.user.name,
          " ",
          this.props.user.email
        )
      );
    }
  }]);

  return User;
}(React.Component);

var Gold = function (_React$Component12) {
  _inherits(Gold, _React$Component12);

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
