import React, { Component } from 'react';
import './App.css';
import App from './App.js';
import NewUserForm from './components/NewUserForm';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';

class Routes extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Redirect to='/Login' />
                    <Route path="/Login" component={App}/>
                    <Route path="/NewUserForm" component={NewUserForm}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes