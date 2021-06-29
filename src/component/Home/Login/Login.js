import React, { useContext } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { Link, useHistory, useLocation,  } from 'react-router-dom';
import { UserContext } from '../../../App';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    }
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
     const checkAdmin = (email) =>{

        fetch('https://warm-reef-27135.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
            .then(res => res.json())
            .then(data => {
                const loggedInfo = {...loggedInUser};
                loggedInfo.isAdmin = data;
                setLoggedInUser(loggedInfo);
            })

     }

    const handleSubmit = (e) =>{
        if(newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then(res => {
                const newUserInfo = {...loggedInUser}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLoggedInUser(newUserInfo);
                // updateUserName(loggedInUser.name);
            })
            .catch((error) => {
                const newUserInfo = {...loggedInUser}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
                
            });
        }
        if(!newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then(res => {
                const newUserInfo = {...loggedInUser}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLoggedInUser(newUserInfo);
                // setLoggedInUser(newUserInfo);
                history.replace(from);
                checkAdmin(loggedInUser.email);
                console.log('sing userInfo', res.loggedInUser);
            })
            .catch((error) => {
                const newUserInfo = {...loggedInUser}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                loggedInUser(newUserInfo)
            });
        }
        e.preventDefault();
    }

    const updateUserName = (name) =>{
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        })
        .then(() => {
            console.log('User name Update Successfully')
        })
        .catch((error) => {
            console.log(error)
        });  
    }
    const handleBlur = (e) =>{
        let isFormValid = true;
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            isFormValid = e.target.value.length > 6
        }
        if(isFormValid){
            const newUserInfo = {...loggedInUser}
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }
    return (
        <div className="text-center mt-5">
            <div className="">
                <div className="d-flex justify-content-center">
                    <div className="login-container">
                        <h3>{newUser?'Create an account':'Login'}</h3>
                        <div className="login ">
                            <form onSubmit={handleSubmit} className="">
                                {newUser && <input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Your Name" />}
                            <br/>
                            <input type="text" name="email" onBlur={handleBlur} className="form-control" placeholder="Email" required/>
                                <br/>
                                <input type="password" name="password" onBlur={handleBlur} className="form-control" placeholder="password" required/>
                                <br/>
                                <input  className="submit" type="submit" value={newUser ? 'Sign Up':'Sign In'} />
                                <p>{newUser? "Already":"Don't"} Have An account? <Link onClick={()=> setNewUser(!newUser)} >{newUser ? "Login" : "Create An Account"}</Link></p>
                            </form>
                            <p style={{color: 'red'}}>{loggedInUser.error}</p>
                            {loggedInUser.success && <p style={{color: 'green'}}>User {setLoggedInUser? "Create":'Logged In' } SuccessFully</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;