import React, { Component } from 'react';
import fire from './firebaseInfo';
import { Link } from 'react-router-dom';

class UserPage extends Component {
    logout=()=>{
        fire.auth().signOut();
    }

    render(){
        return(
            <div>
                Hello World
                <Link to='/Login'>
                    <button onClick={this.logout}> logout </button>
                </Link>
            </div>
        );
    }
}

export default UserPage