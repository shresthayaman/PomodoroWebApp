import React, { Component } from "react";

/* PROPS
        user: object with fields
            - name: user name
            - cycles: number of cycles completed
        rank: object with field
            - index of user in sorted cycles array
*/

export default class LeaderboardDisplay extends Component {
  render() {
    const {user, rank} = this.props;
    const {name, cycles} = user;

    return (
      <div>
        <h3 className="leaderboard-font"> Rank: </h3>
        <p> {rank + 1} </p>

        <h3 className="leaderboard-font"> User: </h3>
        <p> {name} </p>

        <h3 className="leaderboard-font"> Cycles: </h3>
        <p> {cycles} </p>
      </div>
    );
  }
}