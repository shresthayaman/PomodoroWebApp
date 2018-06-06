import React, { Component } from 'react';
import firebase from 'firebase';
import fire from './firebaseInfo';

class NewUserForm extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
  }

  createNewUser=()=>{
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    fire.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  }

  render() {
    return (
      <div>
        <div>
          Enter your E-mail:
          <input id="user"/>
        </div>
        <div>
          Create a Password
          <input id="pass"/>
        </div>
        <div>
          <button onClick={this.createNewUser}>
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
