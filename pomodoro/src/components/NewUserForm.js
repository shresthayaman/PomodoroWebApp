import React, { Component } from "react";
import fire from "./firebaseInfo";
import clock from "./clock.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class NewUserForm extends Component {
  constructor() {
    super();
    this.state = {
      errorMessages: "",
      password: "",
      repassword: "",
      username: ""
    };
  }

  updateText = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.createNewUser();
    }
  }

  createNewUser = () => {
    let username = this.state.username
    let password = this.state.password
    let repassword = this.state.repassword
    if (password === repassword) {
      fire
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .catch(function (error) {
          let errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            alert('Email entered is already in use.');
          }
          else if (errorCode === 'auth/invalid-email') {
            alert('Email address is not valid');
          }
          else if (errorCode === 'auth/operation-not-allowed') {
            alert('Email and password accoutns are not enabled.');
          }
          else {
            alert('Weak password. Try making password longer and include digits.');
          }
        });
    }
    else {
      alert('The two passwords entered do not match.')
    }
    this.setState({
      password: "",
      username: "",
      repassword: ""
    });
  };

  render() {
    return (
      <div className="background">
        <style>{"body { background-color: #f2f2f2; }"}</style>
        <div className="App2">
          <img
            src={clock}
            className="clock"
            style={{ width: "15%", height: "auto", left: "22%", top: "17%", textalign: "center" }}
          />
          <div className="login-box2">
            <h1 className="App-title">CREATE YOUR ACCOUNT:</h1>
            <br />
            <Input
              placeholder="Email address"
              onChange={(e) => this.updateText("username", e.target.value)}
              value={this.state.username}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <br />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.updateText("password", e.target.value)}
              value={this.state.password}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <br />
            <Input
              type="password"
              placeholder="Re-enter Password"
              onChange={(e) => this.updateText("repassword", e.target.value)}
              value={this.state.repassword}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <br />
            <br />
            <div>
              <Button
                style={{ background: '#ace8d6', color: "white" }}
                onClick={this.createNewUser}
                variant="contained">Create
              </Button>
              <br />
              <br />
            </div>
            <Link to="/Login" style={{ textDecoration: "none", fontfamily: 'Fjalla One' }}>
              <Button
                style={{ background: '#ace8d6', color: "white" }}
                variant="contained"
              >
                Back
            </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
