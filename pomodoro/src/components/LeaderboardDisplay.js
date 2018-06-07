import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Z_DEFAULT_COMPRESSION } from "zlib";
import "./LeaderboardDisplay.css";

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
          <span className="Data2">
            <img src={this.state.url} width="100" />
          </span>
        </div>
      </Paper>
    );
  }
}
