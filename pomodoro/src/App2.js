import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewUserForm from './components/NewUserForm';
import UserPage from './components/UserPage';
import fire from './components/firebaseInfo';

class App2 extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
  }

  componentDidMount() {
    this.authListener();
  }

  authListener=()=>{
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user && <UserPage />}
        {this.state.user === null && <NewUserForm />}
      </div>
    );
  }
}

export default App2;
