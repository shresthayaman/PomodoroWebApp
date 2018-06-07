import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import fire from './firebaseInfo';
import logo from './po.png';

class LoginForm extends Component {
    login = () => {
        let user = document.getElementById("username").value;
        let code = document.getElementById("password").value;
        fire.auth().signInWithEmailAndPassword(user, code);
    }

    render() {
        return (
            <div className="background">
                <style>{'body { background-color: #c5e8ed; }'}</style>
                <div className="App">
                    <div className="login-box">
                        <img src={logo} className="po" alt="po" style={{ width: '500px', height: '170px', textalign: 'center' }} />
                        <br />
                        <br />
                        <label className="leaderboard-font">Username:</label>
                        <input type="text" id="username"></input>
                        <br />
                        < br />
                        <label className="leaderboard-font">Password: </label>
                        <input type="text" id="password"></input>
                        < br />
                        < br />
                        <button style={{ backgroundColor: 'white', width: '50px', border: 'none', borderRadius: '5px' }} onClick={this.login}>Login</button>
                        <br />
                        <br />
                        <h2 className="leaderboard-font">Don't have an account?</h2>
                        <Link to='/CreateUser'><button style={{ backgroundColor: 'white', width: '60px', border: 'none', borderRadius: '5px' }}>Sign Up</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;