// renderer/src/components/SignIn.jsx
import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        console.error(error);
        alert(error.message);
      });
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        console.error(error);
        alert(error.message);
      });
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error(error);
      alert(error.message);
    });
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleEmailAuth} className="sign-in-form">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
        </button>
        <p onClick={toggleSignUp} className="toggle-auth">
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </p>
      </form>
      <div className="divider">Or</div>
      <button onClick={handleGoogleSignIn} className="google-sign-in-button">
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;