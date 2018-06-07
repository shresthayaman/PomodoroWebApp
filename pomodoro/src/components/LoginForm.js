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
      <div className="background">
        <style>{"body { background-color: #c5e8ed; }"}</style>
        <div className="App">
          <div className="login-box">
            <img
              src={logo}
              className="po"
              alt="po"
              style={{ width: "500px", height: "170px", textalign: "center" }}
            />
            <br />
            <br />
            <label className="leaderboard-font" />
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
              style={{ background: "#8fc5d1", color: "white" }}
              variant="contained"
              onClick={this.login}
            >
              Login
            </Button>
            <br />
            <br />
            <h2 className="leaderboard-font">Don't have an account?</h2>
            <Link to="/CreateUser" style={{ textDecoration: "none" }}>
              <Button
                textDecoration="none"
                style={{ background: "#8fc5d1", color: "white" }}
                variant="contained"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
