import React, { Component } from "react";
//still need to import firebase

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
          name: users[user].name,
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
    let rankedDisplay = rankedUsers.map(usr => {
      return (
        <LeaderboardDisplay
          user={usr}
          rank={rankedUsers.findIndex(x => x === usr)}
        />
      );
    });
    return { rankedDisplay };
  }
}
