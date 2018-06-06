import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBwArX-pn0ctOAs2LGMJPPUgf4AVBD2jrc",
    authDomain: "pomodorotimerr.firebaseapp.com",
    databaseURL: "https://pomodorotimerr.firebaseio.com",
    projectId: "pomodorotimerr",
    storageBucket: "",
    messagingSenderId: "455549070062"
  };
firebase.initializeApp(config);

class LoginForm extends Component {
    render(){
        return(
            <div>
                <div>
                    Username: 
                    <input />
                </div>
                <div>
                    Password:
                    <input />
                </div>
                <div>
                    <Link to='/NewUserForm'>
                        <button> Create New User </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginForm;