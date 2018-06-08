import React, { Component } from "react";
import Countdown from "react-countdown-now";
import CircularProgressbar from "react-circular-progressbar";
import "./style.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

//fix text at bottom

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start_time: Date.now(),
      twentyfive: 1500000,
      difference: 0,

      counter: 0,

      num_cycles: 0,

      reset: false,
      paused: false,
      paused_time: 0,
      paused_num: 0,
      button_text: "Start Break",
      button_color: "primary",
      status_text: "Keep Working",
      current_time: 1500000,
      reset_text: "Start",
      dummy_time: 0,
      renderSeconds: 0,
      seconds: 0,
      realSeconds: 0,
      started: false,
      play: false,
      work_min: 0,
      break_min: 0,
      work_milli: 1500000,
      break_milli: 300000,

      open: false,
      taking_break: false,
      inc_cycles: true

    };
    this.url = "http://www.gravomaster.com/alarm/sounds/Car_Alarm_Device.mp3";

    this.audio = new Audio(this.url);
    this.togglePlay = this.togglePlay.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    let work_milli1 = this.state.work_min * 60000;
    let break_milli1 = this.state.break_min * 60000;
    this.setState({
      open: false,
      work_milli: work_milli1,
      break_milli: break_milli1
    });

    if (this.state.started == true) {
      this.setState({
        button_text: "Use New Settings"
      });
    }

  };

  changeWork = e => {
    this.setState({
      work_min: e.target.value // can't put stuff before e for some reason
    });
  };

  changeBreak = e => {
    this.setState({
      break_min: e.target.value // can't put stuff before e for some reason
    });
  };

  getPercent() {
    let time_dif = Date.now() - this.state.start_time;
    let percent_dif = 0;
    if (time_dif > this.state.twentyfive) {
      percent_dif = 1;
    } else {
      percent_dif = time_dif / Math.floor(this.state.twentyfive);
    }
    if (this.state.started == true) {
      this.setState({
        difference: percent_dif * 100,
        dummy_time: Date.now() - 1000,
        seconds: this.state.seconds + 1000
      });
    } else {
      this.setState({
        difference: 100,
        dummy_time: Date.now() - 1000,
        seconds: this.state.seconds + 1000
      });
    }

    if (
      this.state.difference == 100 &&
      this.state.taking_break == false &&
      this.state.started == true &&
      this.state.inc_cycles == true
    ) {
      console.log("calling updateCount in Timer")
      this.props.updateCount();
      this.setState({
        status_text: "Take a Break!",
        num_cycles: this.state.num_cycles + 1,
        inc_cycles: false
      });
      // if (this.state.play == false) {
      //   this.togglePlay;
      // }
    } else if (
      this.state.difference == 100 &&
      this.state.taking_break == true &&
      this.state.started == true
    ) {
      this.setState({
        status_text: "Go back to Work"
      });
      // if (this.state.play == false) {
      //   this.togglePlay;
      // }

    }
    //console.log(this.state.dummy_time);

    //console.log(this.state.seconds);
  }
  togglePlay() {
    this.setState({ play: !this.state.play });
    console.log(this.audio);
    this.state.play ? this.audio.play() : this.audio.pause();
  }

  //RESET BUTTON-------------------------------------------------------------
  resetButton = () => {

    if (this.state.started == false) {
      this.setState({
        started: true,
        open: false,
        status_text: "Keep Working",
        button_text: "Start Break",
        button_color: "primary"
      });
    }

    let pause_time = Date.now();
    let work_time = this.state.work_milli;
    if (this.state.reset == false) {
      this.setState({
        reset: true,
        start_time: pause_time,
        twentyfive: work_time,

        status_text: "Keep Working",

        button_color: "primary",
        current_time: pause_time + work_time,
        reset_text: "Reset"
      });
    } else {

      this.setState({});

    }
  };

  //STARTS THE BREAK BUTTON-------------------------------------------------------------
  breakTimer = () => {
    let work_time = this.state.work_milli;
    let break_time = this.state.break_milli;

    // if (this.setState.play == true) {
    //   this.togglePlay;
    //   this.togglePlay;
    // }

    if (this.state.twentyfive == work_time) {
      this.setState({
        twentyfive: break_time,
        start_time: Date.now(),
        button_text: "Go Back to Work",
        status_text: "Keep Relaxing",
        button_color: "secondary",

        current_time: Date.now() + break_time,
        taking_break: true
      });
    } else {
      // if (this.setState.play == true) {
      //   this.togglePlay;
      // }

      this.setState({
        twentyfive: work_time,
        start_time: Date.now(),
        button_text: "Start Break",
        button_color: "primary",
        status_text: "Keep Working",

        current_time: Date.now() + work_time,
        taking_break: false,
        inc_cycles: true
        // num_cycles: this.state.num_cycles + 1

      });
    }
    //console.log("Hello");
  };

  //PAUSE BUTTON-------------------------------------------------------------
  // pauseButton = () => {
  //   //console.log(this.state.dummy_time);
  //   //console.log(Date.now());
  //   this.setState({
  //     // current_time: this.state.dummy_time + Date.now()
  //     paused: true,
  //     realSeconds:
  //       (this.state.dummy_time -
  //         this.state.seconds -
  //         this.state.start_time -
  //         this.state.twentyfive) *
  //       -1
  //   });
  //   console.log(this.state.realSeconds);
  //   this.setState({
  //     current_time: this.state.realSeconds
  //   });
  //   console.log(this.state.current_time);
  //   this.forceUpdate();
  // };
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

    console.log(this.state.taking_break);

    const renderer = ({ hours, minutes, seconds, completed }) => {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    };
    console.log(this.state.work_min);
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
          <div>
            <Button
              onClick={this.handleClickOpen}
              variant="raised"
              color="primary"
            >
              Edit Timer
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Timer Settings</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter how long you want the work time and breaks to be. The
                  default time is 25 minutes of work time and 5 minutes of break
                  time.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="worktime"
                  label="Work Time"
                  type="worktime"
                  type="number"
                  onChange={e => this.changeWork(e)}
                  placeholder="25"
                />
                &emsp;&emsp;
                <TextField
                  autoFocus
                  margin="dense"
                  id="breaktime"
                  label="Break Time"
                  type="breaktime"
                  type="number"
                  onChange={e => this.changeBreak(e)}
                  placeholder="5"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          &emsp;&emsp;

          <div />

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

          <p>{this.state.num_cycles} </p>

        </div>
      </div>
    );
  }
}

export default Timer;
