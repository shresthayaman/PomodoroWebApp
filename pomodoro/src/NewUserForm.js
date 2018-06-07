import React, { Component } from 'react';
import firebase from 'firebase';
import config from './firebaseInfo';
import clock from './clock.png';


firebase.initializeApp(config);

export default class NewUserForm extends Component {

  createNewUser=()=>{
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  }

  render() {
    return (
    <div className="background">
        <style>{'body { background-color: #c5e8ed; }'}</style>
        <div className="App">
        <img src={clock} className = "clock" style={{width: '200px', height:'200px', textalign: 'center'}} />
          <div className="login-box2">
          <h1 className="App-title">Create your account:</h1>
            <br />
            <label className="leaderboard-font">Enter your E-mail:</label>
            <input id="user"></input>
            <br/>
            <br/>
            <label className="leaderboard-font">Create a Password:</label>
            <input id="pass"></input>
            < br />
            <br/>
            <br/>
            <div><button style={{backgroundColor: 'white', width: '60px', border: 'none', borderRadius: '5px'}} onClick={this.createNewUser}>Create</button></div>
        </div>
    </div>
    </div>
    );
  }
}

