import React, { Component } from "react";
import LeaderboardDisplay from "./LeaderboardDisplay";
import firebase from "firebase";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import fire from "./firebaseInfo";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./LeaderboardDisplay.css"; 
import leaderboardLogo from "./leaderboard2.png";


const style = {
  background: "#f2f2f2",
  color: "white",
  paddingBottom: '10px'
};

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  //function for rankking users, assume cycle total is stored as "cycles"
  compare = (user1, user2) => {
    if (user1.cycles < user2.cycles) {
      return 1;
    }
    if (user1.cycles > user2.cycles) {
      return -1;
    }
    return 0;
  };
  componentDidMount() {
    //get stuff from firebase
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          name: users[user].username,
          cycles: users[user].cycles
        });
      }
      this.setState({
        users: newState
      });
    });
  }
  render() {
    //order the users based on cycles
    let rankedUsers = this.state.users.sort(this.compare);
    console.log(rankedUsers);
    let rankedDisplay = rankedUsers.map(usr => {
      return (
        <LeaderboardDisplay
          user={usr}
          rank={rankedUsers.findIndex(x => x === usr)}
        />
      );
    });
    return (
      <div>
        <style>{"body { background-color: '#f2f2f2'; }"}</style>
        <AppBar style={{height: 70}} position="static" color="inherit">
          <Toolbar>
          {/* <img
              src={leaderboard}
              className="leaderboard"
              style={{ width: "300px", height: "auto", textalign: "center", paddingTop: '10px'}} /> */}
              <h2 className="mainFont">LEADERBOARD </h2>
              <img src={leaderboardLogo} height="60" />
              <div className='dashboardButton'>
              <Link to="/Login" style={{ textDecoration: "none", float: 'right'}}>
               <Button
                 variant="contained"
                 style={{ background: "#ace8d6", color: 'white', width: '80%', left: 800}}>
                 {" "} Dashboard{" "}
               </Button>
             </Link></div>
          </Toolbar>
        </AppBar>
        <br />
        {rankedDisplay}
      </div>

    );
  }
}
