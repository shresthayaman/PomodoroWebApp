import React, { Component } from "react";
import logo from "./logo.svg";
import Timer from "/Users/deepakgoel/Desktop/PomodoroWebApp/pomodoro/src/Components/Timer.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer />
      </div>
    );
  }
}

export default App;
