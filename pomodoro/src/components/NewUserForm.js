import React, { Component } from "react";
import fire from "./firebaseInfo";
import clock from "./clock.png";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class NewUserForm extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  createNewUser = () => {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    /*fire.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });*/
    fire
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="background">
        <style>{"body { background-color: #c5e8ed; }"}</style>
        <div className="App">
          <img
            src={clock}
            className="clock"
            style={{ width: "200px", height: "200px", textalign: "center" }}
          />
          <div className="login-box2">
            <h1 className="App-title">Create your account:</h1>
            <br />
            <label className="leaderboard-font" />
            <Input placeholder="Email address" id="user" />
            <br />
            <br />
            <label className="leaderboard-font" />
            <Input type="password" placeholder="Password" id="pass" />
            <br />
            <br />
            <br />
            <div>
              <Button
                style={{ background: "#8fc5d1", color: "white" }}
                onClick={this.createNewUser}
                variant="contained"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
