import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Z_DEFAULT_COMPRESSION } from "zlib";
import "./LeaderboardDisplay.css";
import profilepic from './profilepic.png'; 

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
  constructor(props) {
    super(props);
    this.state = {
      url:
      "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    };
  }
  render() {
    const { user, rank } = this.props;
    const { name, cycles } = user;

    return (
      <Paper style={style}>
        <div className="Leaderboard">
          <div className="Data">
            <p className="rankings">
              {" "}
              <strong> Rank: </strong>
              {rank + 1}{" "}
            </p>

            <p className="rankings">
              {" "}
              <strong> Name: </strong>
              {name}{" "}
            </p>

            <p className="rankings">
              {" "}
              <strong> Cycles: </strong>
              {cycles}{" "}
            </p>
          </div>
          <span className="Data2">
            <img src={profilepic} className="profilepic"  width="100" />
          </span>
        </div>
      </Paper>
    );
  }
}
