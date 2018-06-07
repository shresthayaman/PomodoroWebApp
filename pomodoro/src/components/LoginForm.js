import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import fire from "./firebaseInfo";
import logo from "./po.png";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: "",
      password: "",
      username: ""
    }
  }

  updateText = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.login();
    }
  }

  login = () => {
    let user = this.state.username;
    let code = this.state.password;
    let hello = "";
    fire.auth().signInWithEmailAndPassword(user, code)
      .catch(function (error) {
        let errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else if (errorCode === 'auth/invalid-credential') {
          alert('Credentials expired.');
        }
        else if (errorCode === 'auth/operation-not-allowed') {
          alert('Invalid type of account.');
        }
        else if (errorCode === 'auth/user-disabled') {
          alert('Your account has been disabled.');
        }
        else {
          alert('User not found. Check username or click Sign Up');
        }
      });
    this.setState({
      password: "",
      username: ""
    });
  };

  render() {
    return (
      <div>
        <style>{"body { background-color: #f2f2f2; }"}</style>
        <div className="App">
        <img
              src={logo}
              className="po"
              alt="po"
              style={{ width: "500px", height: "140px", textalign: "center" }}
            /></div>
          <div className="biglogin">
          <div className="login-box">
            <label className="leaderboard-font" />
            <br />
            <Input
              placeholder="Username"
              type="email"
              onChange={(e) => this.updateText("username", e.target.value)}
              onKeyPress={this.handleKeyPress}
              value={this.state.username}
            />
            <br />
            <br />
            <label className="leaderboard-font" />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.updateText("password", e.target.value)}
              onKeyPress={this.handleKeyPress}
              value={this.state.password}
            />
            <br />
            {this.state.errorMessages && <div className="error-message"> {this.state.errorMessages} </div>}
            <br />
            <Button
              style={{ background: "#ace8d6", color: "white" }}
              variant="contained"
              onClick={this.login}
            >
              Login
            </Button>
            <br />
            <br />
            <div className="signupDiv">
            <h2 className="leaderboard-font"  style={{ color: '#939393' }}>DON'T HAVE AN ACCOUNT?</h2>
            <Link to="/CreateUser" style={{ textDecoration: "none", fontfamily: 'Fjalla One'}}>
              <Button
                textDecoration="none"
                style={{ background: "#ace8d6", color: "white"}}
                variant="contained">Sign Up
              </Button>
            </Link>
            </div>
          </div>
        </div>
        </div>
  
    );
  }
}

export default LoginForm;
