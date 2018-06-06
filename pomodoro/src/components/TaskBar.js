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

import listLogo from "./listLogo.png";

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
    })
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
    width: drawerWidth
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
    toDoList: ["first", "second", "third"],
    completedList: []
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleAddTaskClick = () => {
    let tasks = this.state.toDoList;
    tasks.push(this.state.currentInput);
    this.setState({
      toDoList: tasks
    });
    document.getElementById("taskInput").value = "";
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      console.log("pressed");
      this.handleAddTaskClick();
    }
  };

  render() {
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
          <img src={listLogo} height="40" width="40" />
          <p> To Do List</p>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <div className="input" style={{ textAlign: "center" }}>
          <h>
            <u>Active Tasks</u>
          </h>
          <br />
          <TextField
            id="taskInput"
            placeholder="Add Task"
            margin="normal"
            style={{ width: 275 }}
            onKeyPress={this.handleKeyPress}
            onChange={event =>
              this.setState({ currentInput: event.target.value })
            }
          />
          <button onClick={this.handleAddTaskClick}>Add Task</button>
        </div>

        <Divider />

        <List style={{ minHeight: 300, maxHeight: 300, overflow: "auto" }}>
          {this.state.toDoList.map(task => {
            return (
              <div>
                <ListItem dense button>
                  <ListItemText dense primary={task} />
                  <ListItemSecondaryAction>
                    <Checkbox />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>

        <div style={{ textAlign: "center" }}>
          <h>
            <u>Completed Tasks</u>
          </h>
          <br />
        </div>

        <List>
          {this.state.completedList.map(task => {
            return (
              <div>
                <ListItem dense button>
                  <ListItemText dense primary={task} />
                  <ListItemSecondaryAction>
                    <Checkbox />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>

        <Divider />
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
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                POMODORO TIMER
              </Typography>
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
            <Typography>
              {"You think water moves fast? You should see ice."}
            </Typography>
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
