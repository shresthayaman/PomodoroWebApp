// import React, { Component } from "react";

// /* PROPS
//         user: object with fields
//             - name: user name
//             - cycles: number of cycles completed
//         rank: object with field
//             - index of user in sorted cycles array
// */

// export default class LeaderboardDisplay extends Component {
//   render() {
//     const {user, rank} = this.props;
//     const {name, cycles} = user;

//     return (
//       <div>
//         <h2 className="leaderboard-font"> Rank: </h2>
//         <p> {rank + 1} </p>

//         <h2 className="leaderboard-font"> User: </h2>
//         <p> {name} </p>

//         <h2 className="leaderboard-fonti"> Cycles: </h2>
//         <p> {cycles} </p>
//       </div>
//     );
//   }
// }