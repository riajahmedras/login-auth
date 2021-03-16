import './App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName, photoURL, email} = result.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(signedInUser);
    console.log(user );
    })
    .catch((error) => {
        // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      // The email of the user's account used.
      console.log(error.email);
      // The firebase.auth.AuthCredential type that was used.
      console.log(error.credential);
    });
  }
const handleSignOut = () => {
  firebase.auth().signOut()
  .then((res) => {
    const signOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      photo: ''
    }
    setUser(signOutUser);
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });
}
const handleBlur = (e) => {
  let isFormValid = true;
  if(e.target.name === 'email'){
    const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
    isFormValid = isEmailValid;

  }
  if(e.target.name === 'password'){
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber = /\d/.test(e.target.value);
    isFormValid = isPasswordValid && passwordHasNumber;
  }
  if(isFormValid){
    // [...cart, newItem]
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
}

const handleSubmit = () => {

}

  return (
    <div className="App">
      {user.isSignedIn ?
        <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign In</button> 
      }
      {
        user.isSignedIn && 
        <div>
          <p> WelCome, Mr. {user.name}</p>
          <p> Your Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <h2>Authentication</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>

      <form action="" onClick={handleSubmit}>
        <input type="text" placeholder="Your name" name="name" onBlur={handleBlur}/> <br/>
        <input onBlur={handleBlur} type="email" name="email" id="" placeholder="Enter Your Email"/> <br/>
        <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Enter Your Password"/>
      </form>

    </div>
  ); 
}

export default App;
