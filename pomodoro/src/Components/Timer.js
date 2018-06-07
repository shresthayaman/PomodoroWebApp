import React, { Component } from "react";
import Countdown from "react-countdown-now";
import CircularProgressbar from "react-circular-progressbar";
import "./style.css";
import Button from "@material-ui/core/Button";

//fix text at bottom

class Timer extends Component {
  state = {
    time: 0,
    start_time: Date.now(),
    twentyfive: 1500000,
    difference: 0,
    counter: 0,
    reset: false,
    paused: false,
    paused_time: 0,
    paused_num: 1000,
    button_text: "Start Break",
    button_color: "primary",
    status_text: "Keep Working",
    current_time: 1500000,
    reset_text: "Start",
    dummy_time: 0,
    renderSeconds: 0,
    seconds: 0,
    realSeconds: 0
  };

  getPercent() {
    let time_dif = Date.now() - this.state.start_time;
    let percent_dif = 0;
    if (time_dif > this.state.twentyfive) {
      percent_dif = 1;
    } else {
      percent_dif = time_dif / Math.floor(this.state.twentyfive);
    }
    this.setState({
      difference: percent_dif * 100,
      dummy_time: Date.now() - 1000,
      seconds: this.state.seconds + 1000
    });
    if (this.state.difference == 100) {
      this.setState({
        status_text: "Take a Break!"
      });
    }
    //console.log(this.state.dummy_time);

    //console.log(this.state.seconds);
  }

  //RESET BUTTON-------------------------------------------------------------
  resetButton = () => {
    let pause_time = Date.now();
    if (this.state.reset == false) {
      this.setState({
        reset: true,
        start_time: pause_time,
        twentyfive: 1500000,
        button_text: "Start Break",
        button_color: "primary",
        current_time: pause_time + 1500000,
        dummy_time: 1500000, //used for Pause button
        reset_text: "Reset"
      });
    } else {
      this.setState({
        reset: false,
        dummy_time: 1500000
      });
    }
  };

  //STARTS THE BREAK BUTTON-------------------------------------------------------------
  breakTimer = () => {
    if (this.state.twentyfive == 1500000) {
      this.setState({
        twentyfive: 300000,
        start_time: Date.now(),
        button_text: "Go Back to Work",
        button_color: "secondary",
        current_time: Date.now() + 300000
      });
      //GO BACK TO WORK
    } else {
      this.setState({
        twentyfive: 1500000,
        start_time: Date.now(),
        button_text: "Start Break",
        button_color: "primary",
        current_time: Date.now() + 1500000
      });
    }
    //console.log("Hello");
  };

  //PAUSE BUTTON-------------------------------------------------------------
  pauseButton = () => {
    //console.log(this.state.dummy_time);
    //console.log(Date.now());
    this.setState({
      // current_time: this.state.dummy_time + Date.now()
      paused: true,
      realSeconds:
      (this.state.dummy_time -
        this.state.seconds -
        this.state.start_time -
        this.state.twentyfive) *
      -1
    });
    console.log(this.state.realSeconds);
    this.setState({
      current_time: this.state.realSeconds
    });
    console.log(this.state.current_time);
    this.forceUpdate();
  };
  //END OF BUTTONS------------------------------------------------------------------------------

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }, this.getPercent()),
      this.state.paused_num
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.paused == true && this.state.counter == 0) {
  //     this.setState({
  //       current_time: prevState.current_time,
  //       counter: this.state.counter + 1
  //     });
  //   }
  // }

  render() {
    const renderer = ({ hours, minutes, seconds, completed }) => {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    };

    // console.log(this.state.difference);
    return (
      <div>
        <div
          className="circle"
          style={{
            position: "absolute",
            width: "1200px",
            height: "1200px",
            right: "5%"
          }}
        >
          <CircularProgressbar
            percentage={Math.floor(100 - this.state.difference)}
            textForPercentage={null}
          />
        </div>
        <div
          classname="timer"
          style={{
            height: "15%",
            width: "15%",
            position: "absolute",
            top: "40%",
            right: "39.1%"
          }}
        >
          <Countdown
            date={this.state.current_time}
            zeroPadLength={2}
            renderer={renderer}
          />
        </div>
        <div
          className="buttons"
          style={{
            top: "70%",
            position: "absolute",
            left: "45.5%"
          }}
        >
          <Button onClick={this.resetButton} variant="raised" color="primary">
            {this.state.reset_text}
          </Button>
          &emsp;&emsp;
          <Button
            onClick={this.breakTimer}
            variant="raised"
            color={this.state.button_color}
          >
            {this.state.button_text}
          </Button>
          &emsp;&emsp;
          <Button onClick={this.pauseButton} variant="raised" color="secondary">
            Pause
          </Button>
        </div>
        <div
          clasname="status"
          style={{
            top: "77%",
            position: "absolute",
            left: "46%"
          }}
        >
          <h2>{this.state.status_text}</h2>
        </div>
      </div>
    );
  }
}

export default Timer;
