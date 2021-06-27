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
    const [user, setUser] = useState({
        isSignedIn: false,
        // newUser: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
    })

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    

    const handleSubmit = (e) =>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
            })
            .catch((error) => {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                
            });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                console.log('sing userInfo', res.user)
            })
            .catch((error) => {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
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
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
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
                            <p style={{color: 'red'}}>{user.error}</p>
                            {user.success && <p style={{color: 'green'}}>User {newUser? "Create":'Logged In' } SuccessFully</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;