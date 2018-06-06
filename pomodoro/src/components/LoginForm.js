import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import fire from './firebaseInfo';

class LoginForm extends Component {
    login=()=>{
        let user = document.getElementById("username").value;
        let code = document.getElementById("password").value;
        fire.auth().signInWithEmailAndPassword(user, code);
        console.log("logged in");
    }

    render(){
        return(
            <div>
                <div>
                    Username: 
                    <input id="username"/>
                </div>
                <div>
                    Password:
                    <input id="password"/>
                </div>
                <div>
                    <button onClick={this.login}> Login </button>
                </div>
                <div>
                    <Link to='/CreateUser'>
                        <button> Create New User </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginForm;