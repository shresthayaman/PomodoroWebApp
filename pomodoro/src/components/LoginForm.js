import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import config from './firebaseInfo';

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