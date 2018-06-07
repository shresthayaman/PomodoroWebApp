import React, { Component } from 'react';
import './App.css';
import './LeaderboardDisplay.js';
import './Leaderboard';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import config from './firebaseInfo';
import NewUserForm from './NewUserForm';
import logo from './po.png';

class App extends Component {
  render() {
    return (
      <div className="background">
       <style>{'body { background-color: #c5e8ed; }'}</style>
      <div className="App">
        <div className="login-box">
            <img src={logo} className = "po" alt = "po" style={{width: '500px', height:'170px', textalign: 'center'}} />
            <br/>
            <br />
            <label className="leaderboard-font">Username:</label>
            <input type="text"></input>
            <br/>
            < br />
            <label className="leaderboard-font">Password: </label>
            <input type="text"></input>
            < br />
            < br />
            <button style={{backgroundColor: 'white', width: '50px', border: 'none', borderRadius: '5px'}}>Login</button>
            <br/>
            <br/>
            <h2 className="leaderboard-font">Don't have an account?</h2>
            <Link to='/NewUserForm'><button style={{backgroundColor: 'white', width: '60px', border: 'none', borderRadius: '5px'}}>Sign Up</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
