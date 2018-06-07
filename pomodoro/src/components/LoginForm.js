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
  login = () => {
    let user = document.getElementById("username").value;
    let code = document.getElementById("password").value;
    fire.auth().signInWithEmailAndPassword(user, code);
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
            <Input placeholder="Username" type="text" id="username" />
            <br />
            <br />
            <label className="leaderboard-font" />
            <Input
              type="password"
              placeholder="Password"
              type="text"
              id="password"
            />
            <br />
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
