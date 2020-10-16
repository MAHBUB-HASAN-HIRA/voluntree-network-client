import React, { useState } from 'react'; 
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useContext } from 'react';
import googleIcon from '../../volunteer-network-resources/logos/google.png';
import './Login.css';
import TreeLogo from "../../volunteer-network-resources/logos/Group 1329.png";
import { Link } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    const [user, setUser] = useState({
        isSignIn:true,
        name:'Mahbub',
        email:'',
        password:'',
        photoURL:'',
        error:'',
        success: false,
    });

  const handleGoogleSignIn = () =>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
          })
          .catch(error => alert(error.message));
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => { })
        .catch(error => alert(error.message));
    }

    return (
        <div className='container'>          
                <Link to='/'><img className='tree_img_logo' src={TreeLogo} alt=""/></Link>
             <div className='popupSignInContainer'>
                <h3>Login With</h3>
                <div onClick={handleGoogleSignIn} className='popupSignIn'>
                    <img src={googleIcon} alt="sign in with google"/>
                    <p className='continue'>Continue with Google</p>
                </div>
                <p>Don't Have a Account? <Link to='#'>Create an Account</Link></p>
           </div>
        </div>
    );
};

export default Login;