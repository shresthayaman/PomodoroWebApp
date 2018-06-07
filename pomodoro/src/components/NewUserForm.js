import React, { Component } from "react";
import fire from "./firebaseInfo";
import clock from "./clock.png";
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
