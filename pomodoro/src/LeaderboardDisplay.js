import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { INSPECT_MAX_BYTES } from "buffer";

/* PROPS
       user: object with fields
           - name: user name
           - cycles: number of cycles completed
       rank: object with field
           - index of user in sorted cycles array
*/

const style = {
  width: "30vw",
  marginLeft: "34vw",
  marginBottom: "2vh",
  rounded: true,
  paddingLeft: "1vw",
  paddingRight: "1vw"
};

export default class LeaderboardDisplay extends Component {
  render() {
    const { user, rank } = this.props;
    const { name, cycles } = user;

    return (
      <Paper style={style}>
        <div className="Leaderboard">
          <p>
            {" "}
            <strong> Rank: </strong>
            {rank + 1}{" "}
          </p>

          <p>
            {" "}
            <strong> Name: </strong>
            {name}{" "}
          </p>

          <p>
            {" "}
            <strong> Cycles: </strong>
            {cycles}{" "}
          </p>
        </div>
      </Paper>
    );
  }
}