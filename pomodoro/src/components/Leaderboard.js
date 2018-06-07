import React, { Component } from "react";
import LeaderboardDisplay from "./LeaderboardDisplay";
import firebase from "firebase";
import leaderboard from './leaderboard.png';

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
      <div className="backgroundLeaderboard">
          <img src={leaderboard} className="leaderboard" style={{ width: '300px', height: 'auto', textalign: 'center',marginTop:'2%', marginLeft: '2%'}} />
          {rankedDisplay}
      <div className="footer"></div>
      </div>     
      </div>

    );
  }
}
