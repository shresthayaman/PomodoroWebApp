import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default App;
