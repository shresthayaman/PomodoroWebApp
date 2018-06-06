import React, { Component } from 'react';
import fire from './firebaseInfo';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class UserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            cycles: 0,
            id: "",
            databaseid: ""
        }
    }

    logout=()=>{
        fire.auth().signOut();
    }

    componentDidMount() {
        //fire.auth().currentUser.uid
        console.log("component mounts");
        firebase.database().ref("users").on('value', (snapshot) => {
            for (let person in snapshot.val()){
                console.log(snapshot.val()[person].id);
                if(snapshot.val()[person].id){
                    this.setState({
                        username: snapshot.val()[person].username,
                        cycles: snapshot.val()[person].cycles,
                        databaseid: person
                    });
                }
            }
        });
    }

    updateCount=()=>{
        firebase.database().ref("users").once('value', (snapshot) => {
            let dataid = this.state.databaseid;
            console.log(dataid);
            if(snapshot.val().dataid){
                console.log("snapshot value does not equal null")
                firebase.database().ref("users").update({ cycles : this.state.cycles + 1 });
            }
            else{
                console.log("snapshot value is null")
                let data = {
                    username: this.state.username,
                    cycles: this.state.cycles + 1,
                    id: fire.auth().currentUser.uid
                }
                firebase.database().ref("users").push(data);
            }
        });
    }

    render(){
        console.log(this.state);
        return(
            <div>
                Hello World
                <Link to='/Login'>
                    <button onClick={this.logout}> logout </button>
                    <button onClick={this.updateCount}> Increment Count </button>
                </Link>
            </div>
        );
    }
}

export default UserPage