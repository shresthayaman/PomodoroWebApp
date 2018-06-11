import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add.js";

import listLogo from "./listLogo.png";
import logo from "./pomodoroLogo.png";
import leaderboardLogo from "./leaderboard2.png";
import Timer from "./Timer";

import { Link } from "react-router-dom";
import fire from "./firebaseInfo";
import firebase from "firebase";

import "typeface-roboto";
import "./TaskBar.css"; 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const drawerWidth = 400;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#F2F2F2"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  "appBarShift-right": {
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    backgroundColor: "#ace8d6"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth
  },
  "content-right": {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  "contentShift-right": {
    marginRight: 0
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class TaskBar extends React.Component {
  state = {
    open: false,
    anchor: "left",
    currentInput: "",
    toDoList: [],
    completedList: []
  };

  logout = () => {
    fire.auth().signOut();
  };

  randomId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    console.log("I have been ordered to close ");
    this.setState({ open: false });
  };

  handleAddTaskClick = () => {
    if (this.state.currentInput === "") {
      console.log("The input is empty");
    } else {
      let id = this.randomId();
      let tasks = this.state.toDoList;
      tasks.push({ task: this.state.currentInput, id: id, checked: false });
      this.setState({
        currentInput: "",
        toDoList: tasks
      });
      document.getElementById("taskInput").value = "";
    }
  };

  //When user presses enter, it enters the task in to the active task list
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleAddTaskClick();
    }
  };

  handleActiveDelete = idValue => {
    //get index of the value to remove
    let indexToDelete = -1;
    for (let i = 0; i < this.state.toDoList.length; i++) {
      if (this.state.toDoList[i].id === idValue) {
        indexToDelete = i;
      }
    }

    let tempArray = this.state.toDoList;
    tempArray.splice(indexToDelete, 1); //splice removes it from that specific array: no need for return

    this.setState({
      toDoList: tempArray
    });
  };

  handleActiveCheckChange = idValue => {
    let indexToMove = -1;
    for (let i = 0; i < this.state.toDoList.length; i++) {
      if (this.state.toDoList[i].id === idValue) {
        indexToMove = i;
      }
    }
    //create a copy of checkedList and add the checked value in active list to completed list
    let tempCheckedList = this.state.completedList;
    //change the checked value to true when moving form active list to completed list
    let tempTask = {
      task: this.state.toDoList[indexToMove].task,
      id: this.state.toDoList[indexToMove].id,
      checked: true
    };
    tempCheckedList.push(tempTask);

    //remove the checked value from the active list completely
    let tempActiveList = this.state.toDoList;
    tempActiveList.splice(indexToMove, 1);

    this.setState({
      toDoList: tempActiveList,
      completedList: tempCheckedList
    });
  };

  handleCheckedDelete = idValue => {
    //get index of the value to remove
    let indexToDelete = -1;
    for (let i = 0; i < this.state.completedList.length; i++) {
      if (this.state.completedList[i].id === idValue) {
        indexToDelete = i;
      }
    }

    let tempArray = this.state.completedList;
    tempArray.splice(indexToDelete, 1); //splice removes it from that specific array: no need for return

    this.setState({
      completedList: tempArray
    });
  };

  handleCheckedCheckChange = idValue => {
    let indexToMove = -1;
    for (let i = 0; i < this.state.completedList.length; i++) {
      if (this.state.completedList[i].id === idValue) {
        indexToMove = i;
      }
    }
    //create a copy of active and add the unchecked value in completed list to active list
    let tempActiveList = this.state.toDoList;
    //change the checked value to false when moving form completed list to active list
    let tempTask = {
      task: this.state.completedList[indexToMove].task,
      id: this.state.completedList[indexToMove].id,
      checked: false
    };
    tempActiveList.push(tempTask);

    //remove the unchecked value from the completed list completely
    let tempCheckedList = this.state.completedList;
    tempCheckedList.splice(indexToMove, 1);

    this.setState({
      toDoList: tempActiveList,
      completedList: tempCheckedList
    });
  };

  render() {
    console.log(this.state);
    //defining variables based on props and states for later use
    const { classes, theme } = this.props;
    const { anchor, open, toDoList, completedList } = this.state;

    //made the drawer a constant so we can call it or not call it depending on if the menu icon is clicked
    const drawer = (
      <Drawer
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <img
            src={listLogo}
            height="40"
            width="40"
            style={{ marginLeft: 10 }} />
        <h
          style={{
            fontFamily: 'Fjalla One, sans-serif', 
            fontSize: '20',
            color: "white"
          }}>TO DO LIST</h>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />


        <div
          className="input"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            textAlign: "center"
          }}
        >

          <TextField
            id="taskInput"
            placeholder="Add Task"
            margin="normal"
            style={{ width: "85%", marginLeft: "5%", marginBottom: "5%" }}
            onKeyPress={this.handleKeyPress}
            onChange={event =>
              this.setState({ currentInput: event.target.value })
            }
          />
          <Button size="small" onClick={this.handleAddTaskClick}>
            <AddIcon />
          </Button>
        </div>

        <h
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            fontSize: 15,
            color: "#6BB3A1",
            textAlign: "center",
            marginBottom: "3%", 
            fontFamily: 'Fjalla One, sans-serif', 
            fontSize: '20',
            color: "white" 
          }} >
          ACTIVE TASKS
        </h>

        <Divider />

        <List style={{ minHeight: "37%", maxHeight: "37%", overflow: "auto" }}>
          {this.state.toDoList.map(listItem => {
            return (
              <div>
                <ListItem dense button>
                  <ListItemText primary={listItem.task} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      checked={listItem.checked}
                      onChange={() => this.handleActiveCheckChange(listItem.id)}
                    />
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.handleActiveDelete(listItem.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>

        <h
          style={{
            textAlign: "center",
            marginBottom: "3%",   
            fontFamily: 'Fjalla One, sans-serif', 
            fontSize: '20',
            color: "white"

          }}
        >
          COMPLETED TASKS
        </h>

        <Divider />

        <List style={{ minHeight: "37%", maxHeight: "37%", overflow: "auto" }}>
          {this.state.completedList.map(listItem => {
            return (
              <div>
                <ListItem dense button>
                  <ListItemText
                    primary={
                      <div>
                        <del>{listItem.task}</del>
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      color="primary"
                      checked={listItem.checked}
                      onChange={() =>
                        this.handleCheckedCheckChange(listItem.id)
                      }
                    />
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.handleCheckedDelete(listItem.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Drawer>
    );

    //used to determine if the drawer will pop up in the left or the right. For our case it will be the left
    let before = null;
    let after = null;
    if (anchor === "left") {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open
            })}
          >
            <Toolbar
              disableGutters={!open}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <IconButton
                color="default"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>

              <img src={logo} height="40"/>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: 50 }}>
                  <Link to="/Leaderboard">
                    <img src={leaderboardLogo} height="60" />
                  </Link>
                </div>
                <Link to="/Login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    onClick={this.logout}

                    style={{ background: "#ace8d6", color: 'white', marginRight: 30 }}

                  >
                    {" "}
                    Logout{" "}
                  </Button>
                </Link>
              </div>

              {/* Add other things you want to add at the app bar here */}
            </Toolbar>
          </AppBar>

          {before}

          {/* text that will go in the main */}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open
              }
            )}
          >
            <div className={classes.drawerHeader} />
            <Timer />
          </main>
          {after}
        </div>
      </div>
    );
  }
}

TaskBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TaskBar);
